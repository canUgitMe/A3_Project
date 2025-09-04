"use client";

import { getPosts } from "@/actions/post.action";
import { getDbUserId } from "@/actions/user.action";
import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";
import { useAuth } from "@/lib/useAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Import the Post type from your post action file or define it here
type Posts = Awaited<ReturnType<typeof getPosts>>;
type Post = Posts[number];

export default function Home() {
	const { user, loading: authLoading } = useAuth();
	const router = useRouter();

	// Redirect to /signin if not authenticated
	useEffect(() => {
		if (!authLoading && !user) {
			router.push("/signin");
		}
	}, [user, authLoading, router]);
	const [posts, setPosts] = useState<Posts>([]);
	const [dbUserId, setDbUserId] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const handleNewPost = (newPost: Post) => {
		setPosts(prevPosts => [newPost, ...prevPosts]);
	};

	useEffect(() => {
		const loadData = async () => {
			if (authLoading) return;

			setIsLoading(true);
			try {
				// Always fetch posts
				const postsData = await getPosts();
				setPosts(postsData);

				// Only get user ID if logged in
				if (user) {
					const userId = await getDbUserId(user.uid);
					setDbUserId(userId);
					console.log('Data loaded:', { userId, postsCount: postsData.length });
				} else {
					setDbUserId(null);
					console.log('Loading posts for non-authenticated user');
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		loadData();
	}, [user, authLoading]);

	return (
		<div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
			<div className="lg:col-span-6">
				{user ? <CreatePost onPostCreated={handleNewPost} /> : null}

				<div className="space-y-6">
					{isLoading ? (
						<>
							{[1, 2, 3].map((n) => (
								<div key={n} className="w-full h-48 bg-gray-800 rounded-lg animate-pulse" />
							))}
						</>
					) : (
						posts.map((post) => (
							<PostCard
								key={post.id}
								post={post}
								dbUserId={dbUserId}
							/>
						))
					)}
				</div>
			</div>
		</div>
	);
}
