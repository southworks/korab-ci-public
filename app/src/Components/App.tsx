import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import { About } from './About';
import { NavBar } from './NavBar';
import { NoMatch } from './NoMatch';
import Bubbles from './Bubbles';

function App() {
  return (
    <BrowserRouter >
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/bubbles">
          <Bubbles />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
