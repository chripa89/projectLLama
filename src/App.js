import React from 'react';
// import './App.css';
import './styles/_main.scss';
import { BrowserRouter, Route, Switch,NavLink } from 'react-router-dom';
import Home from './pages/startseite/Home';
import Login from './login-registrierung/Login';
import RegApp from './login-registrierung/RegApp';

import Ernaehrungstartseite from './pages/ernaehrung-einkaufsliste/ErnaehrungStartseite';
import Einkaufsliste from './pages/ernaehrung-einkaufsliste/Einkaufsliste';
import Sportstartseite from './pages/sport/SportStartseite';
import Settings from './pages/option/Settings';






function App() {
  
  return (
    <>

      <BrowserRouter>


        <div >
          <header>
            <h1 className="slideInLeft sticky">FitnessApp</h1>
          </header>
        </div>


        <Switch>
          <Route path="/loggedIn" exact component={Home} />
          <Route path="/" exact component={Login} />
          <Route path="/reg" exact component={RegApp} />
          <Route path="/eat" exact component={Ernaehrungstartseite} />
          <Route path="/shoppinglist" exact component={Einkaufsliste} />
          <Route path="/sport" exact component={Sportstartseite} />
          <Route path="/settings" exact component={Settings} />
        </Switch>
      </BrowserRouter>


    </>
  );
}

export default App;
