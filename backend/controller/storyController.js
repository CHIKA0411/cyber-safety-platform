// controllers/storyController.js

import Story from "../models/Story.js";
import Comment from "../models/Comment.js";
import {
  redactPII,
  rateLimit,
  sanitizeTags,
  ensureTextQuality,
  VALID_TAGS,
} from "../utils/helpers.js";

// @desc    Create a new story
// @route   POST /api/stories
export const createStory = async (req, res) => {
  try {
    const ip = req.ip || req.headers["x-forwarded-for"] || "unknown";
    if (!rateLimit(`story:${ip}`, 5, 60 * 60 * 1000)) {
      return res.status(429).json({ error: "Too many stories; try later" });
    }

    const { text, tags } = req.body || {};
    const chk = ensureTextQuality(text);
    if (!chk.ok) return res.status(400).json({ error: chk.reason });

    const textRedacted = redactPII(text);
    const doc = await Story.create({
      textOriginal: text,
      textRedacted,
      tags: sanitizeTags(tags),
    });
    return res.status(201).json({
      _id: doc._id,
      textRedacted: doc.textRedacted,
      tags: doc.tags,
      createdAt: doc.createdAt,
      upvotes: doc.upvotes,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to create story" });
  }
};

// @desc    Get all stories with pagination
// @route   GET /api/stories
export const getStories = async (req, res) => {
  try {
    const { page = 1, limit = 10, tag } = req.query;
    const q = {};
    if (tag && VALID_TAGS.has(String(tag))) q.tags = String(tag);

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Story.find(q)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .select("textRedacted tags createdAt upvotes"),
      Story.countDocuments(q),
    ]);

    return res.json({
      page: Number(page),
      limit: Number(limit),
      total,
      items,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to fetch stories" });
  }
};

// @desc    Get a single story and its comments
// @route   GET /api/stories/:id
export const getStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id).select(
      "textRedacted tags createdAt upvotes"
    );
    if (!story) return res.status(404).json({ error: "Not found" });
    const comments = await Comment.find({ storyId: story._id })
      .sort({ createdAt: 1 })
      .select("textRedacted createdAt upvotes");
    return res.json({ story, comments });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to fetch story" });
  }
};

// @desc    Add a comment to a story
// @route   POST /api/stories/:id/comments
export const addComment = async (req, res) => {
  try {
    const ip = req.ip || req.headers["x-forwarded-for"] || "unknown";
    if (!rateLimit(`comment:${ip}`, 20, 60 * 60 * 1000)) {
      return res.status(429).json({ error: "Too many comments; try later" });
    }

    const story = await Story.findById(req.params.id).select("_id");
    if (!story) return res.status(404).json({ error: "Story not found" });

    const { text } = req.body || {};
    const plain = (text || "").trim();
    if (plain.length < 5)
      return res.status(400).json({ error: "Comment too short" });

    const textRedacted = redactPII(plain);
    const c = await Comment.create({
      storyId: story._id,
      textOriginal: plain,
      textRedacted,
    });
    return res.status(201).json({
      _id: c._id,
      textRedacted: c.textRedacted,
      createdAt: c.createdAt,
      upvotes: c.upvotes,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to add comment" });
  }
};

// @desc    Upvote a story
// @route   POST /api/stories/:id/upvote
export const upvoteStory = async (req, res) => {
  try {
    const ip = req.ip || req.headers["x-forwarded-for"] || "unknown";
    if (!rateLimit(`upvote:${ip}:${req.params.id}`, 5, 24 * 60 * 60 * 1000)) {
      return res
        .status(429)
        .json({ error: "Upvote limit reached for this story" });
    }
    const updated = await Story.findByIdAndUpdate(
      req.params.id,
      { $inc: { upvotes: 1 } },
      { new: true }
    ).select("upvotes");
    if (!updated) return res.status(404).json({ error: "Story not found" });
    return res.json({ upvotes: updated.upvotes });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to upvote" });
  }
};

// @desc    Upvote a comment
// @route   POST /api/comments/:id/upvote
export const upvoteComment = async (req, res) => {
  try {
    const ip = req.ip || req.headers["x-forwarded-for"] || "unknown";
    if (!rateLimit(`cupvote:${ip}:${req.params.id}`, 5, 24 * 60 * 60 * 1000)) {
      return res
        .status(429)
        .json({ error: "Upvote limit reached for this comment" });
    }
    const updated = await Comment.findByIdAndUpdate(
      req.params.id,
      { $inc: { upvotes: 1 } },
      { new: true }
    ).select("upvotes");
    if (!updated) return res.status(404).json({ error: "Comment not found" });
    return res.json({ upvotes: updated.upvotes });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to upvote" });
  }
};
