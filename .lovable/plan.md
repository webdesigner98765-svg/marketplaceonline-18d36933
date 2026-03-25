
Qëllimi: ta bëjmë Google login të funksionojë edhe kur projekti merret nga GitHub dhe hapet jashtë Lovable.

1. Shkaku kryesor që shoh në kod
- Te `src/contexts/AuthContext.tsx` ka 2 rrugë të ndryshme:
  - në `lovable.app` / `localhost` përdoret `lovable.auth.signInWithOAuth("google")`
  - në hoste të tjera përdoret `supabase.auth.signInWithOAuth(...)`
- Për projektet me Lovable Cloud, Google OAuth duhet të kalojë me `lovable.auth.signInWithOAuth(...)`, jo me fallback-un direkt.
- Gabimi `accounts.google.com refused to connect / ERR_BLOCKED_BY_RESPONSE` përputhet me një flow OAuth të nisur në mënyrën e gabuar / të bllokuar jashtë konfigurimit të menaxhuar.

2. Çfarë do të ndryshoj
- Heq `isLovableDomain()` dhe të gjithë branch-in me `supabase.auth.signInWithOAuth`.
- Standardizoj `signInWithGoogle()` që të përdorë vetëm:
  - `lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin })`
- Opsionalisht shtoj `extraParams: { prompt: "select_account" }` që zgjedhja e llogarisë të jetë më e qëndrueshme.
- Përmirësoj mesazhin e gabimit te `AuthPromptModal` që të tregojë kur problemi është konfigurimi i redirect URL-ve, jo vetëm “Something went wrong”.

3. Çfarë është tashmë në rregull
- `vite.config.ts` tashmë ka `/~oauth` te `navigateFallbackDenylist`, kështu që PWA nuk duhet ta kapë callback-un e auth-it.
- Nuk shoh nevojë për ndryshim në databazë apo migration; problemi është në flow-in e hyrjes dhe konfigurimin e deploy-it.

4. Çfarë duhet verifikuar jashtë kodit
- Google sign-in duhet të jetë aktiv në backend.
- Te redirect URLs duhet të jetë i shtuar çdo host ku po e teston:
  - `http://localhost:8080` (ose porti yt)
  - domeni/deploy jashtë Lovable
- Nëse po përdor Client ID/Secret tëndin, në Google Cloud duhet të jenë shtuar:
  - callback URL që jep backend-i
  - origin i faqes tënde
- Nëse hostohet si SPA jashtë Lovable (Vercel/Netlify/GitHub Pages etj.), duhet fallback te `index.html`; përndryshe rikthimi pas login mund të prishet.

5. Si do ta verifikoj pas implementimit
- Test në lokal
- Test në deploy jashtë Lovable
- Kontroll që “Continue with Google” hap flow normal dhe kthen përdoruesin me session aktive
- Kontroll që nuk shfaqet më `ERR_BLOCKED_BY_RESPONSE`

Detaje teknike
- File kryesor për ndryshim: `src/contexts/AuthContext.tsx`
- File dytësor për UX të gabimit: `src/components/AuthPromptModal.tsx`
- Nuk do prek `src/integrations/lovable/index.ts` dhe `src/integrations/supabase/client.ts`
