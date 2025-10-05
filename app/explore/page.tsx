"use client";

import { getPosts } from "@/actions/post.action";
import { getDbUserId } from "@/actions/user.action";
import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";
import SearchWithFilter from "@/components/SearchWithFilter";
import { useAuth } from "@/lib/useAuth";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Posts = Awaited<ReturnType<typeof getPosts>>;
type Post = Posts[number];

export default function Home() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [posts, setPosts] = useState<Posts>([]);
  const [dbUserId, setDbUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("latest");

  useEffect(() => {
    if (!authLoading && !user) router.push("/signin");
  }, [user, authLoading, router]);

  const handleNewPost = (newPost: Post) => {
    setPosts(prev => [newPost, ...prev]);
  };

  useEffect(() => {
    const loadData = async () => {
      if (authLoading) return;

      setIsLoading(true);
      try {
        const postsData = await getPosts();
        setPosts(postsData);

        if (user) {
          const userId = await getDbUserId(user.uid);
          setDbUserId(userId);
        } else setDbUserId(null);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [user, authLoading]);

  // 🔍 Filtered posts
  const filteredPosts = useMemo(() => {
    let result = [...posts];

    // Search
    if (searchTerm.trim()) {
      result = result.filter(
        p =>
          p.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.author?.username?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filters
    switch (filter) {
      case "likes":
        result.sort((a, b) => (b._count.likes ?? 0) - (a._count.likes ?? 0));
        break;
      case "comments":
        result.sort((a, b) => (b.comments.length ?? 0) - (a.comments.length ?? 0));
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case "latest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "image":
        result = result.filter(p => p.image?.match(/\.(png|jpg|jpeg|gif)$/i));
        break;
      case "pdf":
        result = result.filter(p => p.fileType === "pdf");
        break;
      case "ppt":
        result = result.filter(p => p.fileType === "ppt");
        break;
      case "text":
        result = result.filter(p => !p.image && !p.fileType);
        break;
    }

    return result;
  }, [posts, searchTerm, filter]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      {/* Center: Posts */}
      <div className="lg:col-span-6">
        {user ? <CreatePost onPostCreated={handleNewPost} /> : null}
        <div className="space-y-6">
          {isLoading ? (
            [1, 2, 3].map(n => (
              <div key={n} className="w-full h-48 bg-gray-800 rounded-lg animate-pulse" />
            ))
          ) : (
            filteredPosts.map(post => (
              <PostCard key={post.id} post={post} dbUserId={dbUserId} />
            ))
          )}
        </div>
      </div>

      {/* Right: Search + Filter */}
      <div className="hidden lg:block lg:col-span-3">
        <SearchWithFilter
          onSearch={setSearchTerm}
          onFilter={setFilter}
        />
      </div>
    </div>
  );
}