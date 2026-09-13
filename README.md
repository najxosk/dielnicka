# ⚗️ Little Alchemist

Vzdelávacia hra pre mobil aj desktop: **150 levelov**, SK/EN, bez účtu a backendu.

## v1.2 — pestrejšie objavovanie

- **Chémia (50 levelov):** 33 rôznych úvodných receptov, potom rozostúpené návraty s väčším výberom surovín. Prvých 25 levelov neopakuje recept. Všetkých 50 strieda rodiny úloh: roztoky, kovy, farby, reakcie, materiály, teplo, plyn, pena a recyklácia. Obtiažnosť rastie od dvoch po šesť dlaždíc.
- **Pre život (50 levelov):** 30 pomenovaných kategórií, každá s piatimi členmi a ručne zvolenou odlišnou položkou. 50 jedinečných štvoríc; prvých 30 levelov predstaví všetky kategórie. Témy zahŕňajú more, stanovanie, záchranárstvo, umenie, čas, záhradu či vesmír. Každá položka má emoji alebo vstavanú vektorovú ikonu a text v SK/EN. Nápoveda pomenúva spoločnú skupinu, aby odpoveď nebola nejednoznačná.
- **Majster alchýmie (50 levelov):** zachované viackrokové recepty a odomykanie; nový reštart pomáha pri spotrebovaní potrebnej suroviny.
- **Krátke efekty:** iskry, kovový záblesk, bubliny, para, zliatie a žiara podľa produktu; rozliatie, dym, prasknutie a malý výbuch pri chybe. Maximálne 10 častíc, bez externých knižníc. Animuje sa iba transformácia a priehľadnosť; obmedzený pohyb ponechá statickú odozvu.
- Opravené opakované kliknutia počas úspechu a oneskorené dokončenie po odchode z levelu. Neplatné uložené záznamy levelov sa ignorujú.

## Spustenie a testy

Otvorte `index.html` alebo priečinok sprístupnite statickým serverom. Herná aplikácia nemá runtime závislosti. Testovacie nástroje sa nenačítavajú do hry.

```sh
npm ci
npm test
npx playwright install chromium
npm run test:browser
```

Obsahové testy overujú syntax, 50/50/50 levelov, riešiteľnosť všetkých 100 alchymistických levelov nezávislým solverom, rozmanitosť, SK/EN/ikonky a kompatibilitu progresu.

Prehliadačový test hrá levely **1/5/10/20/30/40/50 vo všetkých režimoch a oboch jazykoch** (42 scenárov). Overuje odomykanie, reload, XP, zrušenie čakajúceho dokončenia, reštart, úspešné aj chybové efekty a obmedzený pohyb. Kontroluje šírky **320, 390, 768 a 1280 px** a ukladá screenshoty do `test-results/`. GitHub Actions spúšťa obe sady a priloží screenshoty ako artefakt.

Lokálne overené na Windows v Chrome s emuláciou dotykového mobilu. Emulácia nenahrádza test na fyzickom telefóne ani Safari/iOS. Výsledky sú v [QA-v1.2.md](QA-v1.2.md).

## Progres a kompatibilita

Kľúč `localStorage` zostáva **little_alchemist_v1**. Dokončené levely, hviezdy, XP, jazyk, streak a denná odmena sa zachovávajú. Čísla levelov nemeníme; starší hráči môžu prehrať nový obsah už odomknutých levelov. Vyššie hviezdy odmenia len zlepšenie, rovnaký výsledok nepridá ďalšie XP.

## Súbory

- `app.js` — obsah, pravidlá, progres, vstavané ikony a efekty
- `index.html`, `little-alchemist-v1.css` — responzívne rozhranie
- `tests/content.cjs`, `tests/browser.cjs` — regresné testy
- `.github/workflows/little-alchemist-check.yml` — automatické kontroly
- `NEXUS-STATUS.md`, `AI-BRIEFING.md` — stav a pravidlá projektu

Repozitár zostáva **najxosk/dielnicka**, názov hry je **Little Alchemist**. [Publikovaná hra](https://najxosk.github.io/dielnicka/) zodpovedá nasadenej vetve main; v1.2 sa sprístupní po merge a nasadení. Premenovanie repozitára nie je súčasťou tejto verzie.

Recepty sú zjednodušené herné modely, nie laboratórne postupy. Emulzia predpokladá miešanie, hrdzavenie aj vlhkosť a výroba kovov/skla vhodné spracovanie a teplo.
