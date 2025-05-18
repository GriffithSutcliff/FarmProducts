require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});