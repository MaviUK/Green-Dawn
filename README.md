# GREEN DAWN — Heroes Lost in Action (v0.10)

Original 16-bit-inspired jungle squad tactics game for Android. Mission 01 Jungle Assault and Mission 02 Depot Raid, with an irreversible campaign, named recruits, individual promotions, permanent casualties, and an animated memorial scroll. This is an original work inspired by the feel of classic Amiga action games.

## Download Green Dawn v0.10 for Android

**[Direct APK download](https://github.com/MaviUK/Green-Dawn/releases/download/v0.10.0/GreenDawn-Campaign-v0.10-debug.apk)**

Download using **Chrome** on Android, then go to **My Files → Downloads**, tap the APK, and install. This is a testing APK, not yet a signed Play Store release.

**Important update note:** GitHub Actions may use different temporary debug-signing certificates for each release. If Android says the existing install conflicts with v0.10, uninstall the old test version first. This *deletes its local save*, including existing soldier ranks and memorial records. Future versions need stable signing and a backup/export flow before they should be considered safe for permanent saves.

## NEW — HEROES LOST IN ACTION

- **Automatic remembrance after every mission:** whether the mission succeeds or the squad is wiped out, the memorial appears before the post-mission report. Players must acknowledge the ceremony to continue.
- **Proper pixel-art parchment:** a full-screen, unrolling-style aged paper honour roll with wooden finials and a dark jungle backdrop.
- **Pixel-art insignia:** military chevrons (^) for enlisted ranks, NCO rocker marks, warrant diamond, and officer bars or stars appear alongside each soldier's full final rank, name, and operation.
- **Mission-specific ceremony:** only the casualties of the operation just completed are shown after that mission, never earlier campaign deaths.
- **Zero-loss operations:** the ceremony confirms that all deployed personnel returned even if the separate historical memorial contains losses.
- **Automatically scrolling list**, with touchscreen swipe to scroll manually and a Continue button; Android Back or Enter also advances.
- **Never miss the ceremony:** if the app closes before a post-mission memorial is acknowledged, the memorial is shown again at the next launch.
- **Separate camp archive:** the Memorial button at camp opens the full historical roll of honour; the post-mission report opens only that operation's fallen. Barracks still displays living soldiers and ranks.

## Campaign and controls

Start with Jax, Ace and Pip as recruits. Survivors gain a rank on completing an operation; two new recruits join the reserve after each victory. Dead soldiers are never resurrected. A complete wipeout allows new emergency recruits to retry the same current mission. The campaign moves forward only: 01 → 02, then the not-yet-built 03 Coming Soon. Completed missions cannot be replayed.

In landscape, **tap** the ground to move; **hold ~240 ms** to fire, **drag** to aim, and **release** to stop. SPLIT/ JOIN divides or reunites Alpha/Bravo teams; team tabs and soldier names select controls. FRAG throws a grenade. The squad leader charts the route and followers trail across bridge and jungle.

## Technical notes

The self-contained browser game is in `index.html`, and an identical copy ships offline in `android/app/src/main/assets/index.html`. GitHub Actions builds the Android APK and publishes a versioned release. This version uses the existing local career storage key `green-dawn-campaign-v1`, without resetting a v0.8 career on an in-place upgrade.

Android app ID: `uk.co.greendawn.jungle`; version 0.9.0; minimum Android 8.0. No ads, accounts, tracking or Internet permission. Artwork and synthesized sounds are original.