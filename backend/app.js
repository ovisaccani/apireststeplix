const express = require('express');
const mysql = require('mysql');

const PORT = 3050;

const app = express();

app.use(express.json()); 

// MySql
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'ovisaccani',
  password: 'sqlroot123',
  database: 'tpDocker'
});

// Route
app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

// all currencies
app.get('/currencies', (req, res) => {
  const sql = 'SELECT * FROM currencies';

  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send('Not result');
    }
  });
});

app.get('/rates', (req, res) => {
  const sql = 'SELECT * FROM rates INNER JOIN currencies ON rates.id_currency = currencies.id ';

  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send('Not result');
    }
  });
});

app.get('/rates/:symbol', (req, res) => {
  const { symbol } = req.params;
  const sql = `SELECT * FROM rates INNER JOIN currencies ON rates.id_currency = currencies.id WHERE currencies.symbol = '${symbol}'`;

  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send('Not result');
    }
  });
});

app.post('/rates/', (req, res) => {
  const { id_currency } = req.body;
  const { value } = req.body;
  const sql = `UPDATE rates SET value = ${value} WHERE id_currency = ${id_currency}`;

  connection.query(sql, error => {
    if (error) throw error;
    res.send('Customer updated!');
  });
});


// Check connect
 connection.connect(error => {
  if (error) throw error;
  console.log('Database server running!');
}); 

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));