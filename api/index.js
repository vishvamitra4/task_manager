const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();

// here is our middleWares..
app.use(express.json());
app.use(cors());


/// connecting the server with database..
mongoose.connect('mongodb://127.0.0.1:27017/mern-todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to to_do DB")).catch((err) => console.log(err));


// requiring our collection from Schema...
const Todo = require('./models/Todo');


app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.post('/todo/new', async (req, res) => {
    const todo = new Todo(
        {
            text: req.body.text
        }
    );
    todo.save();
    res.json(todo);
})

app.delete('/todo/delete/:id', async (req, res) => {
    try {

        const result = await Todo.findByIdAndDelete(req.params.id);
        if (result) {
            res.json({ message: "Item get deleted!", result });
        } else {
            res.status(400).json({ message: "Item is not found!" });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error!" });
    }
});

app.put('/todo/complete/:id', async (req, res) => {
    try {
        const result = await Todo.findById(req.params.id);
        if (result) {
            result.complete = !result.complete;
            result.save();
            res.json(result);
        } else {
            res.status(400).json({ msg: "ID not found!" });
        }
    } catch (err) {
        res.status(500).json({ mag: "Some Server Error!" });
    }
})




app.listen(3001, () => {
    console.log("Server Started on 30001!");
});