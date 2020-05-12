import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';

function RegApp() {
    const [user, setUser] = useState({

        username: '',
        passwort: '',
        confirmPassword: '',
        alter: 0,
        groesse: 0,
        gewicht: 0,
        geschlecht: 'undefined'
        
    });

    const [submitted, setSubmitted] = useState(false);
    const [createdUser, setCreatedUser] = useState(false);

    // reset login status
    useEffect(() => {
        console.log("INIT: ", user);
 
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
        console.log("CHANGES: ", user);


    }

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
    setCreatedUser(true);
        console.log(typeof user);
        


        if( user.confirmPassword && user.passwort)
        {
        axios.post('http://localhost:5000/users/reg', user)
            .then(res => console.log(res.data));


        console.log("User Added: ", user);

    }
    }

    return (


        (createdUser === false)
        ?

        <div className="registerForm">
            <h2>Register</h2>
            <form name="form" onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="username" value={user.username} onChange={handleChange} className={'form-control' + (!user.username ? ' is-invalid' : '')} />
                    {submitted && !user.username &&
                        <div className="invalid-feedback">Username is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="passwort" value={user.passwort} onChange={handleChange} className={'form-control' + (!user.passwort ? ' is-invalid' : '')} />
                    {submitted && !user.passwort &&
                        <div className="invalid-feedback">Password is required</div>
                    }
                </div>
                 <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" name="confirmPassword" value={user.confirmPassword} onChange={handleChange} className={'form-control' + ( !user.confirmPassword ? ' is-invalid' : '')} />
                    { submitted && user.password !== user.confirmPassword &&
                        <div className="invalid-feedback">Password doesn't match</div>
                    }
                </div>
          
                <div className="form-group">
                    <button className="btn btn-primary">

                        Register
                    </button>
                    <Link to="/" className="btn btn-link">Cancel</Link>
                </div>
            </form>
        </div>
        : <Login />
    );
}

export default RegApp;


