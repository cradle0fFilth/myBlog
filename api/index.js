const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose")
const User = require('./models/User')
const bcrypt = require('bcryptjs')
const app = express();
const jwt = require('jsonwebtoken');
const cookiePasrser = require('cookie-parser');

const salt = bcrypt.genSaltSync(10);
const secret = "hiqhwiqwoqkwpq"

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookiePasrser());

const url = 'mongodb+srv://sunkist:V4kpGX3HoarCBkre@myblog.qmj5u6p.mongodb.net/?retryWrites=true&w=majority'

async function connect() {
    try {
        await mongoose.connect(url);
        console.log("connected to db")
    } catch (err) {
        console.log("error connecting to db")
        console.log(err)
    }
}
connect();

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt)
        });
        res.json(userDoc);

    } catch (err) {
        res.status(400).json(err);
    }
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });
    bcrypt.compare(password, userDoc.password, (err, result) => {
        if (result) {
            jwt.sign({ username, id: userDoc }, secret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json({
                    id:userDoc._id,
                    username:userDoc.username
                });
            })
        } else {
            res.status(400).json('wrong credentials');
        }
    });
})

app.get('/profile', async (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {},(err, info) => {
        if(err)throw err;
        res.json(info);
    })
})
app.post('/logout', (req, res) => {
    //res.status(200).json('ok');
    res.cookie('token','').json('ok');
})

app.listen(4000);
//V4kpGX3HoarCBkre

// mongodb+srv://blog:c98E7qKCzUgZ1Gmj@cluster0.ctuzl5r.mongodb.net/?retryWrites=true&w=majority