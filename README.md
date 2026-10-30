# GREEN DAWN — Mission 01: Jungle Assault

A playable original retro 16-bit-inspired Android squad-tactics game. Lead Jax, Ace and Pip through jungle patrols, collect ammunition and destroy the radio bunker. All art, code and sound effects are original.

## Android v0.5 — marching formations

**[Direct Android APK download](https://github.com/MaviUK/Green-Dawn/releases/download/v0.5.0/GreenDawn-Mission01-v0.5-debug.apk)**

Open the link in Chrome. Then open **My Files → Downloads**, tap the APK, and install. This is a debug build for testing, not the Play Store release.

**Older-version upgrade warning:** GitHub's debug signing certificate is generated for each build. Android may refuse to install v0.5 over v0.4 with a signature-conflict message. If that happens, uninstall the old Green Dawn first, then install the new APK. Uninstalling will erase that installation's locally saved mission progress. A fixed signing identity is planned before production distribution.

## Controls

- **Tap ground:** issue a move order.
- **Hold ground ~240 ms:** fire in that direction; drag to aim; release to stop.
- **SPLIT:** divide the soldiers into Alpha and Bravo. **A** and **B** select either squad.
- **Tap soldier name:** control just that soldier. **Hold name:** transfer that soldier to the other squad (when possible).
- **JOIN:** reunite at the selected squad leader's position.
- **FRAG:** arm a grenade, then tap where to throw. **PAUSE** to suspend.

## New movement behaviour in v0.5

- The squad leader chooses one safe route. Followers chase sampled points **19px and 38px behind the leader's actual footsteps**.
- Followers navigate around obstacles and use the bridge rather than cutting across impassable riverbank.
- Marchers move in a natural single-file formation and settle at staggered positions when stopped.
- Independent Alpha/Bravo orders are maintained. Transferring a soldier to the other team redirects them towards that team's leader.
- A separate individual order detaches that soldier from the formation; the old squad retains its last destination.
- If a leader is killed, the first surviving follower takes command of that moving group.

## Source and privacy

`index.html` is the browser-playable game, and `android/app/src/main/assets/index.html` is the identical offline game built into the APK. `android/app/src/main/java/uk/co/greendawn/jungle/MainActivity.java` hosts it in an Android fullscreen landscape WebView. GitHub Actions compiles the APK and publishes the versioned GitHub Release automatically.

Android package: `uk.co.greendawn.jungle`; version 0.5.0; minimum Android 8.0. No Internet permission, tracking, advertising or accounts. Game progress lives locally on your phone.