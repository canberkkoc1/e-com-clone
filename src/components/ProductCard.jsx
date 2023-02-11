import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsFillCartCheckFill } from "react-icons/bs";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase/config";

function ProductCard({ items, loading }) {
  const [isFav, setIsFav] = useState(false);
  const [likes, setLikes] = useState([]);
  const [cart, setCart] = useState([]);
  const [isAdded, setIsAdded] = useState(false);

  const { user } = UserAuth();

  useEffect(() => {
    onSnapshot(
      query(collection(db, "userInfo", user?.email, "cart")),
      (snapshot) => {
        setCart(snapshot.docs.map((doc) => doc.data()));
      }
    );
  }, [db]);

  useEffect(() => {
    onSnapshot(
      query(collection(db, "userInfo", user?.email, "likes")),
      (snapshot) => {
        setLikes(snapshot.docs.map((doc) => doc.data()));
      }
    );
  }, [db]);

  const addToLikes = async (id) => {
    setIsFav(!isFav);
    const productByID = items.find((item) => item.id === id);
    if (!isFav) {
      try {
        await setDoc(doc(db, "userInfo", user?.email, "likes", id), {
          id: productByID.id,
          image: productByID.image,
          title: productByID.title,
          price: productByID.price,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        // db query with id to delete the doc
        //const query = await query(collection(db,"userInfo",user?.email,"likes",user?.uid),where())
        await deleteDoc(doc(db, "userInfo", user?.email, "likes", id));
      } catch (error) {
        alert(error);
      }
    }
  };

  debugger;
  // add to cart
  const addToCart = async (id) => {
    const productByID = items.find((item) => item.id === id);
    setIsAdded(!isAdded);
    if (!isAdded) {
      try {
        await setDoc(doc(db, "userInfo", user?.email, "cart", id), {
          id: id,
          image: productByID.image,
          title: productByID.title,
          price: productByID.price,
          stock: 1,
        });

        setIsAdded(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        // db query with id to delete the doc
        //const query = await query(collection(db,"userInfo",user?.email,"likes",user?.uid),where())
        await deleteDoc(doc(db, "userInfo", user?.email, "cart", id));
        setIsAdded(false);
      } catch (error) {
        alert(error);
      }
    }
  };

  debugger;

  return (
    <>
      {!loading &&
        items?.map((item) => (
          <article className="relative" key={item.id}>
            <div className="aspect-square overflow-hidden group">
              <img
                className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
                src={item.image}
                alt=""
              />
              {/* when hover the image show fav icon and add to basket button */}
              <div className="hidden  absolute inset-0  group-hover:bg-opacity-50 transition-all duration-300 group-hover:flex items-center justify-center">
                <button
                  className="bg-white rounded-full p-2"
                  onClick={() => addToLikes(item.id)}
                >
                  {likes.find((like) => like.id === item.id) ? (
                    <MdFavorite className="h-6 w-6 text-pink-600" />
                  ) : (
                    <MdFavoriteBorder className="h-6 w-6 text-pink-600" />
                  )}
                </button>
                <button
                  className="bg-white rounded-full p-2 ml-4"
                  onClick={() => addToCart(item.id)}
                >
                  {cart.find((cartItem) => cartItem.id === item.id) ? (
                    <BsFillCartCheckFill className="h-6 w-6 text-pink-600" />
                  ) : (
                    <AiOutlineShoppingCart className="h-6 w-6 text-pink-600" />
                  )}
                </button>
              </div>
            </div>
            <div className="absolute top-0 m-1 rounded-full bg-white">
              <p className="rounded-full bg-black p-1 text-[10px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
                Sale
              </p>
            </div>
            <div className="mt-4 flex items-start justify-between">
              <div className="">
                <h3 className="text-xs font-semibold sm:text-sm md:text-base">
                  <a href="#" title="" className="">
                    {item.title}
                    <span className="absolute" aria-hidden="true"></span>
                  </a>
                </h3>
                <div className="mt-2 flex items-center">
                  <svg
                    className="block h-3 w-3 align-middle text-pink-600 sm:h-4 sm:w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      className=""
                    ></path>
                  </svg>
                  <svg
                    className="block h-3 w-3 align-middle text-pink-600 sm:h-4 sm:w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      className=""
                    ></path>
                  </svg>
                  <svg
                    className="block h-3 w-3 align-middle text-pink-600 sm:h-4 sm:w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      className=""
                    ></path>
                  </svg>
                  <svg
                    className="block h-3 w-3 align-middle text-pink-600 sm:h-4 sm:w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      className=""
                    ></path>
                  </svg>
                  <svg
                    className="block h-3 w-3 align-middle text-gray-400 sm:h-4 sm:w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      className=""
                    ></path>
                  </svg>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xs font-normal sm:text-sm md:text-base">
                  ${item.price}.00
                </p>
              </div>
            </div>
          </article>
        ))}
    </>
  );
}

export default ProductCard;
