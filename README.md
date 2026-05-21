# Dainik Navsandesh — Full Stack News CMS Platform

## Live Demo

[Dainik Navsandesh Live Website]https://dainik-navsandesh.vercel.app/

---

# Project Overview

Dainik Navsandesh is a modern full-stack dynamic news publishing platform built using React, TypeScript, Firebase, and Cloudinary.

The platform allows journalists or administrators to securely log in, publish articles with images, manage dynamic news content, and deliver real-time news updates to readers through a responsive web interface.

The system is designed following a CMS (Content Management System) architecture similar to modern digital newsroom platforms.

---

# Key Features

## Admin Authentication

* Secure admin login using Firebase Authentication
* Protected admin dashboard routes
* Session persistence using localStorage

---

## News Publishing CMS

Administrators can:

* Publish news articles
* Add titles and subtitles
* Select article categories
* Write full article content
* Upload images
* Delete articles

---

## Dynamic Homepage

The homepage dynamically fetches articles from Firestore and displays:

* Hero story section
* Sidebar latest news
* Category-wise grouped articles
* Dynamic article links

---

## Dynamic Article Pages

Each article has its own dedicated route.

Example:

```bash
/news/:id
```

Readers can:

* Open full articles
* View article metadata
* Read complete content
* View uploaded images

---

## Cloudinary Image Hosting

Images uploaded by journalists are:

* Sent to Cloudinary
* Converted into secure URLs
* Stored in Firestore documents

---

## Firestore Database Integration

All articles are stored in Firebase Firestore.

The homepage and article pages fetch data dynamically from the database.

---

# Tech Stack

## Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* shadcn/ui
* React Router DOM

---

## Backend and Services

* Firebase Authentication
* Firebase Firestore
* Cloudinary

---

# Project Architecture

```text
Admin Login
      ↓
Admin Dashboard
      ↓
Write Article
      ↓
Upload Image → Cloudinary
      ↓
Save Article → Firestore
      ↓
Homepage Fetches Articles
      ↓
Hero Story + Sidebar + Categories
      ↓
Reader Clicks Article
      ↓
/news/:id
      ↓
Full Article Page
```

---

# Folder Structure

```bash
src
│
├── components
│   ├── ui
│   └── newspaper
│       ├── Header.tsx
│       ├── Footer.tsx
│       ├── HeroStory.tsx
│       ├── SidebarNews.tsx
│       ├── CategorySection.tsx
│       └── BreakingTicker.tsx
│
├── pages
│   ├── Index.tsx
│   ├── AdminLogin.tsx
│   ├── AdminDashboard.tsx
│   ├── ArticlePage.tsx
│   ├── Archive.tsx
│   └── NotFound.tsx
│
├── components
│   └── ProtectedRoute.tsx
│
├── lib
│   └── firebase.ts
│
├── types
│   └── article.ts
│
└── App.tsx
```

---

# Routing Structure

| Route              | Description          |
| ------------------ | -------------------- |
| `/`                | Homepage             |
| `/admin`           | Admin Login          |
| `/admin/dashboard` | Admin Dashboard      |
| `/archive`         | Archive Page         |
| `/news/:id`        | Dynamic Article Page |
| `*`                | Not Found Page       |

---

# Firestore Database Structure

## Collection

```bash
news
```

## Example Document

```json
{
  "title": "AI Breakthrough in Healthcare",
  "subtitle": "New advancements in ML",
  "category": "Technology",
  "content": "Detailed article content...",
  "imageUrl": "https://res.cloudinary.com/...",
  "author": "Akhil Himnad",
  "createdAt": "Timestamp"
}
```

---

# Authentication Flow

## Admin Login Route

```bash
/admin
```

Uses Firebase Authentication for secure access.

Successful login stores admin session data in:

```bash
localStorage → admin_user
```

Protected routes ensure that only authenticated admins can access the CMS dashboard.

---

# Cloudinary Image Upload Workflow

```text
Image Selected
      ↓
Upload to Cloudinary API
      ↓
secure_url generated
      ↓
URL stored in Firestore
```

---

# Homepage Rendering Logic

## Hero Story

Displays the latest article with:

* Featured image
* Category
* Title
* Subtitle

---

## Sidebar News

Displays the latest secondary articles.

---

## Category Sections

Articles are grouped dynamically by category.

Example:

```text
Politics
  ├── Article
  ├── Article

Sports
  ├── Article
```

---

# Dynamic Article Page

## Route

```bash
/news/:id
```

## Displays

* Full article title
* Subtitle
* Hero image
* Author
* Category
* Publish date
* Full content

---

# React Concepts Used

* useState
* useEffect
* useMemo
* Dynamic routing
* Component-based architecture
* Conditional rendering

---

# Firebase Concepts Used

* Firebase Authentication
* Firestore CRUD operations
* Dynamic document fetching
* Firestore collections and documents

---

# TypeScript Concepts Used

* Interfaces
* Optional properties
* Type-safe props
* Dynamic typing for Firestore data

---

# Installation and Setup

## Clone Repository

```bash
git clone https://github.com/yourusername/dainik-navsandesh.git
```

---

## Navigate to Project Directory

```bash
cd dainik-navsandesh
```

---

## Install Dependencies

```bash
npm install
```

---

## Start Development Server

```bash
npm run dev
```

---

# Firebase Setup

Create:

```bash
src/lib/firebase.ts
```

Add Firebase configuration:

```ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
```

---

# Cloudinary Setup

Create an unsigned upload preset:

```bash
news_upload
```

Upload endpoint format:

```bash
https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload
```

---

# Deployment

The project is deployed on:

* [Vercel](https://vercel.com/?utm_source=chatgpt.com)

Live website:

* [Dainik Navsandesh](https://dainik-navsandesh.vercel.app/?utm_source=chatgpt.com)

---

# Current Features Completed

* Admin authentication
* Protected routes
* Dynamic news publishing
* Firestore database integration
* Cloudinary image upload
* Dynamic homepage rendering
* Full article pages
* Category grouping
* Article deletion
* Responsive layout

---

# Planned Future Enhancements

## Dynamic Breaking News Ticker

Fetch latest headlines directly from Firestore.

---

## Real-Time Updates

Use Firestore `onSnapshot()` for live article updates.

---

## Search Functionality

Search articles by:

* title
* category
* keywords

---

## Archive Filtering

Filter articles by:

* month
* year
* category

---

## Bookmark System

Allow readers to save articles.

---

## Rich Text Editor

Integrate:

* Quill
* TinyMCE
* Editor.js

for advanced journalist publishing.

---

## SEO Optimization

Implement:

* Dynamic meta tags
* OpenGraph tags
* Sitemap generation
* Structured schema markup

---

# Learning Outcomes

This project demonstrates:

* Full-stack web development
* CMS architecture design
* Firebase integration
* Cloud-based image handling
* Dynamic routing
* Firestore database management
* Type-safe React development
* Responsive frontend engineering

---

# Developer

Akhil Himnad

* Full Stack Developer
* AI and ML Enthusiast
* React and Firebase Developer

---

# License

This project is developed for educational and portfolio purposes.
