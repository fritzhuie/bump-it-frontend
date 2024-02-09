| Category        | Action          | Method | Path                        | Type       | Parameters                                          |
|-----------------|-----------------|--------|-----------------------------|------------|----------------------------------------------------|
| Authentication  | Login           | POST   | `/api/login`                | JSON       | `email`, `password`                                 |
| Authentication  | Signup          | POST   | `/api/signup`               | JSON       | `email`, `password`, `name`                         |
| User Profile    | Upload Avatar   | PUT    | `/api/user/avatar`          | FormData   | `avatar` (file)                                     |
| User Profile    | View Profile    | GET    | `/api/user/profile/{userId}`| JSON       | `userId` (optional, path parameter)                 |
| User Profile    | Delete Profile  | DELETE | `/api/user/profile`         | JSON       |                                                     |
| Game Mechanics  | Send Bump Event | POST   | `/api/game/bump`            | JSON       | `opponentId`, `choice` (`rock`, `scissor`, `paper`) |
| Game Mechanics  | View Result     | GET    | `/api/game/result/{matchId}`| JSON       | `matchId` (path parameter)                          |
