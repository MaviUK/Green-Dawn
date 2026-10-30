# GREEN DAWN v0.14 — Norway 1940, All Six Missions

Green Dawn is an original 16-bit-inspired offline squad tactics game for Android, with permanent soldiers, promotions, casualties, and a remembrance ceremony after each mission.

**[Download Android v0.14 APK](https://github.com/MaviUK/Green-Dawn/releases/download/v0.14.0/GreenDawn-Campaign-v0.14-debug.apk)**

## NOW PLAYABLE: All Six Norway Missions

The WWII chapter is inspired by the British Army's real Norway campaign in spring 1940. Specific squad assignments are original fiction, and the historical campaign ended in an Allied withdrawal.

| # | Operation | How it plays |
|---|-----------|--------------|
| 001 | Cold Landing | Silence a coastal gun, then secure the landing point. Existing Level 001 stays compatible. |
| 002 | Mountain Patrol | Clear **three separate ridge checkpoints** in order. Stand at each marked position after neutralising nearby guards. |
| 003 | The Supply Route | Protect a **moving ammunition cart** across a snowy pass. Stay near it to keep it moving. Enemies can damage the cart; two ambushes arrive as it advances. |
| 004 | Guns Above the Fjord | Destroy **both** distinct gun positions, then reach the extraction area. Completing the supply mission gives you a bonus grenade. |
| 005 | Narvik Harbour | Destroy the radio hut, clear the guards, **rescue stranded sailors** at the marked rally, and evacuate at the harbour. |
| 006 | Last Ships from Norway | A **longer multi-stage battle**: destroy three defended positions, hold the evacuation pier for **35 seconds** while reinforcements counterattack, and board the ship. Extra grenades come from the harbour mission. Taking no casualties in Mission 004 reduces the number of enemy counterattack waves. |

The six maps reuse the proven tap-to-move / hold-to-fire controls but have distinct snowy mountain, blizzard, cliff, harbour and fortified-evacuation environments. Original pixel-art details include fir trees, icy bridges, wind-carved ridges, signal masts, supply cart, ship and dock.

**No level selection or replay.** Clearing Norway moves your career to **Mission 007 — Dunkirk**, which appears on the map but stays locked until built. The full Road to Berlin map contains **100 planned missions**, only the first six playable for now.

## Career and Existing Saves

- **Existing v0.13 Norway Level 001 saves carry forward automatically.** If you completed Cold Landing, the next operation is Mountain Patrol. Soldiers, ranks, casualties and the historic memorial remain intact in the same WWII save key: green-dawn-ww2-campaign-v1.
- The older **three jungle missions** remain playable in the separate jungle campaign. Its own save key is green-dawn-campaign-v1, so neither career interferes with the other.
- Soldiers are promoted only for successful operations, and dead soldiers never come back. New recruits join the reserve after each victory. A wipeout allows a retry of the current operation with the existing survivors or fresh emergency recruits.
- The mission-end memorial shows only the casualties of that mission; the camp memorial records all past dead.
- **Save Data** exports and restores versioned JSON through Android Files, with confirmation before replacing a save. WWII and jungle backup formats are distinct.

### Android APK signing warning

The GitHub Actions workflow still uses a temporary debug-signing certificate unless the owner configures permanent keystore secrets. Android may reject installing v0.14 on top of an older build if the certificate differs.

**If you have progress you want to keep, do NOT uninstall the previous app to install v0.14. Uninstalling permanently deletes local soldier careers and memorials.** Installing in place is safe if Android accepts it. The backup/export system in v0.13 works only while that installed game is accessible; use it to retain a separate copy before any reinstall.

## Campaign Plans

- Missions 001–006: Norway — all playable, ending in a longer evacuation battle.
- Missions 007–096: Dunkirk, North Africa, Greece, Italy, Normandy, Netherlands and the Rhine — planned and locked.
- Missions 097–100: Berlin — explicitly fictional alternate-history finale, not a description of the historical end of WWII.

## Engineering and Tests

The game uses a self-contained canvas engine in index.html. Norway-specific map layouts and phase logic are recorded in norway-missions.js; campaign-map data is in ww2-campaign-data.js with the map interface ww2-campaign.html. Identical files are bundled under android/app/src/main/assets for offline play.

GitHub Actions checks the bundled files, runs **24 automated tests** covering all six Norway operations, save compatibility, no replay, escort failure, multi-objective completion and casualty records, and builds and verifies the Android APK signature.

Android ID uk.co.greendawn.jungle. Minimum Android 8.0. No network permission, ads, tracking or online account.
