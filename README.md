# ⚗️ Little Alchemist (pôvodne „Dielnička")

Malá hra v **jednom jedinom súbore** `index.html`. Beží v prehliadači na počítači aj na telefóne.
Nepotrebuje inštaláciu, nepotrebuje internet (okrem prvého stiahnutia), nepotrebuje nič kompilovať.

**Hrať hneď:** https://najxosk.github.io/dielnicka/

---

## Čo je v hre

Skladáš reálne veci z reálnych surovín podľa skutočnej fyziky a chémie:
vodík + kyslík = voda, sodík + chlór = kuchynská soľ, hlina + voda + slama vypálená = tehla,
piesok + potaš + vápenec vypálený = sklo, vápenec vypálený + voda + piesok = malta,
ruda s uhlím vytavená + cín = bronz, železo + uhlík = oceľ.

- **8 kôl:** Voda → Kuchynská soľ → Tehla → Betón → Sklo → Vápno a malta → Bronz → Oceľ
- **Dva jazyky:** slovenčina a angličtina (vyberieš na začiatku, dá sa prepnúť v Receptári)
- **Prvky** sú okrúhle dlaždice s chemickou značkou (H, O, Na, Cl, Ca), suroviny sú hranaté
- Zadanie povie len **čo vyrobiť**, postup si musíš nájsť sám; 💡 nápoveda stojí body
- Keď sa pomýliš, **↶ vráti posledný ťah** (−60 bodov, 2× za kolo)
- Receptár 📖 si pamätá, čo si už objavil; skóre sa dá zdieľať
- Stôl je **každý deň iný a pre všetkých rovnaký** (počíta sa z dátumu)

**Dôležité pravidlo:** o tom, či sa kolo podarí, rozhoduje **recept**, nie fyzikálna animácia.
Animácia na konci je len efekt pre oko. Nikdy nie je náhoda, či sa vec podarí.

---

## Ako si to stiahnuť a mať u seba

**Najjednoduchšie — celý projekt ako ZIP:**
1. Otvor https://github.com/najxosk/dielnicka
2. Zelené tlačidlo **Code** → **Download ZIP**
3. Rozbaľ ZIP a otvor `index.html` dvojklikom. Hotovo, hra beží.

**Len samotný súbor hry (bez histórie):**
https://raw.githubusercontent.com/najxosk/dielnicka/main/index.html

**Kto používa git:**
```
git clone https://github.com/najxosk/dielnicka.git
```

**Stále rovnaká verzia na stiahnutie** (nemení sa, keď hru ďalej upravíš):
pozri Releases v repozitári.

---

## Ako upraviť hru (mapa súboru)

Všetko je v `index.html`. Hľadaj tieto časti (sú označené komentármi `/* ==== ... ==== */`):

| Časť | Čo obsahuje |
|------|-------------|
| `<style>` na začiatku | vzhľad — farby dlaždíc, rozloženie, tlačidlá |
| `ING` | všetky veci: emoji, názov, farba dlaždice, či má kvalitu |
| `RECIPES` | čo s čím spojiť → čo vznikne (napr. `"kyslik+vodik": "voda"`) |
| `FIRE` | čo sa dá vypáliť / vytaviť (napr. `cesto → tehla`) |
| `LEVELS` | jednotlivé kola: cieľ, čas, čo je na stole, nápovedy, vysvetlenie |
| `RECEPTAR` | texty do receptára — fyzika, prečo to tak je |
| `ZLE` | hlášky, keď dvojica k sebe nepatrí (napr. „hlína s pieskom bez vody sa rozsype") |
| `ING_EN`, `LEVELS_EN`, `RECEPTAR_EN`, `ZLE_EN`, `T` | to isté po anglicky + všetky nápisy rozhrania |
| `tap`, `combine`, `fire`, `undo`, `goal` | logika hry — ťuknutie, spájanie, pec, oprava, karta cieľa |

Kľúče v tabuľkách sú vždy **zoradené podľa abecedy** (`kyslik+vodik`, nie `vodik+kyslik`) —
o to sa stará funkcia `key()`, takže na poradí nezáleží. Tabuľky sa pri štarte prevádzajú cez
`normTable()`, aby to sedelo.

### Ako pridať nové kolo

1. **`ING`** — pridaj nové veci (suroviny, medzikroky, hotový výrobok). Každá potrebuje
   `emoji`, `label` a `cls` (CSS trieda farby; novú farbu pridaj do `<style>`).
2. **`ING_EN`** — tie isté kľúče po anglicky.
3. **`RECIPES`** — nové dvojice (`"a+b": "výsledok"`).
4. **`FIRE`** — čo sa dá vypáliť / vytaviť (`typ: "čo_z_toho_vznikne"`).
5. **`RECEPTAR`** + **`RECEPTAR_EN`** — text „prečo to tak v skutočnosti je".
6. **`ZLE`** + **`ZLE_EN`** — hlášky pre dvojice, ktoré k sebe nepatria.
7. **`LEVELS`** + **`LEVELS_EN`** — pridať kolo na koniec, **v oboch poliach na rovnaké miesto**
   (poradie v `LEVELS_EN` musí sedieť s `LEVELS`). Vzor:

```js
{
  cislo:9, nazov:"Mydlo",
  ciel:"mydlo", cielEmoji:"🫧", cas:130, hotovo:"Mydlo je hotové",
  kroky:["Popol + voda = lúh","Lúh + tuk = mydlo"],      // nápovedy (postupne sa odhaľujú)
  poradie:["luh","mydlo"],                                // pre „Zatiaľ máš: ..."
  stol:[["popol",90],["voda"],["tuk",85],["hlina",60]],   // kvalita je dobré mať na viacerých kusoch
  popis:"Krátka veta, čo je na tom zaujímavé.",
  fakt:"Fyzika/chémia na konci kola."
}
```

Počet kôl v menu sa počíta z `LEVELS`, takže sa doplní samo.

---

## Ako sa hra dostane na internet

Repozitár `main` je napojený na **GitHub Pages**. Po každom pushi na `main` sa stránka
sama aktualizuje za 1–3 minúty. Repozitár je **verejný** — ktokoľvek s odkazom si hru zahrá.
Nič sa nikam neinštaluje a nič nebeží na pozadí.

---

## Stav

**Hotové:** 8 kôl podľa skutočnej chémie, slovenčina + angličtina, prvky ako okrúhle dlaždice,
nápoveda za body, oprava omylu (↶), výber kola z menu, receptár, zdieľanie skóre,
denný stôl pre všetkých rovnaký, funguje na telefóne aj na počítači.

**Zvažované ďalej:** 🫧 mydlo (popol → lúh → mydlo), 🏺 porcelán (hlina + živec + kremeň, 1400 °C),
🪙 mosadz (meď + zinok), a kola skladané z hotových zlúčenín (cement = vápenec + hlina vypáliť).

---

## Použitie

Hra je tvoj projekt — používaj ju, upravuj a šír ako chceš.
