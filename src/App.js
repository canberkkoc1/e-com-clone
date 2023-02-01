import { useGetAllProductsQuery } from "./redux/apiProduct";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/router";

function App() {
  console.log(Router);
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
