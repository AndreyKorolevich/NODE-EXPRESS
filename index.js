const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const exphbs = require('express-handlebars');
const homeRouter = require('./routes/home');
const addRouter = require('./routes/add');
const scootersRouter = require('./routes/scooters');
const shopcartRouter = require('./routes/shopcart');
const orderRouter = require('./routes/order');
const authRouter = require('./routes/auth');
const app = express();
const User = require('./model/user-model')

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
})
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.set('views', 'views');
app.use(async (req, res, next) => {
    try {
        const user = await User.findById('5f5310c1b85ee22200059ec0');
        req.user = user;
        next();
    } catch (err) {
        console.log(err)
    }

})

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use('/', homeRouter);
app.use('/add', addRouter);
app.use('/scooters', scootersRouter);
app.use('/shopcart', shopcartRouter);
app.use('/order', orderRouter);
app.use('/auth', authRouter);

const PORT = process.env.PORT || 3000

async function start() {
    try {
        const url = 'mongodb+srv://Andrew:arF5vQFnnT12KkLT@cluster0.yrthm.mongodb.net/store';
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useFindAndModify: false
        });

        let newUser = await User.findOne();
        if (!newUser) {
            newUser = new User({
                email: 'pop@mail.ru',
                name: 'lop',
                shopCart: { elements: [] }
            })
            await newUser.save();
        }
        app.listen(PORT, () => {
            console.log(`Server is ranning on ${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }

}

start()