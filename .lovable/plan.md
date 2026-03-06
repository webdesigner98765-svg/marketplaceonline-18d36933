

# Google Login + Database Setup for Marketplace

## Overview
Set up Google authentication so users must sign in with their Google account before posting products. Products will be saved to a real database. Browsing products remains open to everyone -- only posting requires login.

## What will change

### 1. Google Authentication
- Add a "Sign in with Google" button in the header
- When a user clicks "Post Product" without being logged in, they will be prompted to sign in first
- Once signed in, the user's name/avatar from Google will appear in the header
- A sign-out option will be available

### 2. Database Tables
Create the following tables to store data:

- **profiles** -- stores user info (name, avatar, email) linked to their Google account
- **products** -- stores all posted products (title, price, description, category, country, image URL, linked to the user who posted it)

### 3. Updated App Flow
- Everyone can browse and search products without logging in
- Clicking "Post Product" or "Start Selling" checks if the user is logged in
  - If not logged in: shows a sign-in prompt with Google button
  - If logged in: opens the product form as usual
- Products are saved to the database and displayed in real-time
- Each product shows who posted it

---

## Technical Details

### Step 1: Configure Google OAuth
- Use the Lovable Cloud managed Google OAuth (no API keys needed)
- Configure social auth provider via the platform tool
- This generates the `src/integrations/lovable/` module automatically

### Step 2: Database Migration
Create tables with proper security:

```text
profiles table:
  - id (uuid, references auth.users)
  - full_name (text)
  - avatar_url (text)
  - email (text)
  - created_at (timestamp)

products table:
  - id (uuid, primary key)
  - user_id (uuid, references profiles)
  - title (text)
  - price (numeric)
  - description (text)
  - category (text)
  - country (text)
  - image_url (text, nullable)
  - created_at (timestamp)
```

Security policies:
- **products**: Anyone can read (public marketplace), only authenticated users can insert their own products, only the owner can update/delete
- **profiles**: Anyone can read, users can only update their own profile
- Auto-create profile on Google sign-up via database trigger

### Step 3: Auth Context Provider
- Create `src/contexts/AuthContext.tsx` to manage authentication state globally
- Provides current user, sign-in, sign-out functions
- Listens to auth state changes

### Step 4: Update Components

**Header (`src/components/Header.tsx`)**:
- Add user avatar + name when logged in
- Add sign-in / sign-out button
- Show Google sign-in option

**Index page (`src/pages/Index.tsx`)**:
- Fetch products from database instead of empty array
- Pass auth state to control "Post Product" behavior
- When clicking post buttons, check login status first

**AddProductModal (`src/components/AddProductModal.tsx`)**:
- Save product to database on submit
- Attach logged-in user's ID and selected country
- Show success/error feedback

**New: AuthPromptModal**:
- A modal that appears when unauthenticated users try to post
- Shows "Sign in with Google" button
- Clean design matching the app's style

### Step 5: App Router Update
- Wrap app with AuthContext provider
- Add auth callback handling for Google redirect

