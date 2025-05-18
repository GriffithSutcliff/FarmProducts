import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import pool from './db.js';

const app = express();

app.use(express.static(path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'dist/client'), { index: false }));

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

app.use('*', async (_, res) => {
  try {
    const template = fs.readFileSync('./dist/client/index.html', 'utf-8');
    const { render } = await import('./dist/server/entry-server.js');

    const html = template.replace(`<!--outlet-->`, render);
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (error) {
    res.status(500).end(error);
  }
});

app.listen(5173, () => {
  console.log('http://localhost:5173.');
});
