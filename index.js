const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());

// Replace the <password> placeholder with your actual password
const mongoDBConnectionString = 'mongodb+srv://omar:omar@cluster0.rsdgr1i.mongodb.net/flutter_app_db';

mongoose.connect(mongoDBConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema for the user
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// Create a model
const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.json());

// API endpoint to handle user registration
app.post('/api/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Basic validation
  if (!name || !email || !password || password !== confirmPassword) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  // Create a new user
  const newUser = new User({
    name,
    email,
    password,
  });

  try {
    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: 'Account created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});