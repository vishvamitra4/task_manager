const mongoose = require("mongoose");

const ToDo = new mongoose.Schema({
    text : {
        type : String,
        require : true
    },
    complete : {
        type : Boolean,
        default : false
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    }
} , {timestamps : true});

const toDo = mongoose.model("Todo" , ToDo);
module.exports = toDo;