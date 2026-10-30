# GREEN DAWN - Two Mission Android Prototype

Original 16-bit-inspired top-down jungle action and squad tactics game for Android. All code, pixel artwork, and synthesized sound effects are original.

## Download Version 0.7

**[Green Dawn v0.7 Android APK](https://github.com/MaviUK/Green-Dawn/releases/download/v0.7.0/GreenDawn-Mission01-v0.7-debug.apk)**

Open this link in **Chrome**, then use **Samsung My Files > Downloads** to install the APK. It is a debug/test build, not a Play Store version.

**Upgrading from earlier debug APKs:** GitHub-generated debug builds may use different signing certificates. If Android refuses the update, uninstall the previous Green Dawn first and then install v0.7. Uninstalling clears that version's locally stored game progress. A consistent release signing certificate is planned before public publication.

## Missions

**01 - Jungle Assault:** Cross hostile jungle, destroy the enemy radio bunker, and keep your soldiers alive.

**02 - Depot Raid (new):** Enter from the opposite side of a darker jungle map, cross the bridge, destroy the enemy fuel/supply depot, and take a surviving soldier to the marked extraction zone. Depot destruction alone does not finish the mission. The landing zone lights up once the depot is destroyed.

You can choose either mission from the main menu, and completing Mission 01 offers **NEXT: DEPOT RAID**. Completed missions are marked on the menu. Best score and completions are stored locally in the existing save key and older progress carries forward where available.

## Mobile Controls

- **Tap the ground:** move the selected squad or soldier.
- **Hold the ground:** start shooting after about 0.24 seconds; **drag to aim**, **release to stop**.
- **SPLIT** creates independent Alpha and Bravo squads. Select either with the **A / B** tabs. **JOIN** reunites the groups.
- Tap a soldier's name to control that soldier alone; hold the name to transfer between squads when possible.
- **FRAG** arms a grenade, then tap a target to throw.
- SFX and pause controls at the bottom.

Soldiers march behind a leader using sampled footsteps, navigate trees and the bridge, and promote a surviving follower if the leader falls. Enemy guards react to shots and seek cover.

## Android Build

- `index.html`: self-contained browser version.
- `android/app/src/main/assets/index.html`: identical game bundled in APK.
- `android/app/src/main/java/uk/co/greendawn/jungle/MainActivity.java`: fullscreen offline Android WebView wrapper.
- `.github/workflows/android-debug-apk.yml`: APK build and versioned GitHub Release workflow.

Version **0.7.0**, Android package `uk.co.greendawn.jungle`, Android 8.0+ minimum. No accounts, trackers, adverts, or Internet permission. The game can run offline.