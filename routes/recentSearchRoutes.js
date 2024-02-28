const express = require('express');
const router = express.Router();
const RecentSearch = require('../models/RecentSearch');


router.post('/recent-searches', async (req, res) => {
  const { userId, country, state, city } = req.body;

  try {
    await RecentSearch.create({ userId, country, state, city, timestamp: new Date() });
    res.status(201).json({ message: 'Recent search stored successfully' });
  } catch (error) {
    console.error('Error storing recent search:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/recent-searches/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const recentSearches = await RecentSearch.findAll({
      where: { userId },
      order: [['timestamp', 'DESC']],
      limit: 5
    });
    res.json(recentSearches);
  } catch (error) {
    console.error('Error retrieving recent searches:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;