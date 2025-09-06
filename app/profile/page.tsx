"use client";

import { useAuth } from "@/lib/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCurrentUserProfile } from "@/actions/profile.action";

export default function ProfileRedirectPage() {
	const { user, loading } = useAuth();
	const router = useRouter();
	const [isRedirecting, setIsRedirecting] = useState(true);

	useEffect(() => {
		const handleRedirect = async () => {
			// Wait for auth state to be determined
			if (loading) return;

			// If not authenticated, redirect to sign in
			if (!user) {
				router.replace("/signin");
				return;
			}

			try {
				// If authenticated, get user profile to find username
				const profile = await getCurrentUserProfile(user.uid);

				if (profile?.username) {
					// Redirect to their profile page
					router.replace(`/profile/${profile.username}`);
				} else {
					// If no profile found, redirect to sign in
					router.replace("/signin");
				}
			} catch (error) {
				console.error("Error fetching user profile:", error);
				router.replace("/signin");
			}
		};

		handleRedirect();
	}, [user, loading, router]);

	// Show loading spinner while redirecting
	if (isRedirecting || loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
					<p className="text-muted-foreground">Redirecting...</p>
				</div>
			</div>
		);
	}

	return null;
}