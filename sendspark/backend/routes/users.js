const express = require('express');
const router = express.Router();
const User = require('./../models/User'); 
const bcrypt = require('bcrypt');

// POST a new user
router.post('/', async (req, res) => {
  try {
    const { workEmail, password } = req.body;
    const existingUser = await User.findOne({ workEmail }); // Use the correct variable
    if (existingUser) {
      return res.status(400).json({ message: 'A user with this email already exists' });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ workEmail, password: hashedPassword }); 

    const savedUser = await newUser.save(); 
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
    console.log(error);
  }
});

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// DELETE a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

module.exports = router;
