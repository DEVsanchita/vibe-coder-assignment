import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type { Platform, UserProfileSummary } from "@/types";

type SavedListsType = Record<Platform, UserProfileSummary[]>;

interface SavedListContextType {
  savedLists: SavedListsType;
  addProfile: (platform: Platform, profile: UserProfileSummary) => void;
  removeProfile: (platform: Platform, username: string) => void;
}

const SavedListContext = createContext<SavedListContextType | null>(null);

export function SavedListProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [savedLists, setSavedLists] = useState<SavedListsType>({
    instagram: [],
    youtube: [],
    tiktok: [],
  });

  const addProfile = (
    platform: Platform,
    profile: UserProfileSummary
  ) => {
    setSavedLists((prev) => {
      if (
        prev[platform].some(
          (p) => p.username === profile.username
        )
      ) {
        return prev;
      }

      return {
        ...prev,
        [platform]: [...prev[platform], profile],
      };
    });
  };

  const removeProfile = (
    platform: Platform,
    username: string
  ) => {
    setSavedLists((prev) => ({
      ...prev,
      [platform]: prev[platform].filter(
        (p) => p.username !== username
      ),
    }));
  };

  return (
    <SavedListContext.Provider
      value={{
        savedLists,
        addProfile,
        removeProfile,
      }}
    >
      {children}
    </SavedListContext.Provider>
  );
}

export function useSavedList() {
  const context = useContext(SavedListContext);

  if (!context) {
    throw new Error(
      "useSavedList must be used inside SavedListProvider"
    );
  }

  return context;
}