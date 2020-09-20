const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const csurf = require('csurf');
const exphbs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const homeRouter = require('./routes/home');
const addRouter = require('./routes/add');
const scootersRouter = require('./routes/scooters');
const shopcartRouter = require('./routes/shopcart');
const orderRouter = require('./routes/order');
const authRouter = require('./routes/auth');
const costomMiddleware = require('./middleware/variables');
const userMIddleware = require('./middleware/user-middleware');
const MONGODB_URL = 'mongodb+srv://Andrew:arF5vQFnnT12KkLT@cluster0.yrthm.mongodb.net/store';
const app = express();


const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
});

const store = new MongoStore({
    collection: 'sessions',
    uri: MONGODB_URL

})
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store
}));
app.use(csurf());
app.use(costomMiddleware);
app.use(userMIddleware);

app.use('/', homeRouter);
app.use('/add', addRouter);
app.use('/scooters', scootersRouter);
app.use('/shopcart', shopcartRouter);
app.use('/order', orderRouter);
app.use('/auth', authRouter);

const PORT = process.env.PORT || 3000

async function start() {
    try {
    
        await mongoose.connect(MONGODB_URL, {
            useNewUrlParser: true,
            useFindAndModify: false
        });

        app.listen(PORT, () => {
            console.log(`Server is ranning on ${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }

}

start()