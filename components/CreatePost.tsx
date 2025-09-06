"use client";

import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useAuth } from "@/lib/useAuth";
import { Textarea } from "./ui/textarea";
import { ImageIcon, Loader2Icon, SendIcon } from "lucide-react";
import { Button } from "./ui/button";
import { createPost } from "@/actions/post.action";
import toast from "react-hot-toast";
import ImageUpload from "./ImageUpload";

type Props = {
	onPostCreated?: (newPost: any) => void;
};

function CreatePost({ onPostCreated }: Props) {
	const { user } = useAuth();
	const [content, setContent] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [isPosting, setIsPosting] = useState(false);
	const [showImageUpload, setShowImageUpload] = useState(false);

	const handleSubmit = async () => {
		console.log("Starting post creation...");
		console.log("Current user:", user);

		if (!content.trim() && !imageUrl) {
			console.log("No content or image provided");
			return;
		}

		if (!user?.uid) {
			console.log("No user found");
			toast.error("Please sign in to create a post");
			return;
		}

		setIsPosting(true);
		try {
			console.log("Calling createPost with:", {
				content: content.trim(),
				imageUrl,
				userId: user.uid
			});

			const result = await createPost(content.trim(), imageUrl, user.uid);
			console.log("Create post result:", result);

			if (result?.success) {
				console.log("Post created successfully:", result.post);

				// Update the UI with the new post
				if (onPostCreated) {
					console.log("Calling onPostCreated with:", result.post);
					onPostCreated(result.post);
				} else {
					console.warn("onPostCreated callback is not defined!");
				}

				// Clear the form
				setContent("");
				setImageUrl("");
				setShowImageUpload(false);
				toast.success("Post created successfully");
			} else {
				console.error("Post creation failed:", result?.error);
				toast.error(result?.error || "Failed to create post. Please try again.");
			}
		} catch (error) {
			console.error("Error creating post:", error);
			toast.error("Failed to create post. Please try again.");
		} finally {
			setIsPosting(false);
		}
	};

	return (
		<Card className="mb-6 border-[#6600ff]">
			<CardContent className="pt-6">
				<div className="space-y-4">
					<div className="flex space-x-4">
						<Avatar className="w-10 h-10">
							<AvatarImage src={user?.photoURL || "./avatar.png"} />
						</Avatar>
						<Textarea
							placeholder="What's on your mind?"
							className="min-h-[100px] resize-none border-none focus-visible:ring-0 p-0 text-base"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							disabled={isPosting}
						/>
					</div>

					{(showImageUpload || imageUrl) && (
						<div className="border border-[#6600ff] rounded-lg p-4">
							<ImageUpload
								endpoint="postImage"
								value={imageUrl}
								onChange={(url) => {
									setImageUrl(url);
									if (!url) setShowImageUpload(false);
								}}
							/>
						</div>
					)}

					<div className="flex items-center justify-between border-t border-[#6600ff] pt-4">
						<div className="flex space-x-2">
							<Button
								type="button"
								variant="ghost"
								size="sm"
								className=""
								onClick={() => setShowImageUpload(!showImageUpload)}
								disabled={isPosting}
							>
								<ImageIcon className="size-4 mr-2" />
								Photo
							</Button>
						</div>
						<Button
							className="flex items-center"
							onClick={handleSubmit}
							disabled={(!content.trim() && !imageUrl) || isPosting}
						>
							{isPosting ? (
								<>
									<Loader2Icon className="size-4 mr-2 animate-spin" />
									Posting...
								</>
							) : (
								<>
									<SendIcon className="size-4 mr-2" />
									Post
								</>
							)}
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
export default CreatePost;
