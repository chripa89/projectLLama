import React from 'react';
import { NavLink } from 'react-router-dom';

function Einkaufsliste(props) {
    return (
        <>
            <nav>
                <NavLink to="/loggedIn" exact>Startseite</NavLink> | <NavLink to="/eat">Ernährungs Übersicht</NavLink> | <NavLink to="/shoppinglist">Einkaufsliste</NavLink> | <NavLink to="/sport">Sport</NavLink> | <NavLink to="/settings">Option</NavLink> | <NavLink to="/" onClick={sessionStorage.clear()}>LogOut</NavLink>
            </nav>

            <div>


                EINKAUFSLISTE LEL
        </div>
        </>
    );
}

export default Einkaufsliste;