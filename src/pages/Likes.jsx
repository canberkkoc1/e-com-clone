import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import Navbar from "../components/Navbar";
import { UseCarts } from "../context/GetCarts";
import { db } from "../firebase/config";

function LikesPage(props) {
  const [likes, setLikes] = useState([]);
  const [isAdded, setIsAdded] = useState(false);

  const { carts } = UseCarts();

  const localtion = useLocation();
  const userEmail = secureLocalStorage.getItem("user");

  useEffect(() => {
    setLikes(localtion.state.likes);
    // get carts data
  }, [localtion]);

  const addToCart = async (id) => {
    const productByID = likes.find((item) => item.id === id);
    try {
      await setDoc(doc(db, "userInfo", userEmail, "cart", id), {
        id: id,
        image: productByID.image,
        title: productByID.title,
        price: productByID.price,
      });

      // delete item in likes
      await deleteDoc(doc(db, "userInfo", userEmail, "likes", id));

      setIsAdded(true);
    } catch (error) {
      console.log(error);
    }
  };

  debugger;
  return (
    <>
      <Navbar />
      {likes.length > 0 ? (
        likes
          ?.filter((like) => !carts.find((cart) => cart.id === like.id))
          .map((like) => (
            <div
              key={like.id}
              class="relative max-w-sm min-w-[340px] bg-white shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer"
            >
              <div class="overflow-x-hidden rounded-2xl relative">
                <img
                  class="h-40 rounded-2xl w-full object-cover"
                  src={like.image}
                />
              </div>
              <div className="flex justify-between items-center">
                <div class="mt-4 pl-2 mb-2 flex justify-between ">
                  <div>
                    <p class="text-lg font-semibold text-gray-900 mb-0">
                      {like.title}
                    </p>
                    <p class="text-md text-gray-800 mt-0">${like.price}</p>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => addToCart(like.id)}
                    className="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))
      ) : (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-2xl font-bold">No likes yet</h1>
        </div>
      )}
    </>
  );
}

export default LikesPage;
