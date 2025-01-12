const User = require('../models/User');

// Fungsi untuk mendapatkan profil pengguna
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ data: user });
  } catch (error) {
    console.error('Error fetching profile:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const handleLogout = async (req, res) => {
  try {
    res.status(200).json({ 
      status: 'success',
      message: 'Logout successful' 
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ 
      status: 'error',
      message: 'Failed to logout' 
    });
  }
};

module.exports = { getProfile,handleLogout};
