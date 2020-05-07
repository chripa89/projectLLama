
import React, { Component } from 'react';
import {  Route, Link, NavLink } from 'react-router-dom';
import Home from '../pages/startseite/Home';
import Ernaehrungstartseite from '../pages/ernaehrung-einkaufsliste/ErnaehrungStartseite';
import Einkaufsliste from '../pages/ernaehrung-einkaufsliste/Einkaufsliste';
import Sportstartseite from '../pages/sport/SportStartseite';
import Settings from '../pages/option/Settings';
import axios from 'axios';

class Login extends Component {

    constructor(props) {
        super(props);

        this.einLoggen = this.einLoggen.bind(this);
        this.handleChangeLogin = this.handleChangeLogin.bind(this);
        this.logOut = this.logOut.bind(this);
        this.state = {
            name: '',
            passwort: '',
            groesse: '',
            alter: '',
            gewicht: '',
            loggedIn: false,
            index: ''

        }




    }

    handleChangeLogin = (event) => {
        this.setState({

            [event.target.id]: event.target.value,
        }
            , () => console.log('Login: ' + this.state.name + ' Passwort: ' + this.state.passwort
            ))
    }

    logOut() {
        this.setState({
            loggedIn: false
           
        })
        localStorage.clear()
    }
    einLoggen(event) {
        event.preventDefault()

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
                            loggedIn: true
                        })
                    } else console.log("FAIL TO LOGIN");


                }

            })
            .catch( err => console.log(err)
            )

    }

    render() {
        return (
            <React.Fragment>



                {(this.state.loggedIn == false) ?

                    (< form onSubmit={this.einLoggen} className="schub2 slideInLeft"  >

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
                        {console.log(this.state.name + ' ' + this.state.passwort)}
                        <br />
                        <Link to="/reg">Registriere dich hier!</Link>

                    </form >) :

                    (<div>

                        <h1>Project LLama</h1>
                        <h3>Fitness App</h3>

                        <nav>
                            <NavLink to="/loggedIn" exact>Startseite</NavLink> | <NavLink to="/eat">Ernährungs Übersicht</NavLink> | <NavLink to="/shoppinglist">Einkaufsliste</NavLink> | <NavLink to="/sport">Sport</NavLink> | <NavLink to="/settings">Option</NavLink> | <NavLink to="/" onClick={this.logOut}>LogOut</NavLink>
                        </nav>
                        <Route path="/loggedIn" exact component={Home} />
                        <Route path="/eat" exact component={Ernaehrungstartseite} />
                        <Route path="/shoppinglist" exact component={Einkaufsliste} />
                        <Route path="/sport" exact component={Sportstartseite} />
                        <Route path="/settings" exact component={Settings} />
                    

                    </div>)}

            </React.Fragment>
        );
    }
}

export default Login;


