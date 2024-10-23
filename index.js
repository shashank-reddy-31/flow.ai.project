// index.js  
const express = require('express');  
const bodyParser = require('body-parser');  
const db = require('./db/database');  

const app = express();  
const PORT = process.env.PORT || 3000;  

app.use(bodyParser.json());  

// Basic route for testing  
app.get('/', (req, res) => {  
    res.send('Welcome to the Financial Tracker API!');  
});

// index.js continued...  

// POST /transactions  
app.post('/transactions', (req, res) => {  
    const { type, category, amount, date, description } = req.body;  
    db.run(`INSERT INTO transactions (type, category, amount, date, description) VALUES (?, ?, ?, ?, ?)`,  
        [type, category, amount, date, description], function (err) {  
            if (err) {  
                return res.status(400).json({ error: err.message });  
            }  
            res.status(201).json({ id: this.lastID });  
        }  
    );  
});  

// GET /transactions  
app.get('/transactions', (req, res) => {  
    db.all(`SELECT * FROM transactions`, [], (err, rows) => {  
        if (err) {  
            return res.status(400).json({ error: err.message });  
        }  
        res.json(rows);  
    });  
});  

// GET /transactions/:id  
app.get('/transactions/:id', (req, res) => {  
    const { id } = req.params;  
    db.get(`SELECT * FROM transactions WHERE id = ?`, [id], (err, row) => {  
        if (err) {  
            return res.status(400).json({ error: err.message });  
        }  
        res.json(row);  
    });  
});  

// PUT /transactions/:id  
app.put('/transactions/:id', (req, res) => {  
    const { id } = req.params;  
    const { type, category, amount, date, description } = req.body;  

    db.run(`UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ? WHERE id = ?`,  
        [type, category, amount, date, description, id], function (err) {  
            if (err) {  
                return res.status(400).json({ error: err.message });  
            }  
            res.json({ updatedID: id });  
        }  
    );  
});  

// DELETE /transactions/:id  
app.delete('/transactions/:id', (req, res) => {  
    const { id } = req.params;  
    db.run(`DELETE FROM transactions WHERE id = ?`, id, function (err) {  
        if (err) {  
            return res.status(400).json({ error: err.message });  
        }  
        res.json({ deletedID: id });  
    });  
});  

// GET /summary  
app.get('/summary', (req, res) => {  
    db.all(`SELECT type, SUM(amount) as total FROM transactions GROUP BY type`, [], (err, rows) => {  
        if (err) {  
            return res.status(400).json({ error: err.message });  
        }  
        res.json(rows);  
    });  
});  

// Starting the server 
app.listen(PORT, () => {  
    console.log(`Server is running on port ${PORT}`);  
});