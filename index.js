const express = require('express');
const exphbs = require('express-handlebars');
const homeRouter = require('./routes/home');
const addRouter = require('./routes/add');
const scootersRouter = require('./routes/scooters');
const app = express();



const hbs =exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views')

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use('/', homeRouter);
app.use('/add', addRouter);
app.use('/scooters', scootersRouter);

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is ranning on ${PORT}`)
})