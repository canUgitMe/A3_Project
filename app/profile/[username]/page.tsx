import {
  getProfileByUsername,
} from "@/actions/profile.action";
import { notFound } from "next/navigation";
import ClientWrapper from "./ClientWrapper";

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const user = await getProfileByUsername(username);
  if (!user) return;

  return {
    title: `${user.name ?? user.username}`,
    description: user.bio || `Check out ${user.username}'s profile.`,
  };
}

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;

  // Check if user exists on the server side
  const profileUser = await getProfileByUsername(username);

  // If user doesn't exist, trigger not-found page
  if (!profileUser) {
    notFound();
  }

  // Pass the resolved params to the client component
  return <ClientWrapper params={{ username }} profileUser={profileUser} />;
}
