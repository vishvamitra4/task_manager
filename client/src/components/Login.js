import { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';



function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/login', { email, password })
            .then((result) => {
                console.log(result);
                if (result.data === "Success") {
                    navigate('/');
                };
            }).catch(err => console.log(err));
    };




    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div class="container">
                    <h1>Login</h1>
                    <p>Please Fill the Form to get Login</p>
                    <hr />

                    <label for="email"><b>Email</b></label>
                    <input
                        type="text"
                        placeholder="Enter Email"
                        name="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label for="psw"><b>Password</b></label>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        name="psw"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />




                    <div class="clearfix">
                        <button type="submit" class="cancelbtn">Login</button>
                        <button type="button" class="signupbtn"><Link to='/register'>Sign Up</Link></button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;