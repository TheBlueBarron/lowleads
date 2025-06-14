/*
Handles user registration, login, and profile fetch:
- POST /register → hash password, insert user, return JWT
- POST /login → validate password, return JWT
- GET /profile → get user info using JWT
Uses bcrypt and jsonwebtoken.
*/
