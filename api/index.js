const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User.js');
const Todo = require('./models/Todo.js');
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const jwtSecret = "gfhrntnfhrjdr232l3kvljl4j24l22";
const cookieParser = require("cookie-parser");

const app = express();
// to parse incoming request body in json format...
app.use(express.json());
// for allowing explicitily for cross origin request...
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(cookieParser());


// connecting with database....
mongoose.connect("mongodb://localhost:27017/taskmanager");

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/register", async (req, res) => {
    const { userName, email, password } = req.body;
    res.json({
        userName, email,
        password: bcrypt.hashSync(password, salt)
    })
    try{
        const userdoc = await User.create({
            userName, email,
            password: bcrypt.hashSync(password, salt)
        });
        res.send(userdoc);
    }catch(e){
        res.json({msg : "Email Already Exist!"});
    }
})


app.post("/login" , async(req , res) =>{
    const {email , password} = req.body;
    const userDoc = await User.findOne({email});

    if(userDoc){
        const passOk = bcrypt.compareSync(password , userDoc.password);
        if(passOk){
            try{
                jwt.sign({email , password} , jwtSecret , {} , (err , token)=>{
                    if(err) throw err;
                    res.cookie('token' , token).json(userDoc);
                })
            }catch(e){
                res.json(e);
            }
        }else{
            res.json({msg : "Password is not correct.."});
        }
    }else{
        res.json({msg : "Failed"});
    }
});


app.get("/profile" , (req, res)=>{
    const {token} = req.cookies;

    if(token){
        try{
            jwt.verify(token , jwtSecret , {} , async (err , user)=>{
                if(err) throw err;
                const {email} = user;
                const userDoc = await User.findOne({email});
                res.json(userDoc);
            })
        }catch(e){
            res.json("Something went Wrong...");
        }
    }else{
        res.json(null);
    }
});


app.post("/logout" , (req , res)=>{
    res.cookie('token' , '').json(true);
});

/// add a todo for a particular person...
app.post("/new/todo" , async (req , res)=>{
    const {user , text} = req.body;
    const userDoc = await Todo.create({
        text : text,
        complete : false,
        createdBy : user._id
    });

    res.json(userDoc);
});

/// getting all the todos...
app.get("/todo" , async (req , res)=>{
    const {token} = req.cookies;
    
    if(token)
    {
        try{
            jwt.verify(token , jwtSecret , {} , async(err , user)=>{
                if(err) throw err;
                const {email} = user;
                const userDoc = await User.findOne({email});
                const {_id} = userDoc;
                const userData = await Todo.find({createdBy : _id});
                res.json(userData);
                
            })
        }catch(e){
            res.json(e);
        }
    }
    else{
        res.json([]);
    }
});



app.put("/todo/complete/:id" , async(req , res)=> {
    try{
        const userDoc = await Todo.findOne({_id : req.params.id});
        userDoc.complete = !userDoc.complete;
        userDoc.save();
        res.json(userDoc);
    }catch(e){
        res.json("Not okay");
    }
});


app.delete("/todo/delete/:id" , async (req , res)=>{
    const id = req.params.id;
    try{
        const userDoc = await Todo.findOne({_id : id});
        const userDeleted = await Todo.deleteOne({_id : id});
        res.json(userDoc);
    }catch(e){
        res.json({msg : "not okay!"});
    };
})




app.listen(4000, () => {
    console.log("Server is listening on 4000..");
})
