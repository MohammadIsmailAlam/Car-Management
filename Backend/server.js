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


//Get all car list
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

// Create a new car
App.post('/createCar', (req, res) => {
    const { model, make, year, price, showroom_id } = req.body;

    if (!model || !make || !year || !price || !showroom_id) {
        console.error('Validation error: Missing fields');
        return res.status(400).json({ error: 'Please provide model, make, year, price, and showroom_id' });
    }

    const sql = "INSERT INTO car_list (model, make, year, price, showroom_id) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [model, make, year, price, showroom_id], (err, result) => {
        if (err) {
            console.error('Error inserting car:', err.message);
            return res.status(500).json({ error: err.message });
        }
        return res.status(201).json({ message: 'Car created successfully', carId: result.insertId });
    });
});

// Update an existing car
App.put('/updateCar/:id', (req, res) => {
    const { id } = req.params;
    const { model, make, year, price, showroom_id } = req.body;

    const sql = "UPDATE car_list SET model = ?, make = ?, year = ?, price = ?, showroom_id = ? WHERE id = ?";
    db.query(sql, [model, make, year, price, showroom_id, id], (err, result) => {
        if (err) {
            console.error('Error updating car:', err.message);
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({ message: 'Car updated successfully' });
    });
});

// Delete an existing car
App.delete('/deleteCar/:id', (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM car_list WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting car:', err.message);
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({ message: 'Car deleted successfully' });
    });
});


//Get all showroom list
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

// Create a new showroom
App.post('/createShowroom', (req, res) => {
    const { name, location, owner_id } = req.body;

    if (!name || !location || !owner_id) {
        console.error('Validation error: Missing fields');
        return res.status(400).json({ error: 'Please provide name, location, and owner_id' });
    }

    const sql = "INSERT INTO showroom_list (name, location, owner_id) VALUES (?, ?, ?)";
    db.query(sql, [name, location, owner_id], (err, result) => {
        if (err) {
            console.error('Error inserting showroom:', err.message);
            return res.status(500).json({ error: err.message });
        }
        return res.status(201).json({ message: 'Showroom created successfully', showroomId: result.insertId });
    });
});

// Update an existing showroom
App.put('/updateShowroom/:id', (req, res) => {
    const { id } = req.params;
    const { name, location, owner_id } = req.body;

    const sql = "UPDATE showroom_list SET name = ?, location = ?, owner_id = ? WHERE id = ?";
    db.query(sql, [name, location, owner_id, id], (err, result) => {
        if (err) {
            console.error('Error updating showroom:', err.message);
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({ message: 'Showroom updated successfully' });
    });
});

// Delete an existing showroom
App.delete('/deleteShowroom/:id', (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM showroom_list WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting showroom:', err.message);
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({ message: 'Showroom deleted successfully' });
    });
});

//Get all owner list
App.get('/ownerList', (req, res) => {
    const sql = "SELECT * FROM owner_list";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching showroom list:', err.message);
            return res.status(500).json({ error: err.message });
        }
        return res.json(data);
    });
});

// Create a new owner
App.post('/createOwner', (req, res) => {
    const { name, address, email, mobile_number } = req.body;

    if (!name || !address || !email || !mobile_number) {
        console.error('Validation error: Missing fields');
        return res.status(400).json({ error: 'Please provide name, address, email, and mobile_number' });
    }

    const sql = "INSERT INTO owner_list (name, address, email, mobile_number) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, address, email, mobile_number], (err, result) => {
        if (err) {
            console.error('Error inserting owner:', err.message);
            return res.status(500).json({ error: err.message });
        }
        return res.status(201).json({ message: 'Owner created successfully', ownerId: result.insertId });
    });
});

// Update an existing owner
App.put('/updateOwner/:id', (req, res) => {
    const { id } = req.params;
    const { name, address, email, mobile_number } = req.body;

    const sql = "UPDATE owner_list SET name = ?, address = ?, email = ?, mobile_number = ? WHERE id = ?";
    db.query(sql, [name, address, email, mobile_number, id], (err, result) => {
        if (err) {
            console.error('Error updating owner:', err.message);
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({ message: 'Owner updated successfully' });
    });
});

// Delete an existing owner
App.delete('/deleteOwner/:id', (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM owner_list WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting owner:', err.message);
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({ message: 'Owner deleted successfully' });
    });
});


//Get all customer list
App.get('/customerList', (req, res) => {
    const sql = "SELECT * FROM customer_list";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching showroom list:', err.message);
            return res.status(500).json({ error: err.message });
        }
        return res.json(data);
    });
});

// Create a new customer
App.post('/createCustomer', (req, res) => {
    const { name, password, address, email, mobile_number } = req.body;

    if (!name || !address || !email || !mobile_number) {
        console.error('Validation error: Missing fields');
        return res.status(400).json({ error: 'Please provide name, address, email, and mobile_number' });
    }

    const sql = "INSERT INTO customer_list (name, password, address, email, mobile_number) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [name, password, address, email, mobile_number], (err, result) => {
        if (err) {
            console.error('Error inserting customer:', err.message);
            return res.status(500).json({ error: err.message });
        }
        return res.status(201).json({ message: 'Customer created successfully', customerId: result.insertId });
    });
});

// Update an existing customer
App.put('/updateCustomer/:id', (req, res) => {
    const { id } = req.params;
    const { name, password, address, email, mobile_number } = req.body;

    const sql = "UPDATE customer_list SET name = ?, password = ?, address = ?, email = ?, mobile_number = ? WHERE id = ?";
    db.query(sql, [name, password, address, email, mobile_number, id], (err, result) => {
        if (err) {
            console.error('Error updating customer:', err.message);
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({ message: 'Customer updated successfully' });
    });
});

// Delete an existing customer
App.delete('/deleteCustomer/:id', (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM customer_list WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting customer:', err.message);
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({ message: 'Customer deleted successfully' });
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
