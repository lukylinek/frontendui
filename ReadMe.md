## 📓 Deník vývoje

### 31.03 – Inicializace a seznámení s projektem
- projekt založen na připraveném template od vyučujícího
- analýza struktury (`Pages`, `Components`, `Queries`)
- pochopení fungování GraphQL napojení

---

### 02.04.2026 – Napojení vlastní entity
- vytvoření `ProjectGQLModelRouterSegments`
- úprava routingu pro vlastní entitu
- definice základních URI (`uris.js`)

---

### 11.04.2026 – Implementace list stránky
- využití `PageVector`
- napojení na `ReadPageAsyncAction`
- zobrazení dat v tabulce
- ověření komunikace s backendem

---

### 11.04.2026 – Řešení problémů s routingem
- chyba: nefunkční přechod na detail (404)
- příčina: nesoulad URI (`template` vs `project`)
- řešení: sjednocení cest v `uris.js`

---

### 12.04.2026 – Debugging exportů
- chyby:
  - `CreateURI not exported`
  - `ListURI not exported`
- řešení: explicitní export konstant v `Components/index.js`

---

### 12.04.2026 – Oprava linkování
- problém: kliknutí na entitu vedlo na špatnou URL
- úprava `Link.jsx`
- zajištění správného přesměrování na detail

---

### 12.04.2026 – Řešení React chyby
- chyba:
  Objects are not valid as a React child
- příčina: GraphQL vracel objekty `{ content: ... }`
- řešení: implementace `safeValue()` funkce

---

### 13.04.2026 – Řešení načítání detailu
- pokus o vlastní načítání pomocí `dispatch(ReadAsyncAction)`
- problém: chybějící GraphQL client
- návrat k template řešení (`PageItemBase`)

---

### 13.04.2026 – Finalizace detail stránky
- vytvoření `ProjectReadContent`
- bezpečné renderování dat
- integrace s template komponentou `LargeCard`

---

### 13.04.2026 – Finální stav
- funkční list projektů
- funkční detail projektu
- správně nastavený routing
- odstraněny runtime chyby
