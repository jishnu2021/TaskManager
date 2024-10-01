const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Number, required: true, default: 1 }, // 0 for user, 1 for admin
}, { timestamps: true, collection: 'admin' });

// Hash password before saving admin
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to generate JWT token
adminSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: this.role },
    'your_jwt_secret_key', // Replace with a real secret key
    { expiresIn: '1h' }
  );
  return token;
};

module.exports = mongoose.model('Admin', adminSchema);
