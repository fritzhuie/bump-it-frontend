# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

NOTES:
Game / bump  component
- Show 3 buttons
- Click one button to "load" a choice
- Bump triggers fetch request and "last match" request, store match id
- lock interfact for 1 second
- one more "last match" request, compare new matchid to old matchid
- if they're different, show result (second match)
- if it's the same, back to -> show 3 buttons

MatchHistory
- shows a list of MatchResults that user was involved in
- shows user avatar on left, opponent avatar on right, winner, names
- click to see the MetchResult component, loaded with the selected MatchResult ID

MatchResultDetail
- shows the requested MatchResult
- Called via bump game (latest MatchResult) or match history (MatchResult by id)
- Click CLOSE to go back to bump game, or MatchHistory page

Profile
- Shows user's name, avatar, win/loss ratio, button for match history
- button for edit avatar
- button for delete profile
