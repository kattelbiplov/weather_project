const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const recentSearchRoutes = require('./routes/recentSearchRoutes');
const favouriteRoutes = require('./routes/favouriteRoutes');
const cors = require('cors');
const redis = require('redis');
const redisClient = redis.createClient();
const session = require('express-session');
const RedisStore = require('connect-redis').default;

  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(cors());
  app.use(bodyParser.json());

 
    redisClient.on('connect', () => {
      console.log('Connected to Redis server');
      resolve();
    });

    redisClient.on('error', (err) => {
      console.error('Error connecting to Redis server:', err);
      reject(err);
    });

  app.use(session({
    secret: 'secret_key',
    store: new RedisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: true
  }));

  app.use('/auth', authRoutes);
  app.use('/api', weatherRoutes);
  app.use('/api', recentSearchRoutes);
  app.use('/api', favouriteRoutes);

  sequelize.sync().then(() => {
    console.log('Database synced!');
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });


