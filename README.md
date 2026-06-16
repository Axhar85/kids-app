# Kids App

A mobile-first Expo app for children to learn animals through simple games,
sounds, speech, profiles, badges, and parent progress tracking.

## What is included

- Child profiles with avatars
- Little Kids animal matching game
- Score, level, stars, and animal badges
- Unlockable memory game
- Parent dashboard with per-child progress
- Big Kids name greeting screen with English and Urdu text
- Quiz screen placeholder for the next game mode

## Tech stack

- Expo
- React Native
- Expo Router
- TypeScript
- AsyncStorage
- Expo AV and Speech

## Get started

Install dependencies:

```bash
npm install
```

Start the app:

```bash
npm.cmd run start
```

On Windows PowerShell, use `npm.cmd` if `npm` is blocked by the system script
execution policy.

## Useful commands

```bash
npm.cmd run lint
npm.cmd run android
npm.cmd run ios
npm.cmd run web
```

## Project shape

- `app/(tabs)/index.tsx` controls the main app flow.
- `screens/` contains the child-facing games and parent dashboard.
- `hooks/useToddlerGame.ts` manages score, levels, sounds, and badge progress.
- `data/animals.ts` defines the animal images, colors, and sounds.
- `assets/images/` and `assets/sounds/` contain the learning assets.

## Next improvements

- Build the quiz game mode.
- Move repeated button styles into shared components.
- Add stronger types for game props and animal sound assets.
- Improve layout polish across phone, tablet, and web.
