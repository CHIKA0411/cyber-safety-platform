import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  storyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Story",
    required: true,
  },
  textRedacted: { type: String, required: true },
  textOriginal: { type: String, required: true, select: false },
  createdAt: { type: Date, default: Date.now },
  upvotes: { type: Number, default: 0 },
});

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
