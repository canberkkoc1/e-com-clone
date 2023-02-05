import { useGetAllProductsQuery } from "./redux/apiProduct";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/router";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
