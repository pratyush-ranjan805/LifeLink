require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const donorRoutes = require('./routes/donors');
const emergencyRoutes = require('./routes/emergency');
const bloodbankRoutes = require('./routes/bloodbank');

const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lifelink')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Root Health Check Route
app.get('/', (req, res) => {
  res.send('LifeLink API is running and connected to MongoDB!');
});

// Routes
app.use('/auth', authRoutes);
app.use('/donors', donorRoutes);
app.use('/emergency', emergencyRoutes);
app.use('/bloodbank', bloodbankRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
