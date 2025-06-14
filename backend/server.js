/*
Express backend for a referral web app.
- Loads routes for users, services, partnerships, and leads.
- Uses MySQL via db.js for data persistence.
- Handles CORS, JSON parsing, and listens on process.env.PORT.
*/

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/users');
const serviceRoutes = require('./routes/services');
const partnershipRoutes = require('./routes/partnerships');
const leadRoutes = require('./routes/leads');

const app = express();

app.use(cors());
app.use(express.json());

app.use(userRoutes);
app.use(serviceRoutes);
app.use(partnershipRoutes);
app.use(leadRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
