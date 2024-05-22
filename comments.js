// Create web server
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/coments', (req, res) => {
    res.sendFile(path.join(__dirname, 'coments.html'));
});

app.post('/coments', (req, res) => {
    const { name, email, comment } = req.body;
    const data = `${name} (${email}): ${comment}\n`;

    fs.appendFile('coments.txt', data, (err) => {
        if (err) {
            res.status(500).send('Error');
            return;
        }
        res.status(200).send('OK');
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
}