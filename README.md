# GREEN DAWN — Mission 01: Jungle Assault

Original retro pixel-art squad tactics game for Android. Lead JAX, ACE and PIP through enemy patrols to destroy a radio bunker. Inspired by the feel of classic Amiga games; no original Cannon Fodder assets or code are used.

## Download the Android APK (Samsung / other Android phones)

1. Open **[GitHub Actions](https://github.com/MaviUK/Green-Dawn/actions/workflows/android-debug-apk.yml)**.
2. Tap the latest successful **Build Green Dawn Android APK** run. If there is no run, choose **Run workflow** and select `main`.
3. Under **Artifacts**, download `green-dawn-android-debug-apk` (a ZIP).
4. Extract the ZIP using Samsung My Files, then open `app-debug.apk` and allow installation when prompted.

The build is a *debug APK* for testing, not yet a release-signed Google Play version. If you install an APK from another source, you may have to grant that app permission to install unknown apps; you can turn this permission off afterwards.

## Play immediately in a browser

Open `index.html` in a browser or serve the repository as a static site. Rotate your device to **landscape**. Use **MOVE** to command soldiers, **FIRE** to shoot, and **GRENADE** to lob explosives. Android Back pauses/resumes.

## Project layout

- `index.html`: self-contained browser game with canvas rendering, touch controls and locally saved progress.
- `android/app/src/main/assets/index.html`: identical offline game bundled inside the APK.
- `android/app/src/main/java/uk/co/greendawn/jungle/MainActivity.java`: locked-down fullscreen WebView Android activity.
- `.github/workflows/android-debug-apk.yml`: automated Android debug APK build on push.
- `android/app/build.gradle`: Android SDK/Gradle configuration.

**Privacy:** No accounts, ads, tracking or Internet permission. Save data stays on the device. All game artwork and effects are original procedural work.

**Version:** 0.2.0 · Package ID: `uk.co.greendawn.jungle` · Min Android: 8.0 (API 26).
