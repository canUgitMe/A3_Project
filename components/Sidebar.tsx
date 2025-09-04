"use client";

import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { LinkIcon, MapPinIcon } from "lucide-react";
import { useAuth } from "@/lib/useAuth";
import { useEffect, useState } from "react";
import { getUserByFirebaseId } from "@/actions/user.action";

type UserProfile = {
  id: string;
  name: string | null;
  username: string;
  image: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  _count: {
    followers: number;
    following: number;
  };
};

function Sidebar() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user?.uid) {
        try {
          const userProfile = await getUserByFirebaseId(user.uid);
          setProfile(userProfile);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  if (!user || !profile) {
    return (
      <div className="sticky top-20">
        {<Card className="border-[#6600ff]">
          <CardContent className="p-6 min-h-[345px] bg-gray-800 rounded-lg animate-pulse">
          </CardContent>
        </Card>}
      </div>
    );
  }

  return (
    <div className="sticky top-20">
      <Card className="border-[#6600ff]">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <Link
              href={`/profile/${profile.username}`}
              className="flex flex-col items-center justify-center"
            >
              <Avatar className="w-20 h-20 border-2 border-[#6600ff]">
                <AvatarImage src={profile.image || "/avatar.png"} />
              </Avatar>

              <div className="mt-4 space-y-1">
                <h3 className="font-semibold">{profile.name}</h3>
                <p className="text-sm text-muted-foreground">{profile.username}</p>
              </div>
            </Link>

            {profile.bio && (
              <p className="mt-3 text-sm text-muted-foreground">{profile.bio}</p>
            )}

            <div className="w-full">
              <Separator className="my-4" />
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{profile._count.following}</p>
                  <p className="text-xs text-muted-foreground">Following</p>
                </div>
                <Separator orientation="vertical" />
                <div>
                  <p className="font-medium">{profile._count.followers}</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
              </div>
              <Separator className="my-4" />
            </div>

            <div className="w-full space-y-2 text-sm">
              <div className="flex items-center text-muted-foreground">
                <MapPinIcon className="w-4 h-4 mr-2" />
                {profile.location || "No location"}
              </div>
              <div className="flex items-center text-muted-foreground">
                <LinkIcon className="w-4 h-4 mr-2 shrink-0" />
                {profile.website ? (
                  <a
                    href={profile.website}
                    className="hover:underline truncate"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {profile.website}
                  </a>
                ) : (
                  "No website"
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Sidebar;
