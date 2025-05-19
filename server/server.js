require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
pool.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к PostgreSQL:', err.stack);
  } else {
    console.log('Подключено к PostgreSQL');
  }
});

app.get('/api/products', async (req, res) => {
    try {
      const { category } = req.query;
      let queryText = 'SELECT * FROM products';
      let queryParams = [];
  
      if (category) {
        queryText += ' WHERE category = $1';
        queryParams.push(category);
      }
  
      const result = await pool.query(queryText, queryParams);
      res.json(result.rows);
    } catch (error) {
      console.error('DB error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email и пароль обязательны' });
    }
  
    try {
      const userExists = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );
  
      if (userExists.rows.length > 0) {
        return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
      }
  
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      const newUser = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, email',
        [name, email, hashedPassword]
      );
  
      res.status(201).json({
        message: 'Пользователь успешно зарегистрирован',
        user: newUser.rows[0]
      });
  
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});