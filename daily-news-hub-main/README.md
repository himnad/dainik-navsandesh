Daily News Hub
Project Overview

Daily News Hub is a modern news platform built for a startup team of journalists. It allows journalists to publish, manage, and delete news articles independently, while users can read, explore, and bookmark news content.

Features
Journalist Panel

Secure login (email and password)

Create news articles with text, images, and videos

Delete or manage published news

Categorize news (General, Science, Politics, Sports, Entertainment)

Audience Panel

Read latest news (auto-sorted: newest first)

Browse by categories

Bookmark news for later reading

Access archived news by date

Archive System

View past news organized by date

Easy navigation for older content

Technologies Used

Vite

React

TypeScript

Tailwind CSS

Firebase (Authentication, Firestore, Storage)

Project Setup (Local Development)
Prerequisites

Node.js installed

npm installed

Steps
# Step 1: Clone the repository
git clone <YOUR_GITHUB_REPO_URL>

# Step 2: Navigate to project folder
cd daily-news-hub

# Step 3: Install dependencies
npm install

# Step 4: Run development server
npm run dev

Open in browser:

http://localhost:8080
Project Structure
src/
 ├── components/
 ├── pages/
 │    ├── Index.tsx
 │    ├── AdminLogin.tsx
 │    ├── AdminDashboard.tsx
 │    ├── Archive.tsx
 │    └── NotFound.tsx
 ├── hooks/
 ├── lib/
 └── main.tsx