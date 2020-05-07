import React, { useState, useEffect } from 'react';
import { NavLink, Route } from 'react-router-dom';
import Settings from '../option/Settings'
import axios from 'axios';

function Home() {
    const [user, setUser] = useState({

        username: '',
        passwort: '',
        confirmPassword: '',
        alter: 0,
        groesse: 0,
        gewicht: 0,

    });



    const [state, setState] = useState(false);
    useEffect(() => {

        const id = localStorage.getItem('User')
        console.log(id + "TESTI TEST");
        console.log(`http://localhost:5000/users/${id}`);

        axios.get(`http://localhost:5000/users/${id}`, user)
            .then(response => {

                setUser({
                    username: response.data.username,
                    passwort: response.data.passwort,
                    alter: response.data.alter,
                    groesse: response.data.groesse,
                    gewicht: response.data.gewicht,
                })
                console.log(response.data);

            })
            .catch(err => console.log(err)
            )


    }, []);



    console.log("Lalala")
    function stateNotHookDUMDUM() {
        setState(!state);
        console.log(state);
        console.log(user);
        console.log(user.gewicht + "HI")
    }



    return (

        <>
            {(user.gewicht == 0 || user.groesse == 0 || user.alter == 0) ?

                (
                <div>
                    <nav>
                        <NavLink to="/loggedIn" exact>Startseite</NavLink> | <NavLink to="/eat">Ernährungs Übersicht</NavLink> | <NavLink to="/shoppinglist">Einkaufsliste</NavLink> | <NavLink to="/sport">Sport</NavLink> | <NavLink to="/settings">Option</NavLink> | <NavLink to="/" onClick={sessionStorage.clear()}>LogOut</NavLink>
                    </nav>

                    <p>Bitte in den Optionen Gewicht/Alter/Groesse eintragen. Zur genauen Berechnung ihres KalorienBedarfs</p>
                </div>
                ) : (

                    <div>

                        <p>Guten Tag {user.username}</p>

                        <nav>
                            <NavLink to="/loggedIn" exact>Startseite</NavLink> | <NavLink to="/eat">Ernährungs Übersicht</NavLink> | <NavLink to="/shoppinglist">Einkaufsliste</NavLink> | <NavLink to="/sport">Sport</NavLink> | <NavLink to="/settings">Option</NavLink> | <NavLink to="/" onClick={sessionStorage.clear()}>LogOut</NavLink>
                        </nav>



                        <button class="btn" onClick={stateNotHookDUMDUM}>set state</button>
                    </div>


                )}
        </>
    );
}


export default Home;