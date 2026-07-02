import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Platform } from "@/types";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";
import { useSavedList } from "@/context/SavedListContext";

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPlatform =
    (searchParams.get("platform") as Platform) || "instagram";

  const [platform, setPlatform] = useState<Platform>(initialPlatform);
  const [searchQuery, setSearchQuery] = useState("");


  const { savedLists, addProfile } = useSavedList();

  const allProfiles = extractProfiles(platform);
  const filtered = filterProfiles(allProfiles, searchQuery);

  const handleProfileClick = (username: string) => {
    
    console.log("Clicked profile:", username);
  };

  const handlePlatformChange = (p: Platform) => {
    setPlatform(p);
    setSearchQuery("");

    setSearchParams({
      platform: p,
    });
  };

  return (
    <Layout title="Find Influencers">
      <p className="text-gray-500 mb-4 text-sm">
        Browse top creators across social platforms
      </p>

      <PlatformFilter
        selected={platform}
        onChange={handlePlatformChange}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <p className="text-xs text-gray-400 mb-2">
        Showing {filtered.length} of {allProfiles.length} on {platform}
      </p>

      <ProfileList
        profiles={filtered}
        platform={platform}
        searchQuery={searchQuery}
        onProfileClick={handleProfileClick}
        onAdd={(profile) => addProfile(platform, profile)}
        savedLists={savedLists}
      />
    </Layout>
  );
}
