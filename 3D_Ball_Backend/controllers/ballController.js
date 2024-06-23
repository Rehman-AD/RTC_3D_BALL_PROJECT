const Ball = require('../models/ball');

exports.getAllPositions = async (req, res) => {
  try {
    const positions = await Ball.getAllPositions();
    console.log("positions",positions);
    res.json(positions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.savePosition = async (req, res) => {
  try {
    const { x, y, z } = req.body;
    const result = await Ball.savePosition(x, y, z);
    res.status(201).json({ success: true, message: 'Position saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
