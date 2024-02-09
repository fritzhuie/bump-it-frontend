# RSP-bump

# Rock-Scissor-Paper Game API Endpoints

## Authentication

- **Create Account**
  - `POST /api/accounts/create`
  - Creates a new user account.
  - **Body**: `username`, `password`, `email`

- **Login**
  - `POST /api/auth/login`
  - Authenticates a user and returns a token.
  - **Body**: `username`, `password`

- **Logout**
  - `POST /api/auth/logout`
  - Logs out a user and invalidates the token.
  - **Headers**: `Authorization: Bearer <token>`

## User Profile

- **Upload Avatar Photo**
  - `POST /api/users/avatar`
  - Uploads a new avatar photo for the user.
  - **Headers**: `Authorization: Bearer <token>`
  - **Body**: `FormData` with the image file

- **View Achievements**
  - `GET /api/users/achievements`
  - Retrieves the achievements of the logged-in user.
  - **Headers**: `Authorization: Bearer <token>`

## Game Actions

- **Perform Bump (Play Game)**
  - `POST /api/game/bump`
  - Initiates a rock-scissor-paper game via a bump action and returns the results.
  - **Headers**: `Authorization: Bearer <token>`

- **Get Game History**
  - `GET /api/game/history`
  - Retrieves the game history of the logged-in user.
  - **Headers**: `Authorization: Bearer <token>`

- **Delete Game History**
  - `DELETE /api/game/history`
  - Deletes the game history of the logged-in user.
  - **Headers**: `Authorization: Bearer <token>`
