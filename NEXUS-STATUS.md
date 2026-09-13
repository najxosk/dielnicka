# Little Alchemist

## O projekte
Oficiálny názov hry je **Little Alchemist**. Cieľový názov GitHub repozitára je `Little-Alchemist`.

Little Alchemist je mobilná/desktopová vzdelávacia hra s tromi cestami a lokálnym progresom.

## Stav
Verzia **1.1 stabilizovaná**.

- 🧪 Chémia: 50 levelov
- 🌿 Pre život: 50 levelov
- 🔥 Majster alchýmie: 50 levelov
- spolu: 150 levelov
- SK + EN
- hviezdy, XP, postupné odomykanie
- denný streak podľa lokálneho dátumu
- denná odmena
- opravené načítanie staršieho/poškodeného progresu
- odstránené nekonečné XP farmenie opakovaním levelu
- validácia riešiteľnosti levelov
- responzívny vizuál a základná prístupnosť
- GitHub Actions kontroluje živý `app.js`

```nexus-state
{
  "name": "Little Alchemist",
  "description": "Little Alchemist — mobilna vzdelavacia alchymisticka hra. 150 levelov v troch cestach: Chemia, Pre zivot a Majster alchymie.",
  "status": "active",
  "progress": 100,
  "missing": ["Premenovat GitHub repository slug na Little-Alchemist a overit GitHub Pages URL"],
  "nextStep": "Premenovat repository slug v GitHub Settings a potom aktualizovat odkazy v Project Nexus.",
  "notes": "v1.1: 50+50+50 levelov, SK/EN, hviezdy, XP, local-time streak, denny bonus, robustny localStorage, BFS validacia levelov, responzivny vizual."
}
```
