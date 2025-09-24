const express = require('express');
const app = express();
const mongoose = require('mongoose');

//Database connection
mongoose.connect('mongodb://127.0.0.1:27017/contact-crud')
    .then(() => {
        console.log('Mongo DB Connected!');
    })
const Contact = require('./models/contacts.model');


//Middleware
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

app.get('/', async (req, res) => {
    const contacts = await Contact.find()
    res.render('home', {contacts: contacts});


});

app.get('/show-contact/:id', async (req, res) => {
    const contact=await Contact.findOne({_id: req.params.id});
   // res.json(contact);
    res.render('show-contact', {contact: contact});
});

app.get('/add-contact', (req, res) => {
    res.render('add-contact');
});

app.post('/add-contact', (req, res) => {

});

app.get('/edit-contact:id', (req, res) => {
    res.render('edit-contact');
});

app.post('/edit-contact:id', (req, res) => {

});

app.get('/delete-contact:id', (req, res) => {
    res.send('Contact Page');
});

app.listen(3000, () => console.log('Server is running on port 3000'));