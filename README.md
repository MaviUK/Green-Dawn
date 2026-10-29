# GREEN DAWN

An original pixel-art top-down jungle squad tactics game for Android inspired by classic Amiga action games. No assets or code from Cannon Fodder are included.

## Play

Mission 01: Jungle Assault. Lead JAX, ACE and PIP through enemy patrols, collect ammo and destroy a radio bunker. Touch controls: MOVE, FIRE, GRENADE and squad selection. Supports offline landscape play.

## Installable Android APK

Go to **Actions** > **Build Green Dawn Android APK** > the latest run (or **Run workflow**). After a successful build, download the artifact **green-dawn-android-debug-apk** and extract **app-debug.apk** from the ZIP. Install the APK on your Android phone via Files. The Android debug build is for private testing; release signing and Play Store upload are later steps.

## Project

- `index.html` — standalone playable browser preview
- `android/` — native Android offline fullscreen WebView wrapper and included game
- `.github/workflows/android-debug-apk.yml` — APK build workflow

This app needs **no Internet permission** and does not collect personal information. Game progress is stored locally on the device. The Android APK can be rebuilt by GitHub Actions. Version 0.2.0.
