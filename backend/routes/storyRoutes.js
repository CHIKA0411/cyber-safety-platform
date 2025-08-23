import express from "express";
import {
  createStory,
  getStories,
  getStory,
  addComment,
  upvoteStory,
  upvoteComment,
} from "../controller/storyController.js";

const router = express.Router();

router.post("/", createStory);
router.get("/", getStories);
router.get("/:id", getStory);
router.post("/:id/comments", addComment);
router.post("/:id/upvote", upvoteStory);
router.post("/comments/:id/upvote", upvoteComment);

export default router;
