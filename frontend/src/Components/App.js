import React from 'react';

import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme"
import Auth from "../hoc/Auth";

import Home from "../Pages/Home";
import AddPlace from "../Pages/AddPlace";
import PlaceDetail from "../Pages/PlaceDetail";
import AuthRoutes from "../Pages/Auth"
import Header from "../Components/Header";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <>
      <GlobalStyles />
      <Router>
      <Header />
        <Switch>
          <Route exact path="/" component={Auth(Home, null)} />
          <Route exact path="/place/new" component={Auth(AddPlace, true)} />
          <Route exact path="/place/:placeId" component={Auth(PlaceDetail, null)} />
          <Route path="/" component={AuthRoutes}/>
        </Switch>
      </Router>
      </>
    </ThemeProvider>
  );
}

export default App;
