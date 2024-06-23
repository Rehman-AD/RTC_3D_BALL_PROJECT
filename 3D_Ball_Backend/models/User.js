const db = require('../config/DB');
const bcrypt = require('bcryptjs');

class User {
  static async create(user) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const [result] = await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [user.username, hashedPassword]);
    return result.insertId;
  }

  static async findByUsername(username) {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
  }
}

module.exports = User;
