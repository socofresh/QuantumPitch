const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');
const path = require('path'); // Import path module

// Initialize the app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like HTML, CSS) from the 'public' directory
app.use(express.static('public')); 

// Route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Configure the SQL connection
const config = {
    user: 'socofresh',  // Your SQL username
    password: 'S0c0fr3sh!2024', // Your password
    server: 'quantumpitchserver.database.windows.net', // Your server name
    database: 'QuantumPitchDB', // Your database name
    options: {
        encrypt: true, // Use encryption for Azure SQL databases
        trustServerCertificate: false, // Change to true if needed
    }
};

// Route to handle proposal form submissions
app.post('/submit-proposal', async (req, res) => {
    const { title, abstract } = req.body;
    try {
        const pool = await sql.connect(config);
        await pool.request()
            .input('Title', sql.NVarChar, title)
            .input('Abstract', sql.NVarChar, abstract)
            .input('Status', sql.NVarChar, 'Submitted')
            .query('INSERT INTO Proposals (Title, Abstract, Status) VALUES (@Title, @Abstract, @Status)');
        res.send('Proposal submitted successfully!');
    } catch (err) {
    console.error('Error details:', err);  // Log the specific error
    res.status(500).send('Error submitting proposal: ' + err.message);
}
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

