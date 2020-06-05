import React from 'react';

import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme"
import Auth from "../hoc/Auth";

import Home from "../Pages/Home";
import AddPlace from "../Pages/AddPlace";
import PlaceDetail from "../Pages/PlaceDetail";
import Profile from "../Pages/Auth/Profile";
import Login from "../Pages/Auth/Login";
import Signup from "../Pages/Auth/Signup";
import Header from "../Components/Header";
import CategorizedPlace from "../Pages/CategorizedPlace";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Router>
      <Header />
        <Switch>
          <Route exact path="/" component={Auth(Home, null)} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/:category" component={Auth(CategorizedPlace, null)} />
          <Route exact path="/place/new" component={Auth(AddPlace, true)} />
          <Route exact path="/place/:placeId" component={Auth(PlaceDetail, null)} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
