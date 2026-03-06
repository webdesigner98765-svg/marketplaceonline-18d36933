

## Plan: Translate App to English + Add Dark Mode Toggle in Settings

### 1. Translate all Albanian text to English

**Files to update:**

- **`src/config/subscriptions.ts`** — Plan names, intervals, descriptions, badges (e.g., "Mujor" → "Monthly", "muaj" → "month", "Më Popullar" → "Most Popular")
- **`src/pages/Index.tsx`** — Hero text, features, empty state, toast messages
- **`src/components/Header.tsx`** — "Posto Produkt", "Kërko produkte...", "Cilësimet", "Dil"
- **`src/components/AuthPromptModal.tsx`** — "Vazhdo me Google" and description text
- **`src/components/AddProductModal.tsx`** — All form labels, placeholders, button text
- **`src/components/ProductCard.tsx`** — Confirm dialog, toast messages, location "Shqipëri" → "Albania"
- **`src/pages/Settings.tsx`** — "Cilësimet", "Profili", "Dil nga llogaria"
- **`src/pages/Pricing.tsx`** — All pricing page text, feature list, buttons
- **`src/pages/Chat.tsx`** — "Mesazhet", "Identifikohu", "Zgjidh një bisedë", "Kthehu"
- **`src/components/chat/ConversationList.tsx`** — "Asnjë bisedë akoma", remove Albanian date locale
- **`src/components/chat/MessageThread.tsx`** — "Shkruaj mesazh...", "Kthehu"
- **`src/components/chat/NewChatSearch.tsx`** — "Kërko produkt ose shitës", "Asnjë produkt u gjet"

### 2. Add Dark Mode Toggle in Settings

- **`src/pages/Settings.tsx`** — Add an "Appearance" section with a dark/light mode toggle switch using `next-themes` (already installed). Import `useTheme` from `next-themes`, add a Switch component to toggle between "light" and "dark".
- **`src/App.tsx`** — Wrap the app with `<ThemeProvider attribute="class" defaultTheme="light">` from `next-themes`.

The dark theme CSS variables are already defined in `src/index.css` under `.dark` class, so `next-themes` with `attribute="class"` will work out of the box.

### Summary of changes
- ~13 files edited for translation (string replacements only)
- 2 files edited for dark mode (App.tsx wrapper + Settings.tsx toggle UI)

