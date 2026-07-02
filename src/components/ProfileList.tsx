import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  platform: Platform;
  searchQuery: string;
  onProfileClick?: (username: string) => void;

  // NEW
  onAdd: (profile: UserProfileSummary) => void;
  savedLists: Record<Platform, UserProfileSummary[]>;
}

export function ProfileList({
  profiles,
  platform,
  searchQuery,
  onProfileClick,
  onAdd,
  savedLists,
}: ProfileListProps) {
  return (
    <div className="flex-1">
      {profiles.map((profile) => {
        const isAdded = savedLists[platform].some(
          (p) => p.username === profile.username
        );

        return (
          <ProfileCard
            key={profile.username}
            profile={profile}
            platform={platform}
            searchQuery={searchQuery}
            onProfileClick={onProfileClick}

            // NEW
            onAdd={onAdd}
            isAdded={isAdded}
          />
        );
      })}
    </div>
  );
}