# GREEN DAWN — Mission 01: Jungle Assault

An original 16-bit-inspired, top-down squad tactics game for Android. Lead Jax, Ace and Pip through jungle patrols and destroy the enemy radio bunker. This is an original work, not a reproduction of Cannon Fodder game assets, music, or code.

## Install the latest Android game

**[Download Green Dawn v0.6 (APK)](https://github.com/MaviUK/Green-Dawn/releases/download/v0.6.0/GreenDawn-Mission01-v0.6-debug.apk)**

Open the link in **Chrome**, then **Samsung My Files → Downloads → GreenDawn-Mission01-v0.6-debug.apk → Install**. This is a test APK, not a Google Play release.

**Note:** Each cloud debug build may be signed with a different debug key. If Android says the app conflicts with an installed version, uninstall the previous test copy first and then install v0.6. Uninstalling clears the previous version's locally saved progress. Production signing and safe upgrades will be handled before public release.

## Controls

- **Tap battlefield:** move the controlled squad or soldier.
- **Hold battlefield ~0.24s:** fire continuously; **drag** while holding to aim; **release** to stop.
- **SPLIT / JOIN:** divide and reunite Alpha and Bravo. **A / B** tabs select teams, and tapping a soldier's name selects one soldier.
- **Hold a soldier's name:** transfer them between Alpha and Bravo where team size permits.
- **FRAG:** tap button to arm a grenade, then tap the destination.
- **SFX / PAUSE:** toggle sound or suspend the mission.

## What's new in v0.6

- **Enemy awareness:** guards patrol, investigate nearby gunshots, and engage targets only when they have clear sight; trees and bunker walls interrupt gunfire.
- **Suppression and cover:** close misses make guards duck; some then move towards nearby trees to seek cover.
- **Combat feedback:** brighter directional muzzle flashes, fast bullet tracers, impact sparks, and animated fallen soldier bodies.
- **Better balance:** guards briefly aim before firing, with moderately slower shots compared to v0.5.
- The previous **leader-follow formations**, bridge navigation, separate squad orders, regrouping, and tap/hold touchscreen scheme remain intact.

## Build and privacy

- `index.html` is a self-contained, browser-playable version.
- `android/app/src/main/assets/index.html` is identical and bundled offline in the APK.
- `android/app/src/main/java/uk/co/greendawn/jungle/MainActivity.java` provides the landscape fullscreen Android wrapper.
- `.github/workflows/android-debug-apk.yml` builds APKs and publishes versioned GitHub Releases.

Android package: `uk.co.greendawn.jungle`; version 0.6.0; minimum API 26 (Android 8.0). No accounts, ads, analytics or Internet permission. Saves are local.