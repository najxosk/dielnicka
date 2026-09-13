# AI-BRIEFING — Little Alchemist

## Projekt
Oficiálny názov: **Little Alchemist**

Aktívna verzia: **1.1**

## Aktuálny stav
- 150 levelov: 50 Chémia + 50 Pre život + 50 Majster alchýmie
- SK + EN
- progres, hviezdy, XP, denný streak a denná odmena
- progres je v `localStorage`
- hlavná logika je v `app.js`
- UI je v `index.html`
- štýly sú v `little-alchemist-v1.css`
- CI je v `.github/workflows/little-alchemist-check.yml`

## Dôležité pravidlá
- nerozbíjať 50/50/50 levelov
- každý chemický a náročný level musí zostať riešiteľný
- zachovať SK aj EN
- zachovať mobilné ovládanie dotykom
- žiadny účet ani platený backend
- pri zmene progresu zachovať kompatibilitu so starším `localStorage`
- názov hry je iba **Little Alchemist**; nepoužívať starý pracovný názov ako branding

## Najbližšia administratívna úloha
Premenovať GitHub repository slug z pôvodného názvu na **`Little-Alchemist`**, potom overiť GitHub Pages URL a aktualizovať odkazy v Project Nexus.

## Test pred každým merge
1. `node --check app.js`
2. overiť 50 + 50 + 50 levelov
3. overiť prvý, stredný a posledný level každej cesty
4. overiť prepnutie SK/EN
5. overiť návrat po reloadnutí stránky
6. overiť mobilnú šírku približne 390 px
