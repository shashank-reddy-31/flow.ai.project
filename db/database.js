// db/database.js  
const sqlite3 = require('sqlite3').verbose();  
const path = require('path');  

const db = new sqlite3.Database(path.join(__dirname, 'financial_tracker.db'), (err) => {  
    if (err) {  
        console.error('Error opening database ' + err.message);  
    } else {  
        console.log('Connected to the financial_tracker database.');  
        db.run(`CREATE TABLE IF NOT EXISTS categories (  
            id INTEGER PRIMARY KEY AUTOINCREMENT,  
            name TEXT NOT NULL,  
            type TEXT NOT NULL 
        );`);  
        db.run(`CREATE TABLE IF NOT EXISTS transactions (  
            id INTEGER PRIMARY KEY AUTOINCREMENT,  
            type TEXT NOT NULL,  
            category TEXT NOT NULL,  
            amount REAL NOT NULL,  
            date TEXT NOT NULL,  
            description TEXT  
        );`);  
    }  
});  

module.exports = db;