# GREEN DAWN v0.15 — Norway and Dunkirk (12 Playable Missions)

An **original** 16-bit-inspired offline squad tactics game for Android. The planned 100-mission WWII route now has **12 playable missions**, divided into two full six-mission chapters based on the British Army's historical campaign settings. Missions 013–100 remain planned and locked.

**[Download Android v0.15 APK](https://github.com/MaviUK/Green-Dawn/releases/download/v0.15.0/GreenDawn-Campaign-v0.15-debug.apk)**

## Norway 1940 — Missions 001–006 (unchanged and playable)

| # | Mission | Objective |
|---|---|---|
| 001 | Cold Landing | Silence the fjord gun and secure the landing area |
| 002 | Mountain Patrol | Clear three fortified ridge positions |
| 003 | The Supply Route | Protect a moving ammunition convoy through ambushes |
| 004 | Guns Above the Fjord | Destroy two coastal batteries and escape |
| 005 | Narvik Harbour | Disable communications, rescue sailors and evacuate |
| 006 | Last Ships from Norway | Destroy three fortifications, defend the evacuation pier and board ship |

All pre-existing Norway progress remains in **green-dawn-ww2-campaign-v1**, including cleared battles, living recruits, promotions, permanently fallen soldiers and historical memorial records. Finishing Norway automatically unlocks Mission 007. Norway operations never become replayable.

## France 1940 — Dunkirk Campaign — NEW Missions 007–012

| # | Mission | Actual gameplay |
|---|---|---|
| **007** | **Road to Dunkirk** | Find two isolated British sections, clear nearby German guards, rally both units, and escort them toward evacuation. |
| **008** | **Holding the Line** | Defend a roadblock for **30 seconds**, keep the barricade intact through attacking waves, then withdraw. |
| **009** | **The Canal Bridge** | Protect a canal bridge for **32 seconds** while three separate withdrawing columns cross. Stop enemies damaging the bridge and reach the exit. |
| **010** | **Abandoned Armour** | Demolish three enemy-bound abandoned armoured vehicles in a French village, then extract. Mission 009 grants bonus explosives. |
| **011** | **The Last Road** | Protect a **moving wounded-transport truck** across the countryside. Stay close, defeat ambushes and deliver the wounded safely; losing the truck fails the operation. |
| **012** | **Operation Dynamo** | A longer multi-stage evacuation: destroy three pillboxes, organise two retreating columns, hold the beach for **47 seconds** against reinforcements and board the final vessel. Completing Mission 011 grants bonus grenades. A casualty-free Mission 010 reduces enemy waves in the finale. |

The French chapter is visually distinct from Norway: pixel-art farms, hedgerows, villages, tanks, roadblocks, canals with a stone bridge, damaged roads, shoreline obstacles, sandy beach and an original evacuation ship.

**Controls:** Tap to move, hold and drag to shoot/aim, tap FRAG to throw, split or join Alpha/Bravo squads. Soldiers follow their leader across the actual route; no mission select/replay shortcuts.

**Campaign philosophy:** Five preparatory operations lead to a much longer sixth battle. The real Battle of Dunkirk / Operation Dynamo, 26 May–4 June 1940, was an Allied evacuation under German attack. The named player's small-unit assignments are fictional; the historical result is an Allied withdrawal, not conquest.

## Progression after Mission 012

The war map advances to **Mission 013 — Desert Recon**, the first of six planned Operation Compass missions. It is still locked until implemented. The full plan comprises 16 historically inspired six-mission chapters, then four **explicitly fictional alternate-history** missions ending in Berlin.

**Permanent career, separate campaigns:** The original three jungle operations are still playable under green-dawn-campaign-v1 and are unaffected by this WW2 extension. The WWII campaign continues on green-dawn-ww2-campaign-v1 with its own memorial and JSON export/import under SAVE DATA. Both formats are independently validated.

## Important Android installation / backup warning

Android upgrades require the APKs to share the same signing certificate. This experimental GitHub Actions APK may use a **temporary debug key** if persistent keystore secrets have not been configured.

**If Android cannot install v0.15 on top of the existing game, do not uninstall the old version if you want to keep your progress.** Uninstalling clears that version's saved soldiers and memorials. Export your save with **SAVE DATA → EXPORT SAVE FILE** before changing installations. The JSON file stays with you, not on a server.

## Developer notes

- Game engine: index.html (identical local Android WebView asset).
- WWII historical map: ww2-campaign.html + ww2-campaign-data.js.
- Norway scenarios: norway-missions.js.
- **New Dunkirk scenario definitions: dunkirk-missions.js**, plus regional engine phases, original terrain sprites, two destructible defence conditions, medevac, armoured demolition, and beach evacuation in the offline engine.
- Offline asset copies are bundled under android/app/src/main/assets.
- 34+ automated gameplay, save, failure/retry, route, campaign map and memorial regression tests execute before GitHub Actions compiles and verifies the APK signature.
- Android package: uk.co.greendawn.jungle; version 0.15.0; min Android 8.0; no network permission, ads or analytics.
