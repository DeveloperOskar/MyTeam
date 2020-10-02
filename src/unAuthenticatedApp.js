import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Index from './components/index/Index';
import SignUp from './components/signup/SignUp';
import LoadingScreen from './components/loadingscreen/LoadingScreen';
import Navbar from './components/navbar/Navbar';

const unauthenticatedApp = () => {
  return (
    <Router>
      <LoadingScreen />
      <Navbar />
      <Switch>
        <Route path='/' exact component={Index} />
        <Route path='/Signup' exact component={SignUp} />
      </Switch>
    </Router>
  );
};

export default unauthenticatedApp;
