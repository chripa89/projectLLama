import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';

class RegApp extends Component {
    constructor(props) {
        
        super(props);
        this.pushUser = this.pushUser.bind(this)
        this.state = {
            username: '',
            passwort: '',
            alter: '',
            groesse: '',
            gewicht: '',
            createUser: false
           
        }
    }

  

    userReg = (event) => {



        this.setState({
            [event.target.id]: event.target.value

        }
            , () => console.log(this.state))

    }




    pushUser(event) {
        event.preventDefault()
        if (this.state.username !== '') {
            if (this.state.passwort === this.state.checkPasswort) {
                if (this.state.alter < 100 && this.state.alter > 0 && this.state.alter != '') {
                    if (this.state.groesse < 220 && this.state.groesse > 50 && this.state.groesse != '') {
                        if (this.state.gewicht < 220 && this.state.gewicht > 50 && this.state.groesse != '') {
                        
                            
     const user = {
        
            username: this.state.username,
            passwort: this.state.passwort,
            alter: this.state.alter,
            groesse: this.state.groesse,
            gewicht: this.state.gewicht
     }
                        
     console.log(user);
                   
     axios.post('http://localhost:5000/users/reg', user)
                            .then(res => console.log(res.data));
                            
                        this.setState({
                            createUser: true
                        })

                            alert('erfolgreich registriert!')
                        } else alert('Bitte geben Sie ein korretes Gewicht an')
                    } else alert('Bitte geben Sie eine korrekte Größe an')
                } else alert('Bitte geben Sie ein korrektes Alter an')
            } else alert('PASSWORT stimmt nicht überein');
        } else alert('Bitte Login-Name angeben!')



    }


    render() {
        return (
            <>
                {
                
                (this.state.createUser === false)
                ?
                (<form onSubmit={this.pushUser} className="schub2 slideInLeft">
                    Login-Name<br />
                    <input type="text" onChange={this.userReg} id="username" />
                    <br />
                    Passwort<br />
                    <input type="password" onChange={this.userReg} id="passwort" />
                    <br />
                    Passwort überprüfen<br />
                    <input type="password" onChange={this.userReg} id="checkPasswort" />
                    <br />
                    Alter<br />
                    <input type="number" onChange={this.userReg} id="alter" />
                    <br />
                    Größe in cm<br />
                    <input type="number" onChange={this.userReg} id="groesse" />
                    <br />
                    Gewicht in kg<br />
                    <input type="number" onChange={this.userReg} id="gewicht" />
                    <br />
                    <button  >Registrieren</button>
                    <br />
                    <br />
                    <Link to="/">zum Login</Link>
                </form>
                )
                : <Login />

    }
            </>
        );
    }
}

export default RegApp;