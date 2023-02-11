import Admin from "../pages/Admin";
import Carts from "../pages/Carts";
import Home from "../pages/Home";
import Kids from "../pages/Kids";
import LikesPage from "../pages/Likes";
import Likes from "../pages/Likes";
import Login from "../pages/Login";
import Man from "../pages/Man";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import Woman from "../pages/Woman";

export const routes = [
  {
    path: "",
    component: <Home />,
    title: "Home",
  },
  {
    path: "login",
    component: <Login />,
    title: "Login",
  },
  {
    path: "register",
    component: <Register />,
    title: "Register",
  },
  {
    path: "dashboard",
    component: <Admin />,
    title: "Dashboard",
  },
  {
    path: "userprofile",
    component: <Profile />,
    title: "profile",
  },
  {
    path: "likes/:id",
    component: <LikesPage />,
    title: "likes",
  },
  {
    path: "cart/:id",
    component: <Carts />,
    title: "carts",
  },
  {
    path: "Man",
    component: <Man />,
    title: "ManCategory",
  },
  {
    path: "Woman",
    component: <Woman />,
    title: "WomanCategory",
  },
  {
    path: "Kids",
    component: <Kids />,
    title: "KidsCategory",
  },
];
