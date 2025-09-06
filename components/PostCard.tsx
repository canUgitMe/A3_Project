"use client";

import { createComment, deletePost, getPosts, toggleLike } from "@/actions/post.action";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { Avatar, AvatarImage } from "./ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { DeleteAlertDialog } from "./DeleteAlertDialog";
import { Button } from "./ui/button";
import { HeartIcon, LogInIcon, MessageCircleIcon, SendIcon } from "lucide-react";
import { Textarea } from "./ui/textarea";

type Posts = Awaited<ReturnType<typeof getPosts>>;
type Post = Posts[number];

function PostCard({ post, dbUserId }: { post: Post; dbUserId: string | null }) {
  const [user, setUser] = useState<any>(null);
  const [newComment, setNewComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [optimisticLikes, setOptmisticLikes] = useState(post._count.likes);
  const [showComments, setShowComments] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [hasLiked, setHasLiked] = useState(post.likes.some(like => like.userId === dbUserId));
  // Local state for comments
  const [comments, setComments] = useState(post.comments);

  // Update like status when dbUserId changes
  useEffect(() => {
    console.log("DB USER ID: " + dbUserId)
    setHasLiked(post.likes.some(like => like.userId === dbUserId));
  }, [dbUserId, post.likes]);

  // Monitor Firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLike = async () => {
    if (isLiking || !user) return;
    try {
      setIsLiking(true);

      // Optimistically update the UI
      const newHasLiked = !hasLiked;
      setHasLiked(newHasLiked);
      setOptmisticLikes(prev => prev + (newHasLiked ? 1 : -1));

      // Make the API call
      const result = await toggleLike(post.id, user.uid);
      if (!result.success) throw new Error(result.error);

      // The server action will update the likes in the database,
      // and the next page refresh will show the correct state
    } catch (error) {
      // Revert optimistic updates if there's an error
      setHasLiked(!hasLiked);
      setOptmisticLikes(post._count.likes);
      toast.error("Failed to update like");
    } finally {
      setIsLiking(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || isCommenting || !user) return;
    try {
      setIsCommenting(true);
      const result = await createComment(post.id, newComment, user.uid);
      if (result?.success) {
        toast.success("Comment posted successfully");
        setNewComment("");
        // Add the new comment to local state for real-time update
        if (result.comment) {
          setComments(prev => [
            {
              ...result.comment,
              author: {
                id: user.uid,
                name: user.displayName || "Anonymous",
                username: user.displayName ? user.displayName.replace(/\s+/g, '').toLowerCase() : "anonymous",
                image: user.photoURL || user.imageUrl || user.image || "/avatar.png"
              }
            },
            ...prev
          ]);
        }
      } else {
        throw new Error(result?.error || "Failed to post comment");
      }
    } catch (error) {
      toast.error("Failed to add comment");
    } finally {
      setIsCommenting(false);
    }
  };

  const handleDeletePost = async () => {
    if (isDeleting || !user) return;
    try {
      setIsDeleting(true);
      // Optimistically hide the post
      setIsDeleted(true);
      const result = await deletePost(post.id, user.uid);
      if (result.success) {
        toast.success("Post deleted successfully");
      } else {
        // If deletion fails, show the post again
        setIsDeleted(false);
        throw new Error(result.error);
      }
    } catch (error) {
      toast.error("Failed to delete post");
    } finally {
      setIsDeleting(false);
    }
  };

  // Don't render the card if it's been deleted
  if (isDeleted) return null;

  return (
    <Card className="overflow-hidden border-[#6600ff]">
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4">
          <div className="flex space-x-3 items-center sm:space-x-4">
            <Link href={`/profile/${post.author.username}`}>
              <Avatar className="size-8 sm:w-10 sm:h-10">
                <AvatarImage src={post.author.image ?? "/avatar.png"} />
              </Avatar>
            </Link>

            {/* POST HEADER & TEXT CONTENT */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex flex-row items-center space-x-2 truncate">
                  <Link
                    href={`/profile/${post.author.username}`}
                    className="font-semibold truncate"
                  >
                    {post.author.username}
                  </Link>
                  <div className="flex items-center space-x-2 text-sm text-white/50">
                    <span>•</span>
                    <span>{formatDistanceToNow(new Date(post.createdAt))} ago</span>
                  </div>
                </div>
                {/* Check if current user is the post author */}
                {dbUserId === post.author.id && (
                  <DeleteAlertDialog isDeleting={isDeleting} onDelete={handleDeletePost} />
                )}
              </div>
            </div>
          </div>
          <p className="mt-2 text-[16px] font-semibold text-foreground break-words">{post.content}</p>

          {/* POST IMAGE */}
          {post.image && (
            <div className="rounded-lg overflow-hidden">
              <img src={post.image} alt="Post content" className="w-full h-auto object-cover" />
            </div>
          )}

          {/* LIKE & COMMENT BUTTONS */}
          <div className="flex items-center pt-2 space-x-4">
            {user ? (
              <Button
                variant="ghost"
                size="sm"
                className={`text-muted-foreground gap-2 ${hasLiked ? "text-red-500 hover:text-red-600" : "hover:text-red-500"
                  }`}
                onClick={handleLike}
              >
                {hasLiked ? (
                  <HeartIcon className="size-5 fill-current" />
                ) : (
                  <HeartIcon className="size-5" />
                )}
                <span>{optimisticLikes}</span>
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground gap-2"
                onClick={() => {
                  const provider = new GoogleAuthProvider();
                  signInWithPopup(auth, provider);
                }}
              >
                <HeartIcon className="size-5" />
                <span>{optimisticLikes}</span>
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground gap-2 hover:text-blue-500"
              onClick={() => setShowComments((prev) => !prev)}
            >
              <MessageCircleIcon
                className={`size-5 ${showComments ? "fill-blue-500 text-blue-500" : ""}`}
              />
              <span>{comments.length}</span>
            </Button>
          </div>

          {/* COMMENTS SECTION */}
          {showComments && (
            <div className="space-y-4 pt-4 border-t">
              <div className="space-y-4">
                {/* DISPLAY COMMENTS */}
                {comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3">
                    <Avatar className="size-8 flex-shrink-0">
                      <AvatarImage src={comment.author.image ?? "/avatar.png"} />
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="font-medium text-sm">{comment.author.name}</span>
                        <span className="text-sm text-muted-foreground">
                          @{comment.author.username}
                        </span>
                        <span className="text-sm text-muted-foreground">·</span>
                        <span className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(comment.createdAt))} ago
                        </span>
                      </div>
                      <p className="text-sm break-words">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {user ? (
                <div className="flex space-x-3">
                  <Avatar className="size-8 flex-shrink-0">
                    <AvatarImage src={user?.photoURL || "/avatar.png"} />
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Write a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="min-h-[80px] resize-none border border-gray-700 focus:border-[#6600ff]"
                    />
                    <div className="flex justify-end mt-2">
                      <Button
                        size="sm"
                        onClick={handleAddComment}
                        className="flex items-center gap-2"
                        disabled={!newComment.trim() || isCommenting}
                      >
                        {isCommenting ? (
                          "Posting..."
                        ) : (
                          <>
                            <SendIcon className="size-4" />
                            Comment
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center p-4 border rounded-lg bg-muted/50">
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => {
                      const provider = new GoogleAuthProvider();
                      signInWithPopup(auth, provider);
                    }}
                  >
                    <LogInIcon className="size-4" />
                    Sign in to comment
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
export default PostCard;