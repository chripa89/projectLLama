import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Home from './pages/startseite/Home';
import Login from './login-registrierung/Login';
import RegApp from './login-registrierung/RegApp';


import {RegisterPage} from './pages/register';



function App() {
  return (
    <>

    <BrowserRouter>
    <div className="App">
        <nav>
          <NavLink to="/" exact>Startseite</NavLink> |
          <NavLink to="/eat">Ernährungs Übersicht</NavLink> |
          <NavLink to="/shoppinglist">Einkaufsliste</NavLink> |
          <NavLink to="/sport">Sport</NavLink> |
          <NavLink to="/settings">Option</NavLink> |
          <NavLink to="/pages">Registrierung</NavLink>
        </nav>
        <Route path="/" exact component={Home} />
        <Route path="/eat" exact component={Ernaehrungstartseite} />
        <Route path="/shoppinglist" exact component={Einkaufsliste} />
        <Route path="/sport" exact component={Sportstartseite} />
        <Route path="/settings" exact component={Settings} />
        <Route path="/pages" exact component={RegisterPage} />
    </div>


      <div >
        <header>
          <h1 className="slideInLeft sticky">FitnessApp</h1>
        </header>
      </div>


      <Switch>
        <Route path="/startseite" exact component={Home} />
        <Route path="/" exact component={Login} />
        <Route path="/reg" exact component={RegApp} />

      </Switch>
    </BrowserRouter>


  </>
  );
}

export default App;
