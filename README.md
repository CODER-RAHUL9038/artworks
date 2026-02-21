# 🎨 Artworks Data Table

### React + TypeScript + PrimeReact + Server-Side Pagination

<p align="center">
  <img src="public/table.png" width="900" />
</p>

<p align="center">
  <img src="public/overlay.png" width="900" />
</p>

<p align="center">
  <img src="public/pagination.png" width="900" />
</p>

---

## 🧩 Overview

A fully server-side paginated data table built using **React (Vite) + TypeScript + PrimeReact**, displaying artwork data from the Art Institute of Chicago API.

This project demonstrates real-world frontend architecture including persistent row selection across pages without prefetching data.

---

## ✨ Key Features

### 📄 Server-Side Pagination

- Lazy loading enabled
- Only current page data is fetched
- No unnecessary memory usage

### ✅ Persistent Row Selection

- Selection preserved across page navigation
- Implemented using `Set<number>` for O(1) lookup
- Memory-efficient (stores only IDs, not full objects)

### 🎛 Custom Selection Overlay

- Bulk select N rows dynamically
- Clean UI using PrimeReact `OverlayPanel`
- Input validation included

### ⚡ Optimized Architecture

- Functional state updates
- Controlled pagination logic
- Type-safe API integration
- Clean separation of concerns

---

## 🏗️ Project Architecture

```
App
 ├── useArtworks (Custom Hook for API & pagination)
 ├── DataTable (PrimeReact)
 ├── Selection Logic (Set-based state)
 └── Overlay Panel (Custom bulk selection UI)
```

---

## 📦 Tech Stack

| Technology        | Purpose                   |
| ----------------- | ------------------------- |
| React (Vite)      | Frontend framework        |
| TypeScript        | Type safety               |
| PrimeReact        | DataTable & UI components |
| Art Institute API | External data source      |

---

## 🚀 Live Demo

👉 **Deployed URL:**  
https://display-artwork.netlify.app/

---

## 📥 Installation

```bash
git clone https://github.com/CODER-RAHUL9038/artworks.git
cd artworks
npm install
npm run dev
```

---

## 📌 API Reference

Data Source:  
https://api.artic.edu/docs/

---

## 💡 Future Improvements

- Add search & filtering
- Add sorting
- Add export functionality
- Add row selection persistence via backend
- Add unit testing

---

## 👨‍💻 Author

**Rahul Shaw**  
Aspiring Full Stack Developer  
MRN Stack (MongoDB, React, Node.js)
