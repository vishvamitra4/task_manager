const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/Employees');


const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/taskmanager').then(() => console.log("DataBase is Connectd!"));

// middle ware for the server..
app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json('Success');
                } else {
                    res.json('password is incorrect');
                }
            } else {
                res.json("No Such record exist!");
            }
        });
})

app.post('/register', (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    newUser.save();
    res.json(newUser);
})




app.listen(4000, () => console.log("Server is Listening on 4000!"));