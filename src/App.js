import { useGetAllProductsQuery } from "./redux/apiProduct";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/router";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "./firebase/config";
import { useDispatch } from "react-redux";
import { UserAuth } from "./context/AuthContext";
import { addLike } from "./redux/likesSlice";
import LoadingPage from "./pages/LoadingPage";

function App() {
  /* const dispatch = useDispatch();

  const { user, loading } = UserAuth();

  useEffect(() => {
    onSnapshot(
      query(collection(db, "userInfo", user?.email, "likes")),
      (snapshot) => {
        dispatch(addLike(snapshot.docs.map((doc) => doc.data())));
      }
    );
  }, [db]); */

  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
