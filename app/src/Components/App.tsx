import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import { About } from './About';
import { NavBar } from './NavBar';
import { NoMatch } from './NoMatch';
import BubbleCanvas from './Bubbles/Bubbles';
import JoinOrCreateRoom from './Bubbles/JoinOrCreateRoom';

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
        <Route exact path="/bubbles">
          <JoinOrCreateRoom />
        </Route>
        <Route path="/bubbles/:room">
          <BubbleCanvas />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
