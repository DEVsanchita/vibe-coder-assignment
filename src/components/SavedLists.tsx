import type { Platform, UserProfileSummary } from "@/types";

interface SavedListsProps {
  savedLists: Record<Platform, UserProfileSummary[]>;
  onRemove: (platform: Platform, username: string) => void;
}

export function SavedLists({
  savedLists,
  onRemove,
}: SavedListsProps) {
  return (
    <div className="w-80 rounded-xl border border-gray-700 bg-[#111827] p-4 h-fit sticky top-5">
      <h2 className="text-xl font-bold mb-5 text-white">
        Saved Lists
      </h2>

      {(["instagram", "youtube", "tiktok"] as Platform[]).map(
        (platform) => (
          <div key={platform} className="mb-6">
            <h3 className="capitalize font-semibold text-blue-400 mb-2">
              {platform} List
            </h3>

            {savedLists[platform].length === 0 ? (
              <p className="text-gray-500 text-sm">
                No profiles added
              </p>
            ) : (
              savedLists[platform].map((profile) => (
                <div
                  key={profile.username}
                  className="flex justify-between items-center bg-gray-800 rounded-lg px-3 py-2 mb-2"
                >
                  <span className="text-white">
                    @{profile.username}
                  </span>

                  <button
                        onClick={() => onRemove(platform, profile.username)}
                        className="flex items-center justify-center
                                    w-9 h-9
                                    rounded-full
                                    bg-red-500
                                    hover:bg-red-600
                                    hover:scale-110
                                    transition-all
                                    shadow-md"
                        title="Remove from list"
                        >
                        🗑️
                    </button>
                </div>
              ))
            )}
          </div>
        )
      )}
    </div>
  );
}