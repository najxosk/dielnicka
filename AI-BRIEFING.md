# AI-BRIEFING — Little Alchemist

Verzia **1.2**, pripravená na merge po kontrole PR a CI. Repo: najxosk/dielnicka.

## Obsah a kompatibilita

- 150 levelov: 50 Chémia + 50 Pre život + 50 Majster alchýmie.
- RECIPES + CHEM_ORDER: 33 rôznych úvodných receptov, potom rozostúpené návraty. Žiadne susedné rovnaké rodiny úloh ani ciele.
- CATS: 30 kategórií, SK/EN názov skupiny, päť členov, jeden jednoznačný outsider; položky [sk,en,icon]. LIFE má 50 odlišných štvoríc.
- ART poskytuje SVG pre nové emoji nepodporované staršími fontmi.
- SCENES a setupScene vykresľujú laboratórium, drevenú dielničku a stredovekú dielňu s majstrom. specimen/vesselFor priraďujú surovinám misku, skúmavku, tanier alebo voľné miesto na stole. Po reakcii sa nádoba prispôsobí produktu.
- Zachovať SK/EN a kompatibilitu kľúča little_alchemist_v1. Číslovanie a odomykanie sa zachovávajú aj pri novom obsahu.
- clearFeedback, settling, completed chránia navigáciu a jednorazové dokončenie. Reštart ruší čakajúci úspech.
- Stredové reakčné efekty boli na výslovnú žiadosť hráča odstránené; nevracať ich. Odozva je v produkte a textovej správe.
- JOURNEY/map vykresľujú tmavú cestu v piatich etapách po desať levelov, tituly podľa súvislého progresu a Pokračovať. data-view="map" zaručuje tmavú mapu vo všetkých režimoch; data-scene zachováva prostredie samotného hrania.

## Overenie pred merge

1. npm ci, npm test — syntax, nezávislý solver 100 alchymistických levelov, rozmanitosť, SK/EN, ikony a staré/poškodené uloženie.
2. npx playwright install chromium, npm run test:browser — 42 herných scenárov, progres, XP, mapu, neprítomnosť overlayov, reštart, navigácia, reduced motion a šírky 320/390/768/1280 px.
3. Vizuálne prezrieť screenshoty z test-results/ alebo CI artefaktu.
4. Aktualizovať QA-v1.2.md, README a NEXUS podľa vykonaných kontrol.

Výsledky sú v QA-v1.2.md. Fyzický telefón a Safari/iOS neboli lokálne otestované. Nesplývať pripravenosť na merge s nasadením. Repozitár nepremenovávať bez samostatného zadania.
