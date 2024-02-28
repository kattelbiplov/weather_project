const bcrypt = require('bcrypt');
const User = require('../models/User');
const session = require('express-session');
const RedisStore = require('connect-redis').default;

// session middleware of redis
const setupSessionMiddleware = () => {
  return session({
    store: new RedisStore({ url: 'redis://localhost:6379' }), 
    secret: 'secret_key', 
    resave: false,
    saveUninitialized: true,
  });
};

const registerUser = async (req, res) => {
  const { email, password, country, state, city, latitude, longitude } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      country,
      state,
      city,
      latitude,
      longitude,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'User not registered' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
  req.session.user = user;
    res.json({ message: 'Login successful', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports={registerUser,loginUser}