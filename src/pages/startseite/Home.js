import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Route } from 'react-router-dom';
import Settings from '../option/Settings'
import axios from 'axios';

function Home() {
    const [user, setUser] = useState({
        kalorienGrundbedarf: 'berechne...',
     
        kalorienUmsatz: 0

    });



    const [Teststate, setTestState] = useState(false);



    useEffect(() => {
      
        fetchUserData();
      
    },  [user.bmi] );

    async function fetchUserData(){
        const id = localStorage.getItem('User')

        console.log(id + "TESTI TEST");
       

        axios.get(`http://localhost:5000/users/${id}`, user)
            .then(response => {
                console.log(response.data, 'Response Data');
                let BMI = response.data.gewicht / response.data.groesse / response.data.groesse * 10000
                console.log(BMI, 'TEST BMI');
    
                setUser({
                    username: response.data.username,
                    alter: Number(response.data.alter),
                    groesse: Number(response.data.groesse),
                    gewicht: Number(response.data.gewicht),
                    geschlecht: response.data.geschlecht,
                    kalorienGrundbedarf: 0,
                    bmi: BMI,
                    kalorienUmsatz: 0

                })
                kalorienBerechnung()
    
})}

    console.log("Lalala")


    function stateNotHookDUMDUM() {
        setTestState(!Teststate);
        kalorienBerechnung()
        console.log(user.kalorienGrundbedarf + "KALROIENBEDARF")
        console.log(user.bmi + " BMI");
        console.log(Teststate);

    }

    function kalorienBerechnung() {

        console.log('USER  BMI : ', user.bmi);
        console.log(user, 'lalalala');

        if (user.bmi > 30) {
           let newGewicht = 0.75 * (user.groesse - 100) + 0.25 * user.gewicht
            console.log("HUHU BMI");

            if (user.geschlecht == 'mann') {
               
                setUser(user => ({ ...user, kalorienGrundbedarf: (newGewicht * 13.75) + (user.groesse * 5) + (user.alter * 6.76) + 66.5 }));

                console.log("JUHU");
                // console.log(response.data.kalorienGrundbedarf);

            } else {
                console.log(
                    'LEERES ELSE111'
                );
            }
        } else {

            if (user.geschlecht === 'mann') {
               
                setUser(user => ({ ...user, kalorienGrundbedarf: (user.gewicht * 13.75) + (user.groesse * 5) + (user.alter * 6.76) + 66.5  }));
            } else {
                console.log(
                    'LEERES ELSE'
                );

            }
        }
        console.log(user.kalorienGrundbedarf, 'lalalala');
    }
    return (

        <>
            {(user.gewicht == 0 || user.groesse == 0 || user.alter == 0 || user.geschlecht == 'undefined') ?

                (
                    <div>
                        <nav>
                            <NavLink to="/loggedIn" exact>Startseite</NavLink> | <NavLink to="/eat">Ernährungs Übersicht</NavLink> | <NavLink to="/shoppinglist">Einkaufsliste</NavLink> | <NavLink to="/sport">Sport</NavLink> | <NavLink to="/settings">Option</NavLink> | <NavLink to="/" onClick={sessionStorage.clear()}>LogOut</NavLink>
                        </nav>

                        <p>Bitte in den Optionen Geschlecht/Gewicht/Alter/Groesse eintragen. Zur genauen Berechnung ihres KalorienBedarfs</p>
                    </div>
                ) : (

                    <div>

                        <p>Guten Tag {user.username}</p>

                        <nav>
                            <NavLink to="/loggedIn" exact>Startseite</NavLink> | <NavLink to="/eat">Ernährungs Übersicht</NavLink> | <NavLink to="/shoppinglist">Einkaufsliste</NavLink> | <NavLink to="/sport">Sport</NavLink> | <NavLink to="/settings">Option</NavLink> | <NavLink to="/" onClick={sessionStorage.clear()}>LogOut</NavLink>
                        </nav>



                        <button class="btn" onClick={stateNotHookDUMDUM}>set state</button>
                        <div>
                            Kalorienbedarf: {user.kalorienGrundbedarf}<br/>
                            BMI: {user.bmi}<br/>
                            username: {user.username},<br/>
                            alter: {user.alter},<br/>
                            groesse: {user.groesse},<br/>
                            gewicht: {user.gewicht},<br/>
                            geschlecht: {user.geschlecht}<br/>
                        </div>

                    </div>


                )}
        </>
    );
}


export default Home;