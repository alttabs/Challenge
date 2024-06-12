const express = require('express');
const router = express.Router();
const User = require('./../models/User');
const bcrypt = require('bcrypt');

// POST a new user
router.post('/', async (req, res) => {
  try {
    const { workEmail, password, company, jobTitle, firstName, lastName } = req.body;
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

    const user = await User.findOne({ workEmail }, { password: 1 });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password comparison result:', isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful!' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
    console.error(error);
  }
});

module.exports = router;
