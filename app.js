const express = require('express');
const path = require('path');
const app = express();
const port = 80;

// EXPRESS SPECIFIC CONFIGURATIONS
app.use('/static', express.static('static'));   // for serving static files


// PUG SPECIFIC CONFIGURATIONS
app.set('view engine', 'pug');  // setting the template engine as 'pug'
app.set('views', path.join(__dirname, 'templates'));    // setting the views directory


// ENDPOINTS
app.get('/', (req, res) => {
    const params = {};
    res.status(200).render('home.pug', params);
})

app.get('/home', (req, res) => {
    res.status(200).render('home.pug');
})

app.get('/contact', (req, res) => {
    res.status(200).render('contact.pug');
})


// START THE SERVER
app.listen(port, () => {
    console.log(`Application Started Successfully at Port: ${port}`);
})
