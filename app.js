const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/contactDance', {useNewUrlParser: true});
const port = 80;
app.use(express.urlencoded({extended: true}));

// Defining Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    age: String,
    concern: String,
    address: String
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;

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

app.post('/contact', (req, res) => {
    const myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("Your Concern Has Been Successfully Submitted");
    }).catch(() => {
        res.status(404).send("Error Encountred");
    });
})


// START THE SERVER
app.listen(port, () => {
    console.log(`Application Started Successfully at Port: ${port}`);
})
