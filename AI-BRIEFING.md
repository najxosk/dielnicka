# AI-BRIEFING — Little Alchemist (dielnicka)

> Toto je zadanie pre AI. **Prečítaj celé, potom urob prvý nehotový krok.**
> Píšeme po slovensky, jednoducho a k veci.

- **Projekt:** Little Alchemist (dielnicka) · **Repo:** https://github.com/najxosk/dielnicka
- **Hrá sa tu:** https://najxosk.github.io/dielnicka/
- **Vypracoval (dispečer):** Hermes · **Dátum:** 13. 9. 2026
- **Rola:** zvládne to ktorákoľvek AI (je to jedna HTML hra, jeden súbor)

## Cieľ tejto dávky
**Rozšíriť hru „📚 Skúšobňa"** — pridať nové úlohy do všetkých troch častí, aby sa z nej dalo učiť dlhšie.

## Kroky (odškrtávaj!)
- [ ] 1. Otvor `index.html` a nájdi časť `SKT` (vzhľad dlaždíc), `SKRECIPES` (čo s čím spájať), `SKCHEM` (úlohy Chémie), `SKNAR` (Náročná), `SKZIVOT` (čo nepatrí).
- [ ] 2. Pridaj **5 nových úloh do `SKCHEM`** (Chémia). Pravidlo: každá musí byť **skutočná chémia** a každá nová kombinácia musí mať záznam v `SKT` aj v `SKRECIPES`. Príklady, ktoré už recepty majú: `zmes` = piesok + potaš, `sklovina` = zmes + vápenec, `blato` = hlina + voda.
- [ ] 3. Pridaj **3 nové úlohy do `SKNAR`** (Náročná) — musia byť **viackrokové** (najprv medziprodukt, potom z neho hotová vec).
- [ ] 4. Pridaj **4 nové úlohy do `SKZIVOT`** (Pre život) v tvare `{a:[štyri veci], z:3}` — tri patria k sebe, jedna nie.
- [ ] 5. Všetky nové úlohy **otestuj na telefónnej veľkosti 390×844** a over, že hra sa načíta a nič nespadne.
- [ ] 6. Doplň do `NEXUS-STATUS.md` nový počet úloh v Skúšobni.

## Podľa čoho sa pozná, že je hotovo
- Hra sa načíta (lokálne aj na https://najxosk.github.io/dielnicka/).
- V Skúšobni je **viac úloh** vo všetkých troch častiach a všetky sa dajú vyriešiť.
- Každá nová kombinácia je **skutočná chémia** a má záznam v `SKT` aj `SKRECIPES`.
- Testované na mobilnej veľkosti, nie len na počítači.

## Kde sú dôležité súbory
- `index.html` — celá hra (všetko v jednom súbore)
- `README.md` — ako hru upraviť a ako pridať úlohu
- `NEXUS-STATUS.md` — stav projektu (percentá, ďalší krok)

## Čo NEROBIŤ
- **Nemeň** existujúce úlohy ani hlavných 8 kôl hry — tie sú hotové a otestované.
- **Nepresúvaj** súbory (`index.html` musí ostať v koreni — je to hra na webe).
- **Nedávaj** do úloh nereálnu chémiu (napr. „voda + oheň = para" bez vysvetlenia nie je zlúčenina).
- **Neposielaj na GitHub** nič, čo nie je v krokoch.
- Kľúče v `SKT`, `SKRECIPES` a v úlohách musia byť **identické a bez diakritiky** (`med`, `cin`, `sol`), inak sa dlaždica nevykreslí.

## Keď dôjde limit (handoff)
Na koniec tohto súboru dopíš:
- **Hotové:** …
- **Skondilo sa pri:** …
- **Ďalší krok:** …
