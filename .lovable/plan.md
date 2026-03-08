

## Plani: Shfaq numrin e kontaktit vetëm brenda bisedës

Numri i telefonit/emaili i shitësit do të shfaqet vetëm brenda thread-it të chat-it, pasi blerësi ka nisur një bisedë. Kjo siguron që kontakti nuk ekspozohet publikisht por është i disponueshëm për pjesëmarrësit e bisedës.

### Ndryshimet teknike

**1. Databaza — Krijo funksion të ri `get_product_contact`**
- Funksion `SECURITY DEFINER` që kthen kontaktin e produktit vetëm nëse thirrësi është pjesëmarrës i një bisede për atë produkt
- Kjo anashkalon RLS në mënyrë të sigurt pa ekspozuar kontaktin publikisht

```sql
CREATE FUNCTION public.get_product_contact(p_product_id uuid)
RETURNS text
SECURITY DEFINER
-- Kthen kontaktin VETËM nëse thirrësi është buyer ose seller në një bisedë për këtë produkt
```

**2. Frontend — Shfaq kontaktin në `MessageThread`**
- Kur hapet një bisedë, thirr `get_product_contact` me product_id nga biseda
- Shfaq numrin/emailin si një banner informativ në krye të thread-it (p.sh. "📞 Kontakti i shitësit: +355 69...")
- Vetëm pjesëmarrësit e bisedës e shohin

**3. Marrja e product_id nga biseda**
- `MessageThread` tashmë merr `conversationId` — do të bëjë një query për të marrë `product_id` nga tabela `conversations`, pastaj thirr funksionin

### Rrjedha e përdoruesit
1. Blerësi sheh produktin → nuk sheh numrin
2. Blerësi klikon "Chat" → nis bisedën
3. Brenda bisedës shfaqet kontakti i shitësit si banner

