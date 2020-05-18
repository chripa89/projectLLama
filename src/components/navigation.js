import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {

  function addNavClass() {
    let nav = document.getElementById("navbar");
    if (nav.className === "nav") {
      nav.className += " responsive";
    } else {
      nav.className = "nav";
    }
  }

  return (
    <nav id="navbar" class="nav">
      <div class="nav-item">
        <NavLink to="/loggedIn" exact>
          Startseite
        </NavLink>
      </div>
      <div class="nav-item">
        <NavLink to="/eat">Ernährungs Übersicht</NavLink>
      </div>
      <div class="nav-item">
        <NavLink to="/shoppinglist">Einkaufsliste</NavLink>
      </div>
      <div class="nav-item">
        <NavLink to="/sport">Sport</NavLink>
      </div>
      <div class="nav-item">
        <NavLink to="/settings">Option</NavLink>
      </div>
      <div class="nav-item">
        <NavLink to="/" onClick={sessionStorage.clear()}>
          LogOut
        </NavLink>
      </div>
      <div class="nav-item">
        <button class="icon" onClick={addNavClass}>
          <i class="">icon</i>
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
