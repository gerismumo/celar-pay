# Simple Payment App

A full-stack mobile application built with **React Native (Expo + TypeScript)** and a **Node.js + Express (TypeScript)** backend, allowing users to sign up, log in, view their transactions, and send payments. The app includes role-based toast notifications and secure token-based authentication.

---

## Features

### React Native (Expo) Frontend

- User Authentication (Sign Up / Log In)
- JWT-based Secure Session stored via `AsyncStorage`
- Dashboard
  - View transactions (recipient, amount, currency, timestamp)
  - Role-based one-time toast notification:
    - `psp`: _"You have X merchants connected"_
    - `dev`: _"You've made Y API calls this week"_
- Send Payment
  - Form to send payments (recipient, amount, currency)
  - Toast feedback on success or failure
- Logout functionality
- Environment config via `.env` using `EXPO_PUBLIC_API_BASE_URL`
- TypeScript support

### Node.js + Express Backend

- User Authentication with password hashing (bcrypt) and JWT token issuing
- Transactions
  - Retrieve transactions for authenticated users
  - Send payment (mock transaction with success/failure response)
- PostgreSQL for data persistence
- JWT Middleware to protect authenticated routes
- Bonus: Webhook triggered on successful payment
- TypeScript with Knex for migrations
- Docker support with PostgreSQL and app services

---

## Getting Started

### Frontend (React Native + Expo)

#### 1. Install dependencies

```bash
cd client
npm install
```

#### 2. Add environment variables

Create a `.env` file at the root of the React Native app:

```env
EXPO_PUBLIC_API_BASE_URL=http://<your-local-ip>:3000
```

> Replace `<your-local-ip>` with your machine’s local IP to allow mobile devices to connect.

#### 3. Start the app

To run on Expo Go:

```bash
npx run start
```

> Scan the QR code using the Expo Go app on your mobile device.

---

### Backend (Node.js + Express + PostgreSQL)

#### 1. Install dependencies

```bash
cd server
npm install
```

#### 2. Add environment variables

Create a `.env` file in the root of the backend directory:

```env
DB_HOST=localhost
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_NAME=your_db_name
DB_PORT=5432

PORT=3000
JWT_SECRET=your_jwt_secret_key
```

#### 3. Run database migrations

```bash
npm run migrate
```

#### 4. Start the server

```bash
npm run start
```

---

### Docker Setup (Optional)

Ensure your `.env` file is correctly configured, then run:

```bash
docker compose up -d
```

> This will spin up both the Node.js backend and the PostgreSQL database using Docker.

---

## API Documentation

### Authentication

#### `POST /api/auth/signup`

Register a new user.

- **Body:**

  ```json
  {
    "email": "",
    "password": "",
    "role": "psp" // or "dev"
  }
  ```
- **Response:**

  ```json
  {
    "success": true,
    "message": "",
    "data": {
      "email": "",
      "password": "",
      "role": "",
      "token": ""
    }
  }
  ```

#### `POST /auth/login`

Authenticate and receive a JWT.

- **Body:**

  ```json
  {
    "email": "",
    "password": ""
  }
  ```
- **Response:**

  ```json
  {
    "success": true,
    "message": "",
    "data": {
      "email": "",
      "password": "",
      "role": "",
      "token": ""
    }
  }
  ```

---

### Transactions

> All endpoints below require the `Authorization` header:

```http
Authorization: Bearer <jwt-token>
```

#### `GET /transactions`

Returns a list of transactions for the logged-in user.

- **Response:**

  ```json
  {
    "success": true,
    "data": [
      {
        "id": "uuid",
        "recipient": "merchant@example.com",
        "amount": 100.0,
        "currency": "USD",
        "timestamp": "2024-07-25T12:00:00Z"
      }
    ]
  }
  ```

#### `POST /transactions/send`

Send a payment to a recipient.

- **Body:**

  ```json
  {
    "recipient": "merchant@example.com",
    "amount": 50,
    "currency": "USD"
  }
  ```
- **Response (Success):**

  ```json
  {
    "success": true,
    "message": ""
  }
  ```
- **Response (Failure):**

  ```json
  {
    "success": false,
    "message": ""
  }
  ```
- **Bonus:** Triggers a mock webhook to an external service like [https://usewebhook.com](https://usewebhook.com)

---

## Tech Stack

| Layer       | Technology               |
| ----------- | ------------------------ |
| Frontend    | React Native + Expo      |
| Backend     | Node.js + Express + TS   |
| Auth        | JWT + bcrypt             |
| Database    | PostgreSQL (via Knex.js) |
| Dev Tools   | Docker, Nodemon          |
| Type Safety | TypeScript               |

---

## Testing

You can test the backend with:

```bash
npm test
```

Uses `jest` and `supertest` for unit/integration testing.

---

## Walkthrough

A 5-minute video demo of the app and API structure is available in the submission [Loom Video](https://www.loom.com/share/84a4d0873025481c80703982f30a5449?sid=b38bacee-440f-40e6-911f-80e24ab25f81).

---

## Notes & Assumptions

- The project uses in-app JWT storage via `AsyncStorage`, not SecureStore, for simplicity.
- The backend webhook trigger is mocked and not validated for response status.
- The `psp` and `dev` role-based data (e.g., connected merchants or API calls) is mocked in the frontend.
- App must be run on a physical device or emulator using Expo Go for full testing.

---

## Contributions & Feedback

Open to suggestions, improvements, or refactors. Feel free to fork or submit PRs.

---

## License

MIT – Free to use and adapt.

---
