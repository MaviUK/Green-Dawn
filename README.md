# GREEN DAWN v0.12 — Campaign Save Backup

Original 16-bit-inspired offline jungle-squad tactics for Android. Three playable missions, permanent recruits, promotions, permanent losses, Alpha/Bravo split squads, the per-mission ceremony and separate historical memorial. No level selection or replay menu.

## Download

**[Direct Android APK v0.12](https://github.com/MaviUK/Green-Dawn/releases/download/v0.12.0/GreenDawn-Campaign-v0.12-debug.apk)**

Open in Chrome on your Samsung, then tap the APK in My Files → Downloads. This is an experimental debug APK.

**IMPORTANT — v0.11 save warning:** GitHub's temporary debug certificate can change from one APK to the next. If Android says the v0.12 APK cannot install over v0.11, do **not** uninstall the old app if you need its progress. Uninstalling v0.11 erases its private save. The v0.12 export function cannot recover a v0.11 save *after* uninstall. Persistent signing is prepared but has not been configured with a private key.

## New: Save Data at camp

The camp menu now offers **BARRACKS / MEMORIAL / SAVE DATA**.

1. Choose **SAVE DATA → EXPORT SAVE FILE**. Android's system Files picker asks where to store a portable **GreenDawn-YYYYMMDD-HHmm.json** file. Keep it in Downloads, another folder, or a cloud-backed destination. No storage permission or Internet access is required by the game.
2. To recover a backup, choose **SAVE DATA → IMPORT SAVE FILE**, select that JSON file in Android Files, and inspect the confirmation screen showing the imported campaign and roster.
3. **CONFIRM REPLACE SAVE** is the only action that replaces existing data. Import cancellation, corrupt files and unsupported versions do not write to saved progress. After confirmation, the game reloads to the appropriate campaign state.

Backups contain soldiers' ranks and names, all fallen heroes, operation victories, next mission, best score, settings and an unfinished post-mission memorial if present. They do **not** contain an in-progress battlefield snapshot: the game already saves careers, not mid-battle positions. Backups are JSON files you control, not online accounts.

### Browser version

The same menu supports JSON download/upload in a browser that permits local downloads. The offline Android APK uses Android's built-in secure document picker.

## Persistent signing — preparation only

Android APK upgrades require the **same signing certificate** across builds. The workflow supports a persistent keystore supplied via these repository Actions secrets:

- GREEN_DAWN_KEYSTORE_B64
- GREEN_DAWN_KEYSTORE_PASSWORD
- GREEN_DAWN_KEY_ALIAS
- GREEN_DAWN_KEY_PASSWORD

Do not commit the keystore or passwords. If no signing secrets are configured, builds continue with temporary debug signing and the workflow emits a warning. Stable signing can protect **future** updates once configured; it cannot retroactively match the unknown temporary key used for v0.11.

## Existing game

Mission 01: Jungle Assault → Mission 02: Depot Raid → Mission 03: Radar Blackout, with its counterattack and extraction phase. Each mission can be completed only once. Surviving soldiers gain promotion and fresh recruits join after victory; fallen soldiers never return. The ceremony shows only losses from the most recent operation, using pixel military insignia. Camp's historical Memorial retains all fallen from the campaign.

Controls: tap to move, hold to shoot, drag to aim, release to stop, SPLIT / JOIN Alpha and Bravo, tap FRAG to throw a grenade. The game retains its original pixel-art terrain and synthesized effects.

## Engineering

The standalone game is index.html, identically bundled in android/app/src/main/assets/index.html. Android package: uk.co.greendawn.jungle, min Android 8, v0.12.0. GitHub Actions runs campaign and backup regression tests, builds and verifies the APK signature, and publishes a GitHub Release. No analytics, ads, accounts or Internet permission.
