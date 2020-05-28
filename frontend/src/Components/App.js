import React from 'react';

import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme"
import Auth from "../hoc/Auth";
import Home from "../Pages/Home";
import AuthRoutes from "../Pages/Auth"

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route exact path="/" component={Auth(Home, null)} />
          <Route path="/" component={AuthRoutes}/>
        </Switch>
      </Router>
      </>
    </ThemeProvider>
  );
}

export default App;
