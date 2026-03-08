

## GitHub Connection & Google Sign-In on GitHub Deployments

### 1. Connecting to GitHub

No code changes needed — this is done through the Lovable interface:

1. Click on the **project name** (top-left corner)
2. Go to **Settings → GitHub**
3. Click **Connect project**
4. Authorize the Lovable GitHub App
5. Select your GitHub account/organization
6. Click **Create Repository**

Once connected, changes sync both ways automatically — edits in Lovable push to GitHub, and pushes to GitHub sync to Lovable.

### 2. Google Sign-In on GitHub-deployed sites

Your code already handles this. The `AuthContext.tsx` has the `isLovableDomain()` check that falls back to `supabase.auth.signInWithOAuth` for non-Lovable domains (like GitHub Pages or custom domains).

**However**, you need to configure your deployment domain as an allowed redirect URL:

1. Open your backend settings (Cloud Dashboard → Authentication Settings)
2. Under **Redirect URLs**, add your GitHub Pages or custom domain URL (e.g., `https://yourusername.github.io/your-repo`)
3. Also add it under **Site URL** if it's your primary domain

Without adding the redirect URL, Google sign-in will fail on the deployed site because the OAuth callback won't be authorized.

### Summary
- GitHub connection: Use Settings → GitHub in Lovable (no code changes)
- Google sign-in: Already coded for external domains; just add your deployed URL to the allowed redirect URLs in the backend auth settings

