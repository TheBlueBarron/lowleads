/*
users table:
- id (int, primary key, auto-increment)
- name (varchar)
- email (varchar, unique)
- password_hash (varchar)
- balance (float, default 0)

Export functions:
- createUser({ name, email, password_hash })
- getUserByEmail(email)
- getUserById(id)
- updateBalance(userId, amount)
*/
