/*
services table:
- id (int, primary key)
- title (varchar)
- description (text)
- reward (float)
- user_id (foreign key → users.id)

Export functions:
- createService({ title, description, reward, user_id })
- getServicesByUser(userId)
- getServicesByPartner(userId)
- getServiceById(id)
*/
