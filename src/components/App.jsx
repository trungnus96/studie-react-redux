import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar.jsx';
import Login from './Login.jsx';
import Home from './Home.jsx';
import { requireAuthentication } from './AuthenticatedComponent.jsx';
import '../assets/scss/style.scss';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <NavBar/>
            <Switch>
              <Route path="/login" component={Login}/>
              <Route path="/" component={requireAuthentication(Home)}/>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
