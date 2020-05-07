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
    }
    return (

        <>
            <nav>
                <NavLink to="/loggedIn" exact>Startseite</NavLink> | <NavLink to="/eat">Ernährungs Übersicht</NavLink> | <NavLink to="/shoppinglist">Einkaufsliste</NavLink> | <NavLink to="/sport">Sport</NavLink> | <NavLink to="/settings">Option</NavLink> | <NavLink to="/" onClick={sessionStorage.clear()}>LogOut</NavLink>
            </nav>
            <div>
                <div>
                <br/>
                    <input type="text" name="gewicht" placeholder="Gewicht eintragen" onChange={handleChange}></input>
                    <br/>
                    <input type="text" name="groesse" placeholder="Größe in cm eintragen" onChange={handleChange}></input>
                    <br/>
                    <input type="text" name="alter" placeholder="Alter eintragen" onChange={handleChange}></input>
                    <br/>
                    <button onClick={updateData}>Update</button>

                </div>
            </div>
        </>
    );
}

export default Settings;