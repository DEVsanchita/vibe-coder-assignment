import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery: string;
  onProfileClick?: (username: string) => void;

  // NEW
  onAdd: (profile: UserProfileSummary) => void;
  isAdded: boolean;
}

function formatFollowersLocal(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + "M followers";
  if (count >= 1000) return (count / 1000).toFixed(0) + "K followers";
  return count + " followers";
}

export function ProfileCard({
  profile,
  platform,
  searchQuery,
  onProfileClick,
  onAdd,
  isAdded,
}: ProfileCardProps) {
  const navigate = useNavigate();

const handleClick = () => {
  if (!profile.username) {
    console.warn("Profile has no username:", profile);
    return;
  }

  if (onProfileClick) {
    onProfileClick(profile.username);
  }

  navigate(`/profile/${profile.username}?platform=${platform}`);
};
  
  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-3 p-3 border border-gray-300 mb-2 cursor-pointer hover:bg-blue-950 w-[700px]"
      data-search={searchQuery}
    >
      <img
  src={profile.picture}
  alt={profile.username}
  className="w-12 h-12 rounded-full object-cover"
  onError={(e) => {
    e.currentTarget.src =
      "https://ui-avatars.com/api/?name=" +
      encodeURIComponent(profile.fullname);
  }}
/>
      <div className="text-left flex-1">
        <div className="font-bold">
          @{profile.username}
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <div className="text-sm text-gray-600">{profile.fullname}</div>
        <div className="text-sm">{formatFollowersLocal(profile.followers)}</div>
      </div>
      {/* TODO: candidates must implement Add to List feature */}
      {/* TODO: candidates must implement Add to List feature */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onAdd(profile);
        }}
        disabled={isAdded}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
          isAdded
            ? "bg-green-600 text-white cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {isAdded ? "✓ Added" : "+ Add"}
      </button>
    </div>
  );
}
