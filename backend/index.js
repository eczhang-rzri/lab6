const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'database-1.cnqe00p5d1ax.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Timndbpw10!',
  database: 'emilydb',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database!');
});

app.get('/api/employees', (req, res) => {
  db.query('SELECT * FROM employees', (err, results) => {
    if (err) {
      console.error("Error fetching employees:", err);
      res.status(500).json({ error: 'Failed to fetch employees' });
    } else {
      res.json(results);
    }
  });
});

app.post('/api/employees', (req, res) => {
  const newEmployee = req.body;
  db.query('INSERT INTO employees SET ?', newEmployee, (err, results) => {
    if (err) {
      console.error("Error adding employee:", err);
      res.status(500).json({ error: 'Failed to add employee' });
    } else {
      // Use employee_id here:
      db.query('SELECT * FROM employees WHERE employee_id = ?', results.insertId, (err, employeeResults) => {
        if (err) {
          console.error("Error fetching added employee:", err);
          res.status(500).json({ error: 'Failed to fetch added employee' });
        } else {
          res.status(201).json(employeeResults[0]);
        }
      });
    }
  });
});

app.put('/api/employees/:id', (req, res) => {
  const employeeId = req.params.id;
  const updatedEmployee = req.body;

  // Use employee_id in the WHERE clause:
  db.query('UPDATE employees SET ? WHERE employee_id = ?', [updatedEmployee, employeeId], (err, results) => {
    if (err) {
      console.error("Error updating employee:", err);
      res.status(500).json({ error: 'Failed to update employee' });
    } else {
      db.query('SELECT * FROM employees WHERE employee_id = ?', employeeId, (err, employeeResults) => {
        if (err) {
          console.error("Error fetching updated employee:", err);
          res.status(500).json({ error: 'Failed to fetch updated employee' });
        } else {
          res.json(employeeResults[0]);
        }
      });
    }
  });
});

app.delete('/api/employees/:id', (req, res) => {
    const employeeId = req.params.id;
    console.log("Deleting employee with employeeId (from params):", employeeId); // Check the value from the URL
  
    db.query('DELETE FROM employees WHERE employee_id = ?', employeeId, (err, results) => {
      if (err) {
        console.error("Error deleting employee (in database):", err);
        res.status(500).json({ error: 'Failed to delete employee' });
      } else {
        console.log("Delete query results:", results);  // Check the results of the query
        res.status(204).end();
      }
    });
  });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});