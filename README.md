# Influencer Search Assignment

## Overview

This project is an Influencer Search application built with React, TypeScript, Vite, and Tailwind CSS. It allows users to browse top influencers across Instagram, YouTube, and TikTok, view detailed profile information, and maintain separate saved lists for each platform.

---

## What I Changed

### 1. Improved Profile Cards
- Fixed profile image rendering with avatar fallback using `onError`.
- Added profile image `alt` text.
- Improved styling for better responsiveness.
- Implemented the **Add to List** feature.

### 2. Saved Lists Feature
Implemented the missing **Add to List** functionality by:
- Creating separate saved lists for Instagram, YouTube, and TikTok.
- Preventing duplicate entries.
- Displaying saved profiles in a sidebar.
- Allowing profiles to be removed from the list.
- Showing the **✓ Added** state once a profile has been saved.

### 3. Global State Management
Implemented a global state using **React Context API**:
- Created `SavedListContext`
- Created `SavedListProvider`
- Added `useSavedList()` custom hook

This keeps the saved lists synchronized across the Search page and Profile Detail page.

### 4. Sidebar
Created a reusable sidebar that:
- Displays separate saved lists for each platform.
- Remains visible across pages using the shared `Layout` component.
- Allows users to remove saved profiles.

### 5. Profile Detail Page
Enhanced the detail page to:
- Preserve the selected platform when navigating back.
- Integrate with the shared saved list.
- Allow profiles to be added directly from the detail page.
- Display the correct button state when a profile is already saved.

### 6. Navigation Improvements
- Preserved platform selection using URL query parameters.
- Fixed the "Back to Search" navigation so users return to the previously selected platform instead of always returning to Instagram.

### 7. UI Improvements
- Improved spacing and alignment.
- Enhanced button styles.
- Better card layout.
- Sticky saved-list sidebar.
- Improved overall user experience.

---

## Libraries Used

No additional third-party libraries were added.

The project uses:

- React
- TypeScript
- React Router
- Vite
- Tailwind CSS

Global state management is implemented using React Context API.

---

## Assumptions Made

- Usernames are unique within each platform.
- A profile can only be added once to its platform-specific saved list.
- Saved lists are maintained only during the current session (no persistence after refresh).
- Some profile image URLs are served by third-party providers and may be subject to rate limits.

---

## Trade-offs

### React Context API
I chose React Context over Redux or Zustand because:
- The application's state requirements are relatively small.
- It avoids introducing additional dependencies.
- It keeps the implementation simple and maintainable.

### Session Storage Only
Saved lists are stored only in application memory.

Advantages:
- Simple implementation.
- Easy state management.

Disadvantage:
- Saved lists are lost after a page refresh.

---

## My Observed Issues

Some **YouTube profile image URLs** return **HTTP 429 (Too Many Requests)** from `yt3.googleusercontent.com`. The application correctly requests the image URLs, but the external image host temporarily rate-limits repeated requests.

This behavior is external to the application and not caused by the frontend implementation.

A production-ready solution would be to:
- Cache frequently requested profile images.
- Proxy image requests through the backend.
- Store profile images on the application's own CDN or storage service.
- Implement a fallback placeholder image while the original image is unavailable.

---

## Remaining Improvements

If more time were available, I would implement:

- Persist saved lists using Local Storage or a backend.
- Better loading placeholders for images.
- Debounced search.
- Search suggestions.
- Toast notifications for add/remove actions.
- Mobile responsiveness improvements.
- Drag-and-drop ordering of saved profiles.
- Sorting and filtering within saved lists.
- Unit and integration tests.

---

## Project Structure

```
src/
├── assets/
├── components/
│   ├── Layout
│   ├── PlatformFilter
│   ├── ProfileCard
│   ├── ProfileList
│   ├── SavedLists
│   └── VerifiedBadge
│
├── context/
│   └── SavedListContext
│
├── pages/
│   ├── SearchPage
│   └── ProfileDetailPage
│
├── types/
├── utils/
└── App.tsx
```

---

## Future Scope

Potential future enhancements include:
- User authentication.
- Cloud-synchronized saved lists.
- Advanced filtering and sorting.
- Analytics dashboard.
- Custom user-created collections.
- Infinite scrolling.
- Persistent storage.

---

## Author

**Sanchita Majumdar**