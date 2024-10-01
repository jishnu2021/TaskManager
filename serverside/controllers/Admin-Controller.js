const Admin = require('../modals/AdminSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register Admin
exports.registerAdmin = async (req, res) => {
  try {
    let admin = await Admin.findOne({ email: req.body.email });
    if (admin) return res.status(400).json({ message: 'Admin already registered.' });

    admin = new Admin({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: 1 // Admin role
    });

    await admin.save();
    const token = admin.generateAuthToken();
    res.header('x-auth-token', token).status(201).json({
      message: 'Admin registered successfully.',
      data: { _id: admin._id, name: admin.name, email: admin.email },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Login Admin
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin exists
    let admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: 'Invalid email or password.' });

    // Compare hashed password
    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid email or password.' });

    // Generate and send JWT token
    const token = admin.generateAuthToken();
    res.status(200).json({ message: 'Login successful.', token });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Get Admin Profile
exports.getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select('-password');
    if (!admin) return res.status(404).json({ message: 'Admin not found.' });

    res.status(200).json({ message: 'Admin profile fetched successfully.', data: admin });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Update Admin Profile
exports.updateAdminProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    let admin = await Admin.findById(req.admin._id);
    if (!admin) return res.status(404).json({ message: 'Admin not found.' });

    admin.name = name || admin.name;
    admin.email = email || admin.email;

    await admin.save();
    res.status(200).json({ message: 'Profile updated successfully.', data: admin });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Delete Admin
exports.deleteAdmin = async (req, res) => {
  try {
    let admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).json({ message: 'Admin not found.' });

    await Admin.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Admin deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
