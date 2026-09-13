# Little Alchemist v1.2 — overenie

Dátum: 2026-09-13. Lokálne prostredie: Windows, Node.js, Playwright 1.62.1, nainštalovaný Chrome, emulácia dotykového mobilu. Testy používajú skutočné tlačidlá hry a statický HTTP server; produkčný kód nemá testovacie vstupy ani obchádzanie odomykania. Na otvorenie vyšších levelov test nahrá starší kompatibilný progres.

| Kontrola | Výsledok |
| --- | --- |
| Syntax `app.js` | Prešla |
| Počty levelov | 50 + 50 + 50 |
| Nezávislá kontrola riešiteľnosti | Všetkých 50 chemických a 50 majstrovských levelov |
| Rozmanitosť Chémie | 33 úvodných receptov; prvých 25 bez opakovania receptu; žiadne susedné rovnaké rodiny ani ciele v celých 50 |
| Pre život | 30 kategórií, päť členov na kategóriu, 50 jedinečných štvoríc; presne jeden kurátorom zvolený outsider |
| SK/EN a vizuály | Všetky položky majú oba názvy a ikonu; univerzálny otáznik odstránený |
| Gameplay 1/5/10/20/30/40/50 | Všetky tri režimy, oba jazyky: 42 úspešných scenárov |
| Progres | Skutočné odomknutie levelu 2, reload, kompatibilita starého uloženia a ignorovanie neplatných záznamov |
| XP | Rovnaký výsledok pri opakovaní levelu nepridáva XP |
| Efekty | Všetkých šesť úspešných aj štyri chybové typy overené cez hranie |
| Časovače | Odchod počas úspechu nevráti hráča na výsledok; reštart zruší čakajúce dokončenie; častice sa odstránia |
| Slepá kombinácia | Zobrazí odporúčanie reštartu; po reštarte je level opäť riešiteľný |
| Obmedzený pohyb | Bez častíc; dokončenie funguje |
| Šírky | 320, 390, 768, 1280 px; bez horizontálneho pretekania, všetky tri režimy a domovská obrazovka |
| Chyby prehliadača | Žiadne nezachytené chyby počas testov |

Vizuálne prezreté screenshoty mobilného domova, Pre život, Majstra a bublinového efektu. Nájdené chýbajúce znaky novších emoji boli nahradené vstavanými SVG; následná kontrola potvrdila zobrazenie rudy a bublín. Doplnili sa menšie rozostupy hornej lišty pri 320 px, zalamovanie dlhej položky, viditeľný fokus a minimálna veľkosť navigačných tlačidiel.

## Automatizácia a hranice

`npm test` a `npm run test:browser` prešli lokálne. GitHub Actions spúšťa obe sady na Linuxe s Chromium a ukladá screenshoty. Stav konkrétneho behu na odoslanom commite je v kontrolách PR.

Neuskutočnené: manuálne prejdenie všetkých 150 levelov na fyzickom telefóne, Safari/iOS a kontrola publikovaného v1.2 po merge. Mobilná emulácia nepreukazuje výkon každého staršieho zariadenia. Existujúca majstrovská cesta naďalej používa desať viackrokových vzorov s obmenami rušivých surovín; nová obsahová diverzita tejto verzie je sústredená na Chémiu a Pre život.
