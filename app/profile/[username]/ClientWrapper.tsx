"use client";

import { useAuth } from "@/lib/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
	getProfileByUsername,
	getUserLikedPosts,
	getUserPosts,
	isFollowing,
} from "@/actions/profile.action";
import ProfilePageClient from "./ProfilePageClient";
import Loader from "@/components/Loader";

interface ClientWrapperProps {
	params: { username: string };
	profileUser: NonNullable<Awaited<ReturnType<typeof getProfileByUsername>>>;
}

type User = Awaited<ReturnType<typeof getProfileByUsername>>;
type Posts = Awaited<ReturnType<typeof getUserPosts>>;

export default function ClientWrapper({ params, profileUser }: ClientWrapperProps) {
	const { user, loading } = useAuth();
	const router = useRouter();
	const [data, setData] = useState<{
		user: NonNullable<User>;
		posts: Posts;
		likedPosts: Posts;
		isFollowing: boolean;
	} | null>(null);
	const [dataLoading, setDataLoading] = useState(true);

	useEffect(() => {
		if (!loading && !user) {
			router.replace("/signin");
		}
	}, [user, loading, router]);

	useEffect(() => {
		const fetchData = async () => {
			if (!user) return;
			try {
				// Since we already have the profileUser from server, no need to fetch it again
				const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
					getUserPosts(profileUser.id),
					getUserLikedPosts(profileUser.id),
					isFollowing(profileUser.id, user.uid),
				]);
				setData({
					user: profileUser,
					posts,
					likedPosts,
					isFollowing: isCurrentUserFollowing,
				});
			} catch (error) {
				console.error("Error fetching profile data:", error);
			} finally {
				setDataLoading(false);
			}
		};
		fetchData();
	}, [user, params, profileUser]);

	// Show loader while loading auth or data
	if (loading || !user || dataLoading || !data) {
		return <Loader />;
	}

	return (
		<ProfilePageClient
			user={data.user}
			posts={data.posts}
			likedPosts={data.likedPosts}
			isFollowing={data.isFollowing}
		/>
	);
}
