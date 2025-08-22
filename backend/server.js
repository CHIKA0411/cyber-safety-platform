import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI ;

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(morgan("tiny"));

await mongoose.connect(MONGODB_URI);
console.log("MongoDB connected");


const phoneRegex = /(?:\+91|91|0)?[6-9]\d{9}/g; 
const upiRegex = /\b[\w.\-]{2,256}@[a-z]{2,64}\b/gi;
const cardRegex = /\b(?:\d[ -]*?){13,16}\b/g; 
const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;

function luhnCheck(num) {
  const digits = (num || "").replace(/[^0-9]/g, "");
  let sum = 0; let alt = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits.charAt(i), 10);
    if (alt) { n *= 2; if (n > 9) n -= 9; }
    sum += n; alt = !alt;
  }
  return digits.length >= 13 && sum % 10 === 0;
}

function maskPhone(m) {
  const s = m.replace(/\D/g, "");
  if (s.length < 10) return "**********";
  return s.slice(0, 2) + "*****" + s.slice(-2);
}

function maskUPI(m) {
  const [id, handle] = m.split("@");
  const head = id?.slice(0, 2) || "**";
  return `${head}****@${handle}`;
}

function maskCard(m) {
  if (!luhnCheck(m)) return m;
  const last4 = m.replace(/\D/g, "").slice(-4);
  return `**** **** **** ${last4}`;
}

function maskEmail(m) {
  const [user, domain] = m.split("@");
  const head = user?.slice(0, 1) || "*";
  return `${head}*****@${domain}`;
}

export function redactPII(text = "") {
  return text
    .replace(phoneRegex, (m) => maskPhone(m))
    .replace(upiRegex, (m) => maskUPI(m))
    .replace(cardRegex, (m) => maskCard(m))
    .replace(emailRegex, (m) => maskEmail(m));
}

const StorySchema = new mongoose.Schema({
  textRedacted: { type: String, required: true },
  textOriginal: { type: String, required: true, select: false },
  tags: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  upvotes: { type: Number, default: 0 },
});

const CommentSchema = new mongoose.Schema({
  storyId: { type: mongoose.Schema.Types.ObjectId, ref: "Story", required: true },
  textRedacted: { type: String, required: true },
  textOriginal: { type: String, required: true, select: false },
  createdAt: { type: Date, default: Date.now },
  upvotes: { type: Number, default: 0 },
});

const Story = mongoose.model("Story", StorySchema);
const Comment = mongoose.model("Comment", CommentSchema);

const rateBuckets = new Map();
function rateLimit(key, limit, windowMs) {
  const now = Date.now();
  const bucket = rateBuckets.get(key) || [];
  const fresh = bucket.filter((t) => now - t < windowMs);
  if (fresh.length >= limit) return false;
  fresh.push(now);
  rateBuckets.set(key, fresh);
  return true;
}

const VALID_TAGS = new Set(["UPI", "KYC", "Job", "Loan", "Crypto", "Romance", "Govt", "OTP"]);
function sanitizeTags(tags) {
  if (!Array.isArray(tags)) return [];
  return [...new Set(tags.filter((t) => VALID_TAGS.has(t)).slice(0, 3))];
}

function ensureTextQuality(text) {
  const plain = text?.trim() || "";
  if (plain.length < 30) return { ok: false, reason: "Story must be at least 30 characters" };
  return { ok: true };
}


app.get("/health", (req, res) => res.json({ ok: true }));


app.post("/api/stories", async (req, res) => {
  try {
    const ip = req.ip || req.headers["x-forwarded-for"] || "unknown";
    if (!rateLimit(`story:${ip}`, 5, 60 * 60 * 1000)) {
      return res.status(429).json({ error: "Too many stories; try later" });
    }

    const { text, tags } = req.body || {};
    const chk = ensureTextQuality(text);
    if (!chk.ok) return res.status(400).json({ error: chk.reason });

    const textRedacted = redactPII(text);
    const doc = await Story.create({ textOriginal: text, textRedacted, tags: sanitizeTags(tags) });
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
});


app.get("/api/stories", async (req, res) => {
  try {
    const { page = 1, limit = 10, tag } = req.query;
    const q = {};
    if (tag && VALID_TAGS.has(String(tag))) q.tags = String(tag);

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Story.find(q).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).select("textRedacted tags createdAt upvotes"),
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
});


app.get("/api/stories/:id", async (req, res) => {
  try {
    const story = await Story.findById(req.params.id).select("textRedacted tags createdAt upvotes");
    if (!story) return res.status(404).json({ error: "Not found" });
    const comments = await Comment.find({ storyId: story._id }).sort({ createdAt: 1 }).select("textRedacted createdAt upvotes");
    return res.json({ story, comments });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to fetch story" });
  }
});


app.post("/api/stories/:id/comments", async (req, res) => {
  try {
    const ip = req.ip || req.headers["x-forwarded-for"] || "unknown";
    if (!rateLimit(`comment:${ip}`, 20, 60 * 60 * 1000)) {
      return res.status(429).json({ error: "Too many comments; try later" });
    }

    const story = await Story.findById(req.params.id).select("_id");
    if (!story) return res.status(404).json({ error: "Story not found" });

    const { text } = req.body || {};
    const plain = (text || "").trim();
    if (plain.length < 5) return res.status(400).json({ error: "Comment too short" });

    const textRedacted = redactPII(plain);
    const c = await Comment.create({ storyId: story._id, textOriginal: plain, textRedacted });
    return res.status(201).json({ _id: c._id, textRedacted: c.textRedacted, createdAt: c.createdAt, upvotes: c.upvotes });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to add comment" });
  }
});


app.post("/api/stories/:id/upvote", async (req, res) => {
  try {
    const ip = req.ip || req.headers["x-forwarded-for"] || "unknown";
    if (!rateLimit(`upvote:${ip}:${req.params.id}`, 5, 24 * 60 * 60 * 1000)) {
      return res.status(429).json({ error: "Upvote limit reached for this story" });
    }
    const updated = await Story.findByIdAndUpdate(req.params.id, { $inc: { upvotes: 1 } }, { new: true }).select("upvotes");
    if (!updated) return res.status(404).json({ error: "Story not found" });
    return res.json({ upvotes: updated.upvotes });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to upvote" });
  }
});


app.post("/api/comments/:id/upvote", async (req, res) => {
  try {
    const ip = req.ip || req.headers["x-forwarded-for"] || "unknown";
    if (!rateLimit(`cupvote:${ip}:${req.params.id}`, 5, 24 * 60 * 60 * 1000)) {
      return res.status(429).json({ error: "Upvote limit reached for this comment" });
    }
    const updated = await Comment.findByIdAndUpdate(req.params.id, { $inc: { upvotes: 1 } }, { new: true }).select("upvotes");
    if (!updated) return res.status(404).json({ error: "Comment not found" });
    return res.json({ upvotes: updated.upvotes });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to upvote" });
  }
});

app.listen(PORT, () => console.log(`Anonymous Stories API running on :${PORT}`));
