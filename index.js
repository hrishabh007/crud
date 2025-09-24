const express = require('express');
const app = express();

//Middleware
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/show-contact', (req, res) => {
    res.render('show-contact');
});

app.get('/add-contact', (req, res) => {
    res.render('add-contact');
});

app.post('/add-contact', (req, res) => {

});

app.get('/edit-contact', (req, res) => {
    res.render('edit-contact');
});

app.post('/edit-contact', (req, res) => {

});

app.get('/delete-contact', (req, res) => {
    res.send('Contact Page');
});

app.listen(3000, () => console.log('Server is running on port 3000'));