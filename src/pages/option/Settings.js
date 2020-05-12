import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';


function Settings() {
    const [user, setUser] = useState({
    });




    const [state, setState] = useState(false);
    useEffect(() => {

        const id = localStorage.getItem('User')


        axios.get(`http://localhost:5000/users/${id}`, user)
            .then(response => {

                setUser({
                    username: response.data.username,
                    passwort: response.data.passwort,
                    alter: response.data.alter,
                    groesse: response.data.groesse,
                    gewicht: response.data.gewicht,
                    geschlecht: response.data.geschlecht
                })
                console.log(response.data);

            })
            .catch(err => console.log(err)
            )

    }, []);
    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
        console.log("CHANGES: ", user);


    }

    function updateData() {
        const id = localStorage.getItem('User')
        axios.post(`http://localhost:5000/users/update/${id}`, user)
            .then(res => res.data
            )

        alert('user updated')
    }
    return (

        <>
            <nav>
                <NavLink to="/loggedIn" exact>Startseite</NavLink> | <NavLink to="/eat">Ernährungs Übersicht</NavLink> | <NavLink to="/shoppinglist">Einkaufsliste</NavLink> | <NavLink to="/sport">Sport</NavLink> | <NavLink to="/settings">Option</NavLink> | <NavLink to="/" onClick={sessionStorage.clear()}>LogOut</NavLink>
            </nav>
            <div>
                <div>
                    <br />
                    <input type="text" name="gewicht" placeholder="Gewicht eintragen" onChange={handleChange}></input>
                    <br />
                    <input type="text" name="groesse" placeholder="Größe in cm eintragen" onChange={handleChange}></input>
                    <br />
                    <input type="text" name="alter" placeholder="Alter eintragen" onChange={handleChange}></input>
                    <br />

                    <select type="text" name="geschlecht" placeholder="Geschlecht eintragen" onChange={handleChange}>

                        <option>Bitte Auswählen</option>
                        <option value="mann">Mann</option>
                        <option value="frau">Frau</option>

                    </select>
                    <div>
                        Dazu wird den vorwiegenden Aktivitäten einer Person ein bestimmter PAL-Faktor ("Physical Activity Level" oder auf deutsch etwa "Grad der körperlichen Aktivität") zugeordnet.
                        Dieser PAL-Faktor bestimmt dann die Berechnung des Leistungsumsatzes.
                        <p>Wie aktiv bist du?</p>

                        <select type="text"  name="pal">
                            <option value="1.2">Nur sitzend oder liegend (PAL 1,2)</option>
                            <option value="1.45">Sitzend, kaum aktiv (PAL 1.45)</option>
                            <option value="1.65">Sitzend, gehend und stehend (PAL 1,65)</option>
                            <option value="1.85">Vorwiegend stehend/gehend (PAL 1.85)</option>
                            <option value="2.2">Anstrengende Arbeit/Sport (PAL 2,2)</option>
                            

                        </select>
                    </div>

                    <br />
                    <button onClick={updateData}>Update</button>

                </div>
            </div>
        </>
    );
}

export default Settings;