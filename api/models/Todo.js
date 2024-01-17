const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ToDoSchema = new Schema({
    text: {
        type: String,
        require: true,
    },
    complete: {
        type: Boolean,
        default: false,
    },
    timeStamp: {
        type: String,
        default: Date.now(),
    }
});

const Todo = mongoose.model("Todo", ToDoSchema);
module.exports = Todo;

