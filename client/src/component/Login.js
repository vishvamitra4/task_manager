import React, { useState } from 'react';
import './Login.css'; // Import the CSS file for styling
import axios from 'axios';
import { UserContext } from '../userContext';

const Login = () => {

    const {user , setUser} = React.useContext(UserContext);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:4000/login", { ...formData });
            if (data.msg === "Failed" || data.msg === "Password is not correct..") {
                alert(data.msg);
            }else{
                alert("Login SuccessFull..");
                console.log(data);
                setUser(data);
            }
        } catch (err) {
            alert("Login Failed..")
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
