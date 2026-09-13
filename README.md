# ⚗️ Little Alchemist

**Little Alchemist** je oficiálny názov projektu (pôvodný pracovný názov repozitára `dielnicka` zostáva kvôli stabilnému GitHub Pages odkazu).

Hra je mobilná aj desktopová webová hra bez účtu. Progres sa ukladá lokálne v prehliadači.

## Verzia 1.0

- **150 levelov celkom**
  - 🧪 Chémia — 50 levelov
  - 🌿 Pre život — 50 levelov
  - 🔥 Majster alchýmie — 50 levelov
- postupné odomykanie levelov
- 1–3 hviezdy podľa chýb
- XP a denná návratová odmena
- streak za pravidelné návraty
- slovenské aj anglické rozhranie a obsah
- nový vizuál navrhnutý primárne pre telefón
- fungovanie bez účtu a bez backendu

**Hrať:** https://najxosk.github.io/dielnicka/

## Herné cesty

### 🧪 Chémia
Hráč spája dve látky alebo materiály a vyrába cieľ. Obtiažnosť rastie pridávaním rušivých možností a širšou paletou receptov.

### 🌿 Pre život
Logická hra „čo nepatrí“. Každý level obsahuje tri položky z jednej kategórie a jednu odlišnú. Obsah sa skladá deterministicky z viacerých kategórií v slovenčine aj angličtine.

### 🔥 Majster alchýmie
Viackrokové recepty. Hráč musí najprv vyrobiť medziprodukt a až potom cieľ, napr. ruda → kov → zliatina alebo vápnik → vápno → hasené vápno → malta.

## Progres a návrat hráča

Hra používa iba `localStorage`. Ukladá:
- dokončené levely,
- najlepšie hviezdy,
- XP,
- jazyk,
- denný streak a dennú odmenu.

Nie je potrebný účet, analytika ani platená služba.

## Súbory

- `index.html` — hlavná obrazovka a herné UI
- `little-alchemist-v1.css` — vizuál a responzívne rozloženie
- `little-alchemist-v1.js` — herná logika, recepty a generovanie 150 levelov
- `.github/workflows/little-alchemist-check.yml` — automatická kontrola JavaScript syntaxe a základných súborov

## Vývoj

Aktívna verzia 1.0 vznikla z pôvodného prototypu Dielnička/Skúšobňa. Starý názov `dielnicka` sa už nepoužíva ako názov hry; ostáva iba v URL repozitára, aby sa nerozbili existujúce odkazy.

Pri chemických a výrobných receptoch ide o zjednodušený vzdelávací model vhodný pre hru; nejde o laboratórny postup ani bezpečnostný návod.
