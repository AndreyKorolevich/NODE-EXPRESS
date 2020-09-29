const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const csurf = require('csurf');
const flash = require('connect-flash');
const exphbs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const homeRouter = require('./routes/home');
const addRouter = require('./routes/add');
const scootersRouter = require('./routes/scooters');
const shopcartRouter = require('./routes/shopcart');
const orderRouter = require('./routes/order');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const costomMiddleware = require('./middleware/variables');
const userMIddleware = require('./middleware/user-middleware');
const error = require('./middleware/error');
const fileMiddleware = require('./middleware/file-middleware');
const keys = require('./keys/keys');
const app = express();


const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
});

const store = new MongoStore({
    collection: 'sessions',
    uri: keys.MONGODB_URL

})
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: keys.SECRET,
    resave: false,
    saveUninitialized: false,
    store
}));

app.use(fileMiddleware.single('avatar'));
app.use(csurf());
app.use(flash());
app.use(costomMiddleware);
app.use(userMIddleware);

app.use('/', homeRouter);
app.use('/add', addRouter);
app.use('/scooters', scootersRouter);
app.use('/shopcart', shopcartRouter);
app.use('/order', orderRouter);
app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.use(error);
const PORT = process.env.PORT || 3000

async function start() {
    try {  
        await mongoose.connect(keys.MONGODB_URL, {
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