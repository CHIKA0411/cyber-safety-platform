import React, { useState, useEffect } from "react";

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}
  >
    {children}
  </div>
);

const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  onClick,
  disabled,
  type = "button",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    default:
      "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-md hover:shadow-lg",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-md",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    default: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

const Badge = ({ children, variant = "default", className = "" }) => {
  const variantStyles = {
    default: "bg-indigo-100 text-indigo-800 border-indigo-200",
    outline: "bg-white text-gray-700 border-gray-300",
    primary: "bg-indigo-600 text-white",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

const Icons = {
  ArrowLeft: () => "←",
  ThumbsUp: () => "👍",
  MessageCircle: () => "💬",
  Clock: () => "⏰",
  Tag: () => "🏷️",
  Send: () => "📤",
  Close: () => "✕",
};

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const VALID_TAGS = [
  "UPI",
  "KYC",
  "Job",
  "Loan",
  "Crypto",
  "Romance",
  "Govt",
  "OTP",
];

const StoryCard = ({ story, onSelect, onUpvote }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const truncateText = (text, maxLength = 200) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="p-6">
        <p className="text-gray-700 leading-relaxed mb-4">
          {truncateText(story.textRedacted || story.text)}
        </p>

        {story.tags && story.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {story.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="flex items-center gap-1"
              >
                <span className="text-xs">{Icons.Tag()}</span>
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-gray-500">
            <span className="text-sm">{Icons.Clock()}</span>
            <span className="text-sm">{formatDate(story.createdAt)}</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onUpvote(story._id)}
              className="flex items-center gap-1"
            >
              <span className="text-sm">{Icons.ThumbsUp()}</span>
              {story.upvotes}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSelect(story)}
              className="flex items-center gap-1"
            >
              <span className="text-sm">{Icons.MessageCircle()}</span>
              View Details
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

const StoryDetail = ({ story, onBack, onUpvoteStory }) => {
  const [storyData, setStoryData] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    fetchStoryDetails();
  }, [story._id]);

  const fetchStoryDetails = async () => {
    try {
      const response = await fetch(`${API_BASE}/stories/${story._id}`);
      const data = await response.json();
      setStoryData(data.story);
      setComments(data.comments);
    } catch (error) {
      console.error("Error fetching story details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async () => {
    if (newComment.trim().length < 5) {
      alert("Comment must be at least 5 characters");
      return;
    }

    setSubmittingComment(true);
    try {
      const response = await fetch(
        `${API_BASE}/stories/${story._id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: newComment }),
        }
      );

      if (response.ok) {
        const newCommentData = await response.json();
        setComments((prev) => [...prev, newCommentData]);
        setNewComment("");
      } else {
        const error = await response.json();
        alert(error.error || "Failed to add comment");
      }
    } catch (error) {
      alert("Failed to add comment");
      console.error("Error adding comment:", error);
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleUpvoteComment = async (commentId) => {
    try {
      const response = await fetch(`${API_BASE}/comments/${commentId}/upvote`, {
        method: "POST",
      });

      if (response.ok) {
        const data = await response.json();
        setComments((prev) =>
          prev.map((comment) =>
            comment._id === commentId
              ? { ...comment, upvotes: data.upvotes }
              : comment
          )
        );
      } else {
        const error = await response.json();
        alert(error.error || "Failed to upvote comment");
      }
    } catch (error) {
      console.error("Error upvoting comment:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading story...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 max-w-6xl">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <span>{Icons.ArrowLeft()}</span>
              Back to Stories
            </Button>
            <h1 className="text-xl font-bold text-gray-900">Story Details</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="mb-8 shadow-lg">
          <div className="p-8">
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              {storyData?.textRedacted || storyData?.text}
            </p>

            {storyData?.tags && storyData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {storyData.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="primary"
                    className="flex items-center gap-1 text-sm px-3 py-1"
                  >
                    <span>{Icons.Tag()}</span>
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 text-gray-500">
                <span>{Icons.Clock()}</span>
                <span className="text-sm">
                  {formatDate(storyData?.createdAt)}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  onClick={() => onUpvoteStory(story._id)}
                  className="flex items-center gap-2"
                >
                  <span>{Icons.ThumbsUp()}</span>
                  {storyData?.upvotes}
                </Button>
                <div className="flex items-center gap-2 text-gray-500">
                  <span>{Icons.MessageCircle()}</span>
                  <span className="text-sm">{comments.length} comments</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="mb-8 shadow-lg">
          <div className="p-6">
            <h3 className="text-lg font-bold mb-4 text-gray-900">
              Add a Comment
            </h3>
            <div className="space-y-4">
              <textarea
                className="w-full p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Share your thoughts (minimum 5 characters)..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows="3"
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {newComment.length}/5 minimum
                </span>
                <Button
                  onClick={handleSubmitComment}
                  disabled={submittingComment || newComment.trim().length < 5}
                  className="flex items-center gap-2"
                >
                  {submittingComment ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Posting...
                    </>
                  ) : (
                    <>
                      <span className="text-sm">{Icons.Send()}</span>
                      Post Comment
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900">
            Comments ({comments.length})
          </h3>

          {comments.length === 0 ? (
            <Card className="shadow-lg">
              <div className="p-12 text-center">
                <div className="text-4xl mb-4">💭</div>
                <p className="text-gray-500">
                  No comments yet. Be the first to comment!
                </p>
              </div>
            </Card>
          ) : (
            comments.map((comment) => (
              <Card
                key={comment._id}
                className="shadow-lg hover:shadow-xl transition-shadow duration-200"
              >
                <div className="p-6">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {comment.textRedacted}
                  </p>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-gray-500">
                      <span className="text-sm">{Icons.Clock()}</span>
                      <span className="text-sm">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleUpvoteComment(comment._id)}
                      className="flex items-center gap-1"
                    >
                      <span className="text-sm">{Icons.ThumbsUp()}</span>
                      {comment.upvotes}
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

function Anonymous() {
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedTag, setSelectedTag] = useState("");

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newStory, setNewStory] = useState("");
  const [newStoryTags, setNewStoryTags] = useState([]);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchStories(1, selectedTag);
  }, [selectedTag]);

  const fetchStories = async (pageNum = 1, tag = "") => {
    setLoading(true);
    try {
      const url = new URL(`${API_BASE}/stories`, window.location.origin);
      url.searchParams.append("page", pageNum);
      url.searchParams.append("limit", "10");
      if (tag) url.searchParams.append("tag", tag);

      const response = await fetch(url);
      const data = await response.json();

      if (pageNum === 1) {
        setStories(data.items);
      } else {
        setStories((prev) => [...prev, ...data.items]);
      }

      setHasMore(data.items.length === 10);
      setPage(pageNum);
    } catch (error) {
      console.error("Error fetching stories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStory = async () => {
    if (newStory.trim().length < 30) {
      alert("Story must be at least 30 characters");
      return;
    }

    setCreating(true);
    try {
      const response = await fetch(`${API_BASE}/stories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: newStory,
          tags: newStoryTags,
        }),
      });

      if (response.ok) {
        const newStoryData = await response.json();
        setStories((prev) => [newStoryData, ...prev]);
        setNewStory("");
        setNewStoryTags([]);
        setShowCreateForm(false);
      } else {
        const error = await response.json();
        alert(error.error || "Failed to create story");
      }
    } catch (error) {
      alert("Failed to create story");
      console.error("Error creating story:", error);
    } finally {
      setCreating(false);
    }
  };

  const handleTagToggle = (tag) => {
    if (newStoryTags.includes(tag)) {
      setNewStoryTags((prev) => prev.filter((t) => t !== tag));
    } else if (newStoryTags.length < 3) {
      setNewStoryTags((prev) => [...prev, tag]);
    }
  };

  const handleUpvoteStory = async (storyId) => {
    try {
      const response = await fetch(`${API_BASE}/stories/${storyId}/upvote`, {
        method: "POST",
      });

      if (response.ok) {
        const data = await response.json();
        setStories((prev) =>
          prev.map((story) =>
            story._id === storyId ? { ...story, upvotes: data.upvotes } : story
          )
        );
      } else {
        const error = await response.json();
        alert(error.error || "Failed to upvote");
      }
    } catch (error) {
      console.error("Error upvoting story:", error);
    }
  };

  if (selectedStory) {
    return (
      <StoryDetail
        story={selectedStory}
        onBack={() => setSelectedStory(null)}
        onUpvoteStory={handleUpvoteStory}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 max-w-6xl">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                💭 Anonymous Stories
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                Share your scam experiences anonymously to help others stay safe
              </p>
            </div>
            <Button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center gap-2"
            >
              ✨ Share Your Story
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Filter by category:
          </h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedTag === "" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag("")}
            >
              All Stories
            </Button>
            {VALID_TAGS.map((tag) => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {stories.map((story) => (
            <StoryCard
              key={story._id}
              story={story}
              onSelect={setSelectedStory}
              onUpvote={handleUpvoteStory}
            />
          ))}
        </div>

        {hasMore && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => fetchStories(page + 1, selectedTag)}
              disabled={loading}
              className="flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  Loading...
                </>
              ) : (
                "Load More Stories"
              )}
            </Button>
          </div>
        )}

        {stories.length === 0 && !loading && (
          <Card className="shadow-lg">
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No stories found
              </h3>
              <p className="text-gray-600 mb-6">
                Be the first to share your experience and help others stay safe!
              </p>
              <Button onClick={() => setShowCreateForm(true)}>
                Share Your Story
              </Button>
            </div>
          </Card>
        )}
      </div>

      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Share Your Anonymous Story
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowCreateForm(false);
                    setNewStory("");
                    setNewStoryTags([]);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {Icons.Close()}
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your story (minimum 30 characters)
                  </label>
                  <textarea
                    className="w-full p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Share your experience anonymously to help others stay safe from similar scams..."
                    value={newStory}
                    onChange={(e) => setNewStory(e.target.value)}
                    rows="6"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">
                      {newStory.length}/30 minimum
                    </span>
                    <span className="text-xs text-gray-400">
                      Your identity will remain completely anonymous
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categories (max 3)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {VALID_TAGS.map((tag) => (
                      <Button
                        key={tag}
                        variant={
                          newStoryTags.includes(tag) ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => handleTagToggle(tag)}
                        disabled={
                          !newStoryTags.includes(tag) &&
                          newStoryTags.length >= 3
                        }
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Select categories that best describe your experience
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowCreateForm(false);
                      setNewStory("");
                      setNewStoryTags([]);
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateStory}
                    disabled={creating || newStory.trim().length < 30}
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    {creating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sharing...
                      </>
                    ) : (
                      "Share Story"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Anonymous;
