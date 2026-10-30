# GREEN DAWN — Radar Blackout (v0.11)

Original, offline 16-bit-inspired Android jungle squad tactics. Three handcrafted missions, permanent soldier careers, Alpha/Bravo teams, and a one-way campaign. The game is original; it contains no artwork or sound from Cannon Fodder.

## Download Android v0.11

**[Download the v0.11 debug APK](https://github.com/MaviUK/Green-Dawn/releases/download/v0.11.0/GreenDawn-Campaign-v0.11-debug.apk)**

On Samsung Android, open the link in Chrome and install the APK from **My Files → Downloads**. This is a testing APK, not a Play Store release.

**Save warning:** The existing campaign uses local storage under green-dawn-campaign-v1. In-place upgrades preserve that save, but GitHub Actions may sign different debug builds with different temporary certificates. If Android requires you to uninstall the old build to install this one, **uninstalling permanently deletes your existing local campaign, recruits, promotions, and memorial**. Do not uninstall without accepting this loss. Stable APK signing and a save export are not yet implemented.

## NEW in v0.11 — Mission 03: Radar Blackout

- **Play after Depot Raid**: a cleared Mission 02 advances into a newly playable third operation automatically, including careers saved with v0.10.
- **Original radar-jungle map**: enter from the southwestern trail, cross the timber bridge, attack a fortified radar compound, then reach the northeastern extraction zone.
- **Two-stage objective**: destroy the radar array by gunfire or grenades, then move at least one surviving soldier into the extraction area. Merely destroying the target does not end the mission.
- **Counterattack**: three new enemy patrols enter from reachable track junctions after the radar is destroyed. Original guards, grenades, suppression, squad pathfinding, and cover systems remain in use.
- **New art**: a dark-green jungle palette, pixel radar antenna, blinking warning light, animated sweep, target damage indicator, and destroyed radar wreckage.
- **Campaign continuity**: no level selection or replay. Clear operations 01 → 02 → 03 in order. Mission 04 is not built yet. Promotions, new recruits, permanent casualties, and score carry through existing records.
- **Regression checks**: GitHub Actions runs simulation tests for returning v0.10 players, progression through three missions, reinforcements, no replay, zero-casualty and casualty memorials, and the full historical roll before building the APK.

## Existing memorial and gameplay

After each mission, the automatic parchment memorial shows **only the soldiers lost in that operation**; a zero-loss operation never lists older casualties. Individual ranks use original pixel chevrons and military insignia. **Camp → Memorial** separately retains all previous losses, and **Camp → Barracks** shows living troops.

In landscape, **tap** to move, **hold around 240 ms** to fire, **drag** to aim, and **release** to stop. SPLIT/JOIN controls Alpha and Bravo squads, while FRAG throws a grenade. Survivors are promoted and reinforcements join reserves after victories. A wipeout allows new emergency recruits to retry the current operation; previous victories cannot be replayed.

## Technical notes

The game is self-contained in index.html with an identical offline copy in android/app/src/main/assets/index.html. GitHub Actions validates both copies, runs tests, builds a debug APK, and publishes a versioned release. Android package uk.co.greendawn.jungle, version 0.11.0, minimum Android 8. No ads, accounts, tracking, or Internet permission.
