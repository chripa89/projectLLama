import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Route } from 'react-router-dom';
import Settings from '../option/Settings'
import axios from 'axios';

function Home() {
    const [user, setUser] = useState({
        kalorienGrundbedarf: 'berechne...',

        leistungsUmsatz: 0

    });



    const [Teststate, setTestState] = useState(false);



    useEffect(() => {

        fetchUserData();

    }, [user.bmi]);

    async function fetchUserData() {
        const id = localStorage.getItem('User')

        console.log(id + "TESTI TEST");


        axios.get(`http://localhost:5000/users/${id}`, user)
            .then(response => {
                console.log(response.data, 'Response Data');
                let BMI = response.data.gewicht / response.data.groesse / response.data.groesse * 10000
                console.log(BMI, 'TEST BMI');

                setUser({
                    username: response.data.username,
                    alter: response.data.alter,
                    groesse: response.data.groesse,
                    gewicht: response.data.gewicht,
                    geschlecht: response.data.geschlecht,
                    kalorienGrundbedarf: 0,
                    bmi: BMI,
                    kalorienUmsatz: 0,
                    pal: response.data.pal,
                    leistungsUmsatz: 0

                })
                kalorienGrundbedarfBerechnung()

            })
    }




    function stateNotHookDUMDUM() {
        setTestState(!Teststate);
        kalorienGrundbedarfBerechnung()


    }

    function kalorienGrundbedarfBerechnung() {



        if (user.bmi > 30) {
            let newGewicht = 0.75 * (user.groesse - 100) + 0.25 * user.gewicht
            console.log("HUHU BMI");

            if (user.geschlecht == 'mann') {

                setUser(user => ({ ...user, kalorienGrundbedarf: 66.5  + (newGewicht * 13.75) + (user.groesse * 5) - (user.alter * 6.76) + 66.5 }));

                setUser(user => ({ ...user, leistungsUmsatz: user.kalorienGrundbedarf * (user.pal - 1) }))
                console.log("FürMännerHoherBMI");
                // console.log(response.data.kalorienGrundbedarf);

            } else {
                setUser(user => ({ ...user, kalorienGrundbedarf: 655.1  +  (newGewicht * 9.56) + (user.groesse * 1.85) - (user.alter * 4.7)   }));

                setUser(user => ({ ...user, leistungsUmsatz: user.kalorienGrundbedarf * (user.pal - 1) }))

                console.log(
                    'FürFrauenHoherBMI'
                );
            }
        } else {

            if (user.geschlecht === 'mann') {

                setUser(user => ({ ...user, kalorienGrundbedarf: 66.5 + (user.gewicht * 13.75) + (user.groesse * 5) - (user.alter * 6.76) }));
                setUser(user => ({ ...user, leistungsUmsatz: user.kalorienGrundbedarf * (user.pal - 1) }))

                console.log('NORMAL BMI  MANN');

            } else {

                setUser(user => ({ ...user, kalorienGrundbedarf: 655.1 + (user.gewicht * 9.56) + (user.groesse * 1.85) - (user.alter * 4.7) }));
                setUser(user => ({ ...user, leistungsUmsatz: user.kalorienGrundbedarf * (user.pal - 1) }))
                console.log('Normal  BMI  FRAU');

            }
        }

    }
    return (

        <>







            <div>

                <p>Guten Tag {user.username}</p>

                <nav>
                    <NavLink to="/loggedIn" exact>Startseite</NavLink> | <NavLink to="/eat">Ernährungs Übersicht</NavLink> | <NavLink to="/shoppinglist">Einkaufsliste</NavLink> | <NavLink to="/sport">Sport</NavLink> | <NavLink to="/settings">Option</NavLink> | <NavLink to="/" onClick={sessionStorage.clear()}>LogOut</NavLink>
                </nav>



                <button class="btn" onClick={stateNotHookDUMDUM}>set state</button>

                {user.gewicht == 0 && <p>Bitte in den Optionen ihr Gewicht eintragen. Zur genauen Berechnung ihres KalorienBedarfs. Danke</p>}
                {user.alter == 0 && <p>Bitte in den Optionen ihr Alter eintragen. Zur genauen Berechnung ihres KalorienBedarfs. Danke</p>}
                {user.groesse == 0 && <p>Bitte in den Optionen ihre Größe eintragen. Zur genauen Berechnung ihres KalorienBedarfs. Danke</p>}
                {user.geschlecht == 0 && <p>Bitte in den Optionen ihr Geschlecht. Zur genauen Berechnung ihres KalorienBedarfs. Danke</p>}
                {user.pal == 0 && <p>Bitte in den Optionen ihren Leistungsumsatz (PAL) eintragen. Zur genauen Berechnung ihres KalorienBedarfs</p>}


                <div>


                    username: {user.username},<br />
                            alter: {user.alter},<br />
                            groesse: {user.groesse},<br />
                            gewicht: {user.gewicht},<br />
                            geschlecht: {user.geschlecht},<br />

                            BMI: {user.bmi},<br />
                            pal: {user.pal},<br />
                            KalorienGrundbedarf: {user.kalorienGrundbedarf},<br />
                            LeistungsUmsatz: {user.leistungsUmsatz},<br />
                            GesamtUmsatz: {user.leistungsUmsatz + user.kalorienGrundbedarf}

                </div>

            </div>



        </>
    );
}


export default Home;