const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const App = express();
App.use(cors());
App.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'car_management'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

App.get('/', (req, res) => {
    return res.json("From Backend Server");
});

App.get('/carList', (req, res) => {
    const sql = "SELECT * FROM car_list";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching car list:', err.message);
            return res.status(500).json({ error: err.message });
        }
        return res.json(data);
    });
});

App.get('/showRoomList', (req, res) => {
    const sql = "SELECT * FROM showroom_list";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching showroom list:', err.message);
            return res.status(500).json({ error: err.message });
        }
        return res.json(data);
    });
});

// New API to create a new user
App.post('/createUser', (req, res) => {
    const { name, password, address, email, mobile_number } = req.body;

    if (!name || !address || !email || !mobile_number) {
        console.error('Validation error: Missing fields');
        return res.status(400).json({ error: 'Please provide name, address, email, and mobile_number' });
    }

    const sql = "INSERT INTO customer_list (name, password, address, email, mobile_number) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [name, password, address, email, mobile_number], (err, result) => {
        if (err) {
            console.error('Error inserting user:', err.message);
            return res.status(500).json({ error: err.message });
        }
        return res.status(201).json({ message: 'User created successfully', userId: result.insertId });
    });
});

// New API to login user
App.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        console.error('Validation error: Missing fields');
        return res.status(400).json({ error: 'Please provide email and password' });
    }

    const sql = "SELECT * FROM customer_list WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error('Error fetching user:', err.message);
            return res.status(500).json({ error: err.message });
        }
        if (result.length > 0) {
            return res.status(200).json({ message: 'Login successful', user: result[0] });
        } else {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    });
});



App.listen(8081, () => {
    console.log("Server is listening on port 8081");
});
