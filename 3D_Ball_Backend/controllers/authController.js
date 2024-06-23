const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;
    console.log("username:", username, "password:",password);

    const userId = await User.create({ username, password });
    console.log("userid:", userId);
    res.status(201).json({ userId });
  } catch (error) {
    console.log("error message:",error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    console.log("request body: ",req.body);
    const { username, password } = req.body;
    
    console.log("login page found");
    console.log("username: ",username,"password: ",password)
    
    const user = await User.findByUsername(username);

    console.log("user found:",user);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
    
  }
};
