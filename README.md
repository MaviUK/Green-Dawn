# GREEN DAWN v0.13 — The Road to Berlin

Original 16-bit-inspired offline Android squad tactics with **two separate campaigns**:

- **Jungle prototype campaign:** Jungle Assault, Depot Raid and Radar Blackout, all playable exactly as before. The existing three-mission career, soldiers, memorials and backup format remain untouched.
- **WWII campaign:** a complete planned **100-mission** route through the British Army's real WWII theatres, with original fictional small-unit operations and a clearly fictional alternate-history Berlin finale. Mission 001, **Cold Landing — Norway, 1940**, is now playable. The other 99 missions are visible on the map but NOT yet playable.

## Install v0.13

**[Direct Android APK](https://github.com/MaviUK/Green-Dawn/releases/download/v0.13.0/GreenDawn-Campaign-v0.13-debug.apk)**

Open the link on your Android phone in Chrome; find the APK in My Files → Downloads and install.

**Save warning:** The new historical campaign uses a different local save key from the jungle game, but APK upgrades still require compatible Android signing. If Android asks you to uninstall a previous build, **do not uninstall it if you care about its existing saves**: uninstalling deletes local soldier ranks and the memorial. Stable signing is not yet configured without your private GitHub Actions keystore secrets. Downloading v0.13 alone is safe.

## WWII campaign map

At the jungle camp select **WWII WAR MAP / 100 MISSIONS**. The map shows all 17 campaign regions and 100 operations with objectives:

1. Norway, Dunkirk, Operation Compass, Greece/Crete — levels 01–24.
2. Tobruk, Gazala, El Alamein, Tunisia — levels 25–48.
3. Sicily, Salerno, Monte Cassino — levels 49–66.
4. D-Day, Normandy breakout — levels 67–78.
5. Arnhem, Scheldt, Rhine crossing — levels 79–96.
6. Berlin alternate-history finale — levels 97–100.

Each historical campaign contains five linked missions followed by a sixth, longer major battle. Berlin has four special finale missions. These are **future gameplay designs, not finished maps**. You can browse any region, but only the first playable mission can be entered.

**Historical approach:** the locations, chronology and major campaign outcomes come from WWII history, while each small squad operation is fictional. Losses like Dunkirk and Arnhem are portrayed as defence and evacuation objectives. The final four Berlin missions deliberately change history: Soviet forces captured Berlin and Hitler killed himself historically; the game's British-squad assassination is expressly a fictional alternate-history conclusion.

## Playable: Mission 001 — Cold Landing

An original Norwegian snowfield beside an icy fjord. A three-man British squad lands by a small pier, moves through snow-covered firs, crosses a timber bridge and approaches a hardened coastal gun. **Destroy the coastal gun, then move a surviving soldier to the landing-zone marker** to secure the Allied foothold. Destroying the gun alone does not complete the level. Enemy guards use the existing hearing, patrol and cover mechanics.

Complete Mission 001 once to preserve its promotions, recruit reinforcements and casualties. Mission 002 becomes the next planned operation and remains locked until implemented; completed missions cannot be replayed.

## Separate records and backups

- Jungle careers are still stored at green-dawn-campaign-v1.
- WWII careers are stored at green-dawn-ww2-campaign-v1.
- Each mode has its own barracks, memorial and Save Data screen.
- The separate backup file formats prevent accidental restoration of a WWII career into the jungle campaign or vice versa.
- The native Android backup system still exports and imports portable JSON via the phone's system file picker with explicit confirmation.

In battle, tap to move; hold to shoot; drag to aim; release to stop. FRAG, split/join squads and pause remain functional.

## Code and validation

Browser entry: index.html. Historical catalogue and map: ww2-campaign-data.js and ww2-campaign.html. Android bundles identical offline copies of these three assets. The Android WebView serves pages locally without Internet permission, and GitHub Actions runs automated tests, compiles and signature-checks an APK, and publishes a versioned GitHub Release.

Android ID: uk.co.greendawn.jungle; version 0.13.0; min Android 8.0. No advertising, analytics or online account.
