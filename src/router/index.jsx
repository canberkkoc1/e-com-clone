import Home from "../pages/Home";
import Login from "../pages/Login";
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
];
