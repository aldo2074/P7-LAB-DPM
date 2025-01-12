const User = require('../models/User');
const { generateToken } = require('../config/jwt');

const register = async (req, res) => {
    const { username, email, password } = req.body;
  
    // Validasi input
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      // Periksa apakah email atau username sudah digunakan
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return res.status(400).json({ message: 'Email or username already in use' });
      }
  
      // Simpan pengguna baru
      const user = new User({ username, email, password });
      await user.save();
  
      // Buat token
      const token = generateToken(user);
  
      res.status(201).json({
        message: 'User registered successfully',
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
const login = async (req, res) => {
    const { username, password } = req.body;
  
    // Validasi input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
  
    try {
      // Cari pengguna berdasarkan username
      const user = await User.findOne({ username });
      if (user && (await user.matchPassword(password))) {
        // Buat token
        const token = generateToken(user);
  
        res.json({
          message: 'Login successful',
          token,
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
          },
        });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
module.exports = { register, login };
