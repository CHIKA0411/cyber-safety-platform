import mongoose from "mongoose";

const StorySchema = new mongoose.Schema({
  textRedacted: { type: String, required: true },
  textOriginal: { type: String, required: true, select: false },
  tags: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  upvotes: { type: Number, default: 0 },
});

const Story = mongoose.model("Story", StorySchema);

export default Story;
