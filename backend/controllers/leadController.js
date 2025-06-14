/*
Handles:
- POST /leads → send new lead to a partner's service
- GET /leads → list leads received for user's services
- PATCH /leads/:id/sold → mark lead as sold
  - Transfers reward from service owner to lead sender
  - Updates balances in users table
*/
