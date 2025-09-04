import { getPosts } from "@/actions/post.action";
import { cache } from "react";
import { revalidatePath } from "next/cache";

// Create a stable cached function
export const getPostsCached = cache(getPosts);

// Force revalidate the posts cache and update UI
export async function revalidatePosts() {
	revalidatePath("/");
	revalidatePath("/explore");
}
