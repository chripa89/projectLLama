import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Home from './pages/startseite/Home';
import Login from './login-registrierung/Login';
import RegApp from './login-registrierung/RegApp';




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
        <Route path="/startseite" exact component={Home} />
        <Route path="/" exact component={Login} />
        <Route path="/reg" exact component={RegApp} />
        
      </Switch>
    </BrowserRouter>


  </>
  );
}

export default App;
