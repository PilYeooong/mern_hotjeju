import express from "express";

// Global
const HOME = "/";
const API = "/api";

// Users

const USERS = `${API}/users`
const SIGN_UP = "/signup";
const LOGIN = "/login";
const LOGOUT = "/logout";
const AUTHENTICATE = "/authenticate";

const routes = {
  home: HOME,
  users: USERS,
  signUp: SIGN_UP,
  login: LOGIN,
  logout: LOGOUT,
  authenticate: AUTHENTICATE,
};

export default routes;
