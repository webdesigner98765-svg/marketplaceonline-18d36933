

## Plani: Shto CAPTCHA për mbrojtje nga spam

CAPTCHA duhet vendosur në pikat ku bots mund të abuzojnë sistemin:

1. **Postimi i produkteve** (`AddProductModal`) — pika më kritike, bots mund të mbushin platformën me spam
2. **Nisja e bisedës së re** (`NewChatSearch`) — parandalon spam mesazhesh masive

### Qasja teknike

Do të përdorim **Cloudflare Turnstile** (falas, pa fërkime, alternativë moderne e reCAPTCHA):

**1. Krijo komponent `TurnstileCaptcha`**
- Ngarkon Turnstile widget-in
- Kthen token-in e verifikimit kur përdoruesi kalon CAPTCHA
- Widget invisible/managed — nuk shqetëson përdoruesin

**2. Përditëso `AddProductModal`**
- Shto CAPTCHA widget para butonit "Publish"
- Ndalon submit derisa CAPTCHA kaloj
- Dërgo token-in për verifikim server-side

**3. Përditëso `NewChatSearch`**
- Shto CAPTCHA kur blerësi krijon bisedë të re (jo kur hap ekzistues)

**4. Edge Function `verify-captcha`**
- Verifikon Turnstile token-in me Cloudflare API
- Thirret para insertit të produktit ose bisedës

**5. Secret i nevojshëm**
- `TURNSTILE_SECRET_KEY` — merret nga Cloudflare dashboard (falas)
- Site key vendoset si VITE_ variabël në kod (publike, ok)

### Alternativë pa third-party
Nëse nuk dëshiron Cloudflare, mund të përdorim një honeypot + rate limiting të thjeshtë (më pak efektiv por zero setup).

