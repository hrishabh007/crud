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
    const contact = await Contact.findOne({_id: req.params.id});
    // res.json(contact);
    res.render('show-contact', {contact: contact});
});

app.get('/add-contact', (req, res) => {

    res.render('add-contact');
});

app.post('/add-contact', async (req, res) => {
    //First way

    // const contact = await Contact.insertOne({
    //     first_name: req.body.first_name,
    //     last_name: req.body.last_name,
    //     email: req.body.email,
    //     phone: req.body.phone,
    //     address: req.body.address,
    // })

    //Second Way
    await Contact.create(req.body);
    res.redirect('/');
});

// EDIT (show form)
app.get('/update-contact/:id', async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).send('Contact not found');
    res.render('update-contact', {contact});
});

// EDIT (submit form)
app.post('/update-contact/:id', async (req, res) => {
    const {first_name, last_name, email, phone, address} = req.body;
    await Contact.findByIdAndUpdate(req.params.id, {
        first_name,
        last_name,
        email,
        phone,
        address
    }, {runValidators: true});
    //  await Contact.findByIdAndUpdate(req.params.id, req.body, {runValidators: true});
    res.redirect('/');
});

app.get('/delete-contact/:id', async (req, res) => {
    await Contact.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

app.listen(3000, () => console.log('Server is running on port 3000'));