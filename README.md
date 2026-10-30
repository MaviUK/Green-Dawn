# GREEN DAWN — Mission 01: Jungle Assault

Original retro pixel-art squad-tactics game for Android. Lead JAX, ACE and PIP through jungle patrols and destroy a radio bunker. Original artwork and source code inspired by the *feel* of classic Amiga games, without copied Cannon Fodder assets.

## Install on Android (v0.4 — split squads)

**[Download Green Dawn v0.4 APK](https://github.com/MaviUK/Green-Dawn/releases/download/v0.4.0/GreenDawn-Mission01-v0.4-debug.apk)**

Open the download in **Chrome**. On Samsung, go to **My Files → Downloads**, tap the APK, then install. Allow installation from Chrome or My Files if Android asks. This is a test/debug APK, not a Google Play release.

**Note:** CI-built debug APKs use temporary signing keys, so Android may reject upgrading an older version directly. If it says *App not installed* or *Package conflicts*, uninstall the previous Green Dawn version before installing v0.4. This clears the older local save data. We will configure stable signing before public release.

## Squad management

- Start the mission with all three soldiers under one command.
- Tap **SPLIT** on the bottom bar: **Alpha** gets JAX and ACE, **Bravo** gets PIP.
- Tap **A** or **B** above the soldier list to take control of that group. The camera follows the selected group.
- **Tap a soldier's name** to control that soldier alone, even while split.
- **Press and hold a soldier's name** to move them to the *other* team. Each team must keep at least one living soldier.
- Tap **JOIN** to issue a **regroup order**, gathering survivors at the currently selected team leader.
- Unselected teams **continue their last movement orders** while you control the other team.
- **Tap the battlefield** to move the selected team; **hold to shoot**, **drag to aim**, **release to stop**.
- Tap **FRAG** and then tap the target to throw a grenade from the selected team. Tap FRAG again to cancel.

Teams are visible in gold (Alpha) and blue (Bravo) on soldiers' labels and minimap.

## Building

- `index.html`: browser-playable self-contained game
- `android/app/src/main/assets/index.html`: identical bundled offline game
- `android/app/src/main/java/uk/co/greendawn/jungle/MainActivity.java`: Android landscape fullscreen wrapper
- `.github/workflows/android-debug-apk.yml`: builds APK and publishes GitHub Release when pushed

Android package `uk.co.greendawn.jungle`; version 0.4.0; requires Android 8.0 or newer. No Internet permission, analytics or ads; progress remains on the device.