// backend/server.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const salesRoutes = require('./routes/sales');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/sales', salesRoutes);

const startServer = async () => {
  try {
    await sequelize.sync();
    app.listen(3001, () => {
      console.log('Server is running on port 3001');
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
