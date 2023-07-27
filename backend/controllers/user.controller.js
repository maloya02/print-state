const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config.js');

const User = db.users;

const createUser = async (req, res) => {
  try {
    const { userEmail, userPassword, userType } = req.body;

    // Check if the users already exists
    const existingUser = await User.findOne({ where: { userEmail } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the userPassword
    const hashedPassword = await bcrypt.hash(userPassword, 10);

    // Create the users
    const users = await User.create({ userEmail, userPassword: hashedPassword, userType :userType});

    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;

    // Find the users by userEmail
    const users = await User.findOne({ where: { userEmail } });
    if (!users) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(userPassword, users.userPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid userPassword' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: users._id, userEmail: users.userEmail,userType:users.userType },
      config.secretKey
    );

    // Return the token as part of the response
    res.status(200).json({ token,data:users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { userEmail, userPassword, userType } = req.body;

    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Hash the new userPassword if provided
    let hashedPassword = user.userPassword;
    if (userPassword) {
      hashedPassword = await bcrypt.hash(userPassword, 10);
    }

    await user.update({ userEmail, userPassword: hashedPassword, userType });
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Other controller methods: updateUser, deleteUser, getUserById, getAllUsers, etc.

module.exports = {
  createUser,
  loginUser,
  getUsers,
  deleteUser,
  editUser,
  // Add other controller methods here
};
