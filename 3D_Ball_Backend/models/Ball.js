const db = require('../config/DB');

class Ball {
  static async getAllPositions() {
    const [rows] = await db.query('SELECT * FROM positions WHERE id = (SELECT MAX(id) FROM positions)');
    return rows;
  }

  static async savePosition(x, y, z) {
    const result = await db.query('INSERT INTO positions (x, y, z) VALUES (?, ?, ?)', [x, y, z]);
    return result;
  }
}

module.exports = Ball;
