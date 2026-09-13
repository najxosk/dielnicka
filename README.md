# ⚗️ Little Alchemist

**Little Alchemist** je oficiálny názov hry.

Mobilná aj desktopová webová hra bez účtu. Progres sa ukladá lokálne v prehliadači a hra nepotrebuje backend.

## Verzia 1.1

- **150 levelov celkom**
  - 🧪 Chémia — 50 levelov
  - 🌿 Pre život — 50 levelov
  - 🔥 Majster alchýmie — 50 levelov
- postupné odomykanie levelov
- 1–3 hviezdy podľa chýb
- XP bez nekonečného farmenia opakovaním rovnakého výsledku
- denná návratová odmena a streak podľa miestneho dátumu hráča
- robustnejšie obnovenie poškodeného alebo staršieho `localStorage`
- slovenské aj anglické rozhranie a obsah
- responzívny vizuál pre telefón aj desktop
- automatická kontrola JavaScript syntaxe a základnej štruktúry
- validácia, že všetkých 50 chemických a 50 náročných levelov je riešiteľných

## Herné cesty

### 🧪 Chémia
Hráč spája dve látky alebo materiály a vyrába cieľ. Obtiažnosť rastie pridávaním rušivých možností a širšou paletou receptov.

### 🌿 Pre život
Logická hra „čo nepatrí“. Každý level obsahuje tri položky z jednej kategórie a jednu odlišnú. Obsah je v slovenčine aj angličtine.

### 🔥 Majster alchýmie
Viackrokové recepty. Hráč musí najprv vyrobiť medziprodukt a až potom cieľ, napr. ruda → kov → zliatina alebo vápnik → vápno → hasené vápno → malta.

## Progres

Hra používa iba `localStorage`. Ukladá dokončené levely, najlepšie hviezdy, XP, jazyk, streak a dennú odmenu.

## Súbory

- `index.html` — hlavné UI
- `little-alchemist-v1.css` — vizuál a responzívne rozloženie
- `app.js` — herná logika, recepty, 150 levelov, progres a validácia
- `.github/workflows/little-alchemist-check.yml` — automatické kontroly

## Repozitár

Cieľový názov repozitára je **`Little-Alchemist`**. GitHub URL nepoužíva medzery, preto je spojovník správny tvar. Po premenovaní treba overiť nový GitHub Pages projektový odkaz a aktualizovať odkazy v Project Nexus.

Pri chemických a výrobných receptoch ide o zjednodušený vzdelávací model vhodný pre hru; nejde o laboratórny postup ani bezpečnostný návod.
