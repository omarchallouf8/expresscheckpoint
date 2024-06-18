// server.js
const express = require('express');
const moment = require('moment');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to verify the time of the request
const verifyTime = (req, res, next) => {
    const currentHour = moment().hour();
    if (currentHour >= 9 && currentHour <= 17) {
        next();
    } else {
        res.send('<h1>Sorry, we are closed. Please visit us between 9 AM and 5 PM.</h1>');
    }
};

// Use the custom middleware
app.use(verifyTime);

// Serve static files (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Set up EJS as the template engine
app.set('view engine', 'ejs');

// Define routes
app.get('/', (req, res) => {
    res.render('index', { message: 'Hello Node!!!!' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
