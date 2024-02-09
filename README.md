# App Backend Routes

## Authentication

- **Login**
  - **Method:** `POST`
  - **Path:** `/api/login`
  - **Type:** `JSON`
  - **Parameters:**
    - `email`: User's email address
    - `password`: User's password

- **Signup**
  - **Method:** `POST`
  - **Path:** `/api/signup`
  - **Type:** `JSON`
  - **Parameters:**
    - `email`: User's email address
    - `password`: User's password
    - `name`: User's full name

## User Profile

- **Upload Avatar**
  - **Method:** `POST`
  - **Path:** `/api/user/avatar`
  - **Type:** `FormData`
  - **Parameters:**
    - `avatar`: Image file for the user's avatar

- **View Profile**
  - **Method:** `GET`
  - **Path:** `/api/user/profile/{userId}`
  - **Type:** `JSON`
  - **Parameters:** N/A
    - `userId`: (Optional) The ID of the user whose profile is being viewed. If not provided, the route returns the profile of the current logged-in user.

## Game Mechanics

- **Send Bump Event**
  - **Method:** `POST`
  - **Path:** `/api/game/bump`
  - **Type:** `JSON`
  - **Parameters:**
    - `opponentId`: The ID of the opponent user
    - `choice`: The user's game choice (`rock`, `scissor`, or `paper`)

- **View Result**
  - **Method:** `GET`
  - **Path:** `/api/game/result/{matchId}`
  - **Type:** `JSON`
  - **Parameters:** N/A
    - `matchId`: The ID of the match whose result is being queried
