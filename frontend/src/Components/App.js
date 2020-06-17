import React from "react";

import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import Auth from "../hoc/Auth";

import Home from "../Pages/Home";
import Search from "../Pages/Search";
import AddPlace from "../Pages/AddPlace";
import PlaceDetail from "../Pages/PlaceDetail";
import Profile from "../Pages/Auth/Profile";
import Login from "../Pages/Auth/Login";
import Signup from "../Pages/Auth/Signup";
import Header from "../Components/Header";

const Wrapper = styled.div`
`;

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Router>
        <Header />
        <Wrapper>
          <Switch>
            <Route exact path="/" component={Auth(Home, null)} />
            <Route exact path="/search/:place" component={Auth(Search, null)} />
            <Route exact path="/profile" component={Auth(Profile, null)} />
            <Route exact path="/accounts/login" component={Login} />
            <Route exact path="/accounts/signup" component={Signup} />
            <Route exact path="/place/new" component={Auth(AddPlace, true)} />
            <Route
              exact
              path="/place/:placeId"
              component={Auth(PlaceDetail, null)}
            />
          </Switch>
        </Wrapper>
      </Router>
    </ThemeProvider>
  );
}

export default App;
