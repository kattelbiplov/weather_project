const User = require('../models/User');


const addToFavorites = async (req, res) => {
  const userId = req.session.userId; 
  
  const { city } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.addFavoriteCity(city);

    res.status(201).json({ message: 'City added to favorites successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { addToFavorites };
