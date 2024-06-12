const express = require('express');
const router = express.Router();
const User = require('./../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// POST a new user
router.post('/', async (req, res) => {
  try {
    const { workEmail, password, company, jobTitle, firstName, lastName } = req.body;

    if (!workEmail || !password || !company || !firstName) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const existingUser = await User.findOne({ workEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'A user with this email already exists' });
    }

    const newUser = new User({ workEmail, password, company, jobTitle, firstName, lastName });

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
    const { page = 1, limit = 10, company, jobTitle } = req.query; // Get search terms from query params
    const skip = (page - 1) * limit;

    const query = {};

    if (company || jobTitle) {
      query.$or = [
        company && { company: { $regex: company, $options: 'i' } },
        jobTitle && { jobTitle: { $regex: jobTitle, $options: 'i' } },
      ].filter(Boolean);
    }

    const users = await User.find(query)
      .skip(skip)
      .limit(limit);

    const totalUsers = await User.countDocuments(query);

    res.json({
      users,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
    console.error(error);
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

router.post('/login', async (req, res) => {
  try {
    const { workEmail, password } = req.body;
    if (!workEmail || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const user = await User.findOne({ workEmail }, { password: 1, workEmail: 1, firstName: 1 });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '40h' });
    console.log(user);
    res.status(200).json({
      token: token,
      user: {
        _id: user._id,
        workEmail: user.workEmail,
        firstName: user.firstName,
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
    console.error(error);
  }
});

router.get('/verify', async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;
