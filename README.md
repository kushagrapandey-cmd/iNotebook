# iNotebook

A full-stack notes application with account registration, login and user-owned note management.

## Features

- Registration and login with bcrypt password hashing and JWT authentication.
- Add, read, update and delete notes.
- Express middleware identifies the authenticated user.
- Note update/delete routes check ownership.
- React Context shares note state across the interface.

## Architecture

`React + React Router + Context → Express REST API → MongoDB / Mongoose`

| Path | Responsibility |
| --- | --- |
| `src/components/` | Account forms and note interface |
| `src/context/notes/NoteState.js` | Client note state and API calls |
| `backend/routes/auth.js` | Registration, login and account lookup |
| `backend/routes/notes.js` | Note CRUD and ownership checks |
| `backend/middleware/fetchUser.js` | JWT verification |
| `backend/models/` | User and note schemas |
| `backend/db.js` | Local MongoDB connection |

## Run locally

Start MongoDB at `mongodb://localhost:27017/iNotebook`.

```bash
# Terminal 1: API on port 5000
cd backend
npm install
node index.js
```

```bash
# Terminal 2: React app on port 3000, from repository root
npm install
npm start
```

The frontend uses a local API address. Root `npm run build` builds the client; the backend has no implemented automated test suite.

## Status

An earlier MERN implementation, intended for local demonstration with synthetic accounts. The source contains a hardcoded JWT signing secret, no token expiry in the signing calls and broad CORS. Before any public deployment, replace the secret with a private environment value, invalidate old tokens, add expiry and harden the API. This documentation update does not claim those changes are implemented.
