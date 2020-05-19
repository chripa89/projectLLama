
import React, { Component, useState, useEffect } from 'react';
import { Route, Link, NavLink } from 'react-router-dom';

import Startseite from '../pages/startseite/Home';
import axios from 'axios';





class Login extends Component {

    constructor(props) {
        super(props);

        this.einLoggen = this.einLoggen.bind(this);
        this.handleChangeLogin = this.handleChangeLogin.bind(this);

        this.state = {
            userTest: 'blabla'
        }
    }



    handleChangeLogin = (event) => {
        this.setState({

            [event.target.id]: event.target.value,
        }
            , () => console.log('Login: ' + this.state.name + ' Passwort: ' + this.state.passwort
            ))
    }


    einLoggen(event) {
        event.preventDefault()
        console.log(this.state.userTest, 'UserTest');
        console.log(localStorage.getItem('User'), 'LocalStorage');

        const user = {

            username: this.state.username,
            passwort: this.state.backendpasswort,

        }

        // Umsetzung mit Search Query mal googlen

        axios.get('http://localhost:5000/users/', user)
            .then(response => {
                for (let i = 0; i < response.data.length; i++) {
                    console.log("SERVER: " + response.data[i].username + response.data[i].passwort);
                    console.log("CLIENT: " + this.state.name + this.state.passwort);
                    console.log(response.data[i]._id);

                    if (response.data[i].username === this.state.name && response.data[i].passwort === this.state.passwort) {
                        localStorage.setItem("User", response.data[i]._id)
                        this.setState({
                            userTest: response.data[i]._id
                        })
                    } else console.log("FAIL TO LOGIN");


                }

            })
            .catch(err => console.log(err)
            )

    }

    render() {
        return (
            <React.Fragment>



                {(localStorage.getItem('User') === this.state.userTest) ? // back button relogin fixen
                
                    <Startseite />

                    : (< form onSubmit={this.einLoggen} className="schub2 slideInLeft"  >

                        <h1>Project LLama</h1>
                        <h3>Fitness App</h3>

            Login - Name<br />
                        < input type="text" onChange={this.handleChangeLogin} placeholder="Login" id="name" />
                        <br />
            Passwort<br />
                        < input type="password" onChange={this.handleChangeLogin} placeholder="Passwort" id="passwort" />
                        <br />
                        <button    >Login</button>


                        <br />

                        <br />
                        <Link to="/reg">Registriere dich hier!</Link>

                    </form >)

                }

            </React.Fragment>
        );
    }
}

export default Login;


