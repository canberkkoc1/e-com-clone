import Admin from "../pages/Admin";
import Carts from "../pages/Carts";
import Home from "../pages/Home";
import LikesPage from "../pages/Likes";
import Likes from "../pages/Likes";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Register from "../pages/Register";

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
];
