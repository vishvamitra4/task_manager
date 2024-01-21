const mongoose = require('mongoose');

const EmployeesSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
});

const EmployeeModel = mongoose.model("employees" , EmployeesSchema);
module.exports = EmployeeModel;
