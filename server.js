import express from 'express';
import multer from 'multer';
import { createConnection } from 'mysql';
import { readFile, utils } from 'xlsx';

const app = express();
const upload = multer({ dest: 'uploads/' }); // Set the destination folder for uploaded files

// Database configuration
const dbConfig = {
    host: 'http://ec2-122-248-214-86.ap-southeast-1.compute.amazonaws.com',
    user: 'root',
    password: '12345',
    database: 'mysql'
};
const connection = createConnection(dbConfig);

// Establish database connection
connection.connect(err => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

// Handle the file upload
app.post('/upload', upload.single('excelFile'), (req, res) => {
    const file = req.file;
    if (!file) {
        res.status(400).send('No file uploaded');
        return;
    }

    // Read the uploaded file
    const workbook = readFile(file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Extract data from the worksheet (assuming the Excel file has a single sheet)
    const data = utils.sheet_to_json(worksheet, { header: 1 });

    // Insert the data into the database
    const sql = 'INSERT INTO your_table (column1, column2, column3) VALUES ?';
    connection.query(sql, [data.slice(1)], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error inserting data into the database');
            return;
        }
        res.send('File uploaded and data inserted');
    });
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
