# GREEN DAWN — Mission 01: Jungle Assault

Original retro pixel-art squad-tactics game for Android. Lead JAX, ACE and PIP through jungle patrols and destroy a radio bunker. Built with new artwork and code; no copyrighted Cannon Fodder assets are included.

## Install on Android (v0.3 — tap to move, hold to shoot)

**[Download Green Dawn Android v0.3 APK](https://github.com/MaviUK/Green-Dawn/releases/download/v0.3.0/GreenDawn-Mission01-v0.3-debug.apk)**

1. Download the APK in Chrome on your phone.
2. Open **Samsung My Files → Downloads** and tap the APK.
3. Allow installation from My Files/Chrome if Android asks, then tap **Install** and **Open**.

**Important for testers upgrading from v0.2:** GitHub Actions debug APK builds can have different ephemeral signing certificates. If Android says the update is incompatible, **uninstall the previous Green Dawn app before installing v0.3**. This will clear progress saved inside the older test app. Stable release signing will be arranged for later versions.

## Controls

- **Quick tap anywhere on the battlefield:** move the selected soldier or the entire squad to that point.
- **Press and hold on the battlefield (about 0.24 seconds):** fire continuously towards that point without giving a move order.
- **Drag your finger while holding:** change shooting direction, including while the camera scrolls.
- **Release your finger:** stop shooting immediately.
- **FRAG:** tap the button to arm a grenade; tap a target to throw, or tap the button again to cancel. Returns to regular tap/hold controls afterwards.
- **SFX ON / OFF, PAUSE:** buttons at the bottom; select soldiers from the left-hand HUD.

The game is landscape-only, works fully offline and doesn't request Internet permission, accounts or tracking.

## Source and builds

- `index.html` — playable browser version.
- `android/app/src/main/assets/index.html` — identical HTML packaged inside APK.
- `android/app/src/main/java/uk/co/greendawn/jungle/MainActivity.java` — Android landscape fullscreen wrapper.
- `.github/workflows/android-debug-apk.yml` — Gradle CI for every gameplay update. Also publishes `v0.3.0` APK in GitHub Releases.

To rebuild: **Actions → Build Green Dawn Android APK → Run workflow**. Version 0.3.0, Android package ID `uk.co.greendawn.jungle`, minimum Android 8.0.