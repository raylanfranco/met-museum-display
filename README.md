# The Met Museum Viewer

Explore the Metropolitan Museum of Art’s open collection via a clean, responsive, and TypeScript-driven interface. Built as a take-home challenge, this project demonstrates strong architectural decisions, clean modular code, and a thoughtful user experience without sacrificing performance.

---

## Getting Started

### Install Dependencies

```bash
npm install
```

## Run the Development Server
``` 
npm run dev
```
Navigate to http://localhost:5173 in your browser to explore the app.

## Tech Stack
Framework: React (via Vite)
<br>
Language: TypeScript
<br>
Styling: Tailwind CSS
<br>
API: The Met Museum Collection API

## Features Implemented
- Paginated gallery of artwork results
- Individual object detail view with metadata
- Filter by Department dropdown
- Search by Title or Object ID
- Clean error handling (404s, missing images)
- Fully mobile responsive and accessible layout
- Modular component-based architecture

## Code Highlights
- Component Architecture
- Gallery — Grid-based layout that renders ArtCard components
- ArtCard — Modular unit to display artwork title, creator, date, and image
- DepartmentFilter — Clean dropdown with persistent selection for filtering departments
- SearchBar — Inline search bar accepting title or object ID
- ObjectPage — Dedicated detail view of individual artwork, navigated via React Router

### API Utilities
All network logic is modularized in metApi.ts:

```
fetchDepartments()
searchObjects(query: string, departmentId?: number)
fetchObjectById(id: number)
```
Handles 404s gracefully and returns typed responses for defensive UI rendering.

## Design Thoughts
This project was approached the same way I’d tackle a greenfield feature in a production codebase:

- I prioritized data fetching and rendering logic early on — establishing a stable flow of paginated artwork and handling API edge cases (like null images or 404s).
- Component structure was mapped out as reusable blocks (Gallery, ArtCard, ObjectPage, etc.) with clarity and scalability in mind.
- State was kept localized where possible, and the search/filter logic was modularized for clarity.
- Image fallback, graceful 404 handling, and pagination edge cases were all accounted for.
- I avoided premature optimizations and styled for clarity first — ensuring responsiveness and visual consistency on mobile and desktop.

## Submission Notes
This project reflects how I approach real-world development:

- Organized, modular code
- Thoughtful UX decisions
- Problem-solving mindset
- Attention to responsiveness and readability

Thanks again for the opportunity — I had fun building this!
<br>
— Ray