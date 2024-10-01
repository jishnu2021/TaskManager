const User = require('../modals/UserSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register User
exports.registerUser = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json({ message: 'User already registered.' });

    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: 0 // User role
    });

    await user.save();
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).status(201).json({
      message: 'User registered successfully.',
      data: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if User exists
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password.' });

    // Compare hashed password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid email or password.' });

    // Generate and send JWT token
    const token = user.generateAuthToken();
    res.status(200).json({ message: 'Login successful.', token });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Get User Profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.User._id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found.' });

    res.status(200).json({ message: 'User profile fetched successfully.', data: User });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Update User Profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    let user = await User.findById(req.User._id);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();
    res.status(200).json({ message: 'Profile updated successfully.', data: User });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
