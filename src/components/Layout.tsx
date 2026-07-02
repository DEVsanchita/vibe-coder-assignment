import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { SavedLists } from "./SavedLists";
import { useSavedList } from "@/context/SavedListContext";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  const { savedLists, removeProfile } = useSavedList();

  return (
    <div className="min-h-screen px-8 py-6">
      <header className="mb-8 border-b border-gray-700 pb-4">
        <Link
          to="/"
          className="text-xl font-bold text-white hover:text-blue-400 transition"
        >
          Influencer Search
        </Link>

        {title && (
          <h1 className="text-5xl font-bold text-white mt-6">
            {title}
          </h1>
        )}
      </header>

      <div className="flex gap-8 items-start">
        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Sidebar */}
        <aside className="w-[340px] sticky top-6">
          <SavedLists
            savedLists={savedLists}
            onRemove={removeProfile}
          />
        </aside>
      </div>
    </div>
  );
}