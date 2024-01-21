import { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';




function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        axios.post('http://localhost:4000/register', {
            name: name,
            email: email,
            password: password
        }).then(res => {
            console.log(res);
            navigate('/login')
        })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div class="container">
                    <h1>Sign Up</h1>
                    <p>Please fill in this form to create an account.</p>
                    <hr />

                    <label for="psw-repeat"><b>Enter Name</b></label>
                    <input
                        type="text"
                        placeholder="Full Name"
                        name="psw-repeat"
                        required
                        onChange={(e) => setName(e.target.value)}
                    />

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




                    <p>By creating an account you agree to our <a href="#" style={{ "color": "dodgerblue" }}>Terms & Privacy</a>.</p>

                    <div class="clearfix">
                        <button type="button" class="cancelbtn"><Link to='/login'>Login</Link></button>
                        <button type="submit" class="signupbtn">Sign Up</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Register;