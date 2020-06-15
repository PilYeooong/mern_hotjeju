import express from "express";

// Global
const HOME = "/";
const API = "/api";
const ADD = "/new";

// Users

const USERS = `${API}/users`;
const SIGN_UP = "/signup";
const LOGIN = "/login";
const LOGOUT = "/logout";
const AUTHENTICATE = "/authenticate";
const LOAD_USER = "/:id";

// Places

const PLACES = `${API}/places`;
const PLACE_DETAIL = "/:id";
const PLACE_EDIT = "/:id/edit";
const PLACE_DELETE = "/:id/delete";

// Search
const SEARCH = `${API}/search`;
const SEARCH_PLACE = "/:place";

const CATEGORY = `${API}/category`;
const CATEGORIZED_PLACE = "/:category";

// Comment
const NEW_COMMENT = "/:id/comment";
const COMMENT_LIST = "/:id/comments";

// Like
const GET_LIKES = "/:id/likes";
const TOGGLE_LIKE = "/:id/togglelike";

const routes = {
  home: HOME,
  users: USERS,
  signUp: SIGN_UP,
  login: LOGIN,
  logout: LOGOUT,
  authenticate: AUTHENTICATE,
  loadUser: (id) => {
    if (id) {
      return `/${id}`;
    } else {
      return LOAD_USER;
    }
  },
  places: PLACES,
  addPlace: ADD,
  placeDetail: (id) => {
    if (id) {
      return `/${id}`;
    } else {
      return PLACE_DETAIL;
    }
  },
  editPlace: (id) => {
    if (id) {
      return `/${id}/edit`;
    } else {
      return PLACE_EDIT;
    }
  },
  deletePlace: (id) => {
    if (id) {
      return `/${id}/delete`;
    } else {
      return PLACE_DELETE;
    }
  },
  category: CATEGORY,
  categorizedPlace: CATEGORIZED_PLACE,
  newComment: (id) => {
    if (id) {
      return `/${id}/comment`;
    } else {
      return NEW_COMMENT;
    }
  },
  commentList: (id) => {
    if (id) {
      return `/${id}/comments`;
    } else {
      return COMMENT_LIST;
    }
  },
  likes: (id) => {
    if (id) {
      return `/${id}/likes`;
    } else {
      return GET_LIKES;
    }
  },
  toggleLike: (id) => {
    if (id) {
      return `/${id}/togglelike`;
    } else {
      return TOGGLE_LIKE;
    }
  },
  search: SEARCH,
  searchPlace: (place) => {
    if (place) {
      return `/${place}`;
    } else {
      return SEARCH_PLACE;
    }
  },
};

export default routes;
