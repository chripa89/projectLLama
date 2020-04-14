import React from 'react';
import './App.css';
import { BrowserRouter, Route, Link, NavLink } from 'react-router-dom';
import Home from './startseite/Home';
import Ernaehrungstartseite from './ernaehrung-einkaufsliste/ErnaehrungStartseite';
import Einkaufsliste from './ernaehrung-einkaufsliste/Einkaufsliste';
import Sportstartseite from './sport/SportStartseite';
import Settings from './option/Settings';



function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <nav>
          <NavLink to="/" exact>Startseite</NavLink> | <NavLink to="/eat">Ernährungs Übersicht</NavLink> | <NavLink to="/shoppinglist">Einkaufsliste</NavLink> | <NavLink to="/sport">Sport</NavLink> | <NavLink to="/settings">Option</NavLink>
        </nav>
        <Route path="/" exact component={Home} />
        <Route path="/eat" exact component={Ernaehrungstartseite} />
        <Route path="/shoppinglist" exact component={Einkaufsliste} />
        <Route path="/sport" exact component={Sportstartseite} />
        <Route path="/settings" exact component={Settings} />
      
    </div>
  </BrowserRouter>
  );
}

export default App;
