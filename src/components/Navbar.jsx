import React, { useEffect, useRef, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { BsBookmarkHeart } from "react-icons/bs";
import { BiShoppingBag } from "react-icons/bi";
import { motion } from "framer-motion";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Logo from "../img/iconShop.png";

function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const { user } = UserAuth();

  const { handleSignOut } = UserAuth();

  const navigate = useNavigate();

  const ref = useRef();

  const signOut = async () => {
    try {
      await handleSignOut();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  // close menu when click outside
  useEffect(() => {
    const closeMenu = (e) => {
      if (openMenu && ref.current && !ref.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", closeMenu);

    return () => document.removeEventListener("mousedown", closeMenu);
  }, [openMenu]);

  return (
    <header className="w-full   bg-black border-b border-black">
      <nav className="bg-white border-gray-200 py-2.5">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
          <a href="/">
            <img src={Logo} alt="Logo" />
          </a>
          <div className="flex items-center lg:order-2">
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <svg
                class="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          <div
            className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <a
                  href="/"
                  className="block py-2 pl-3 pr-4 text-white bg-green-700 rounded lg:bg-transparent lg:text-green-700 lg:p-0 dark:text-white"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/man"
                  className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-purple dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Man
                </a>
              </li>
              <li>
                <a
                  href="/woman"
                  className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-purple-600 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-purple dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Woman
                </a>
              </li>
              <li>
                <a
                  href="/kids"
                  className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-purple dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Kids
                </a>
              </li>
            </ul>
          </div>
          <div className=" items-center justify-between hidden w-full lg:flex lg:w-36 lg:order-3">
            {/* icons */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="button"
              data-dropdown-toggle="dropdown"
              onClick={() => setOpenMenu(!openMenu)}
            >
              <BiUserCircle className="w-10 h-8" />
            </motion.button>
            {/* open user menü */}
            {openMenu && (
              <div
                ref={ref}
                className="absolute right-10 top-14 w-48 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
              >
                <div className="px-4 py-3">
                  <p className="text-sm text-gray-500">Signed in as</p>
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user?.email}
                  </p>
                </div>
                <div className="py-1" id="menu">
                  <a
                    href="/userprofile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Your Profile
                  </a>
                  <a
                    href="settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Settings
                  </a>
                  <button
                    onClick={signOut}
                    className="block w-full border-t-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}

            <motion.button whileTap={{ scale: 0.9 }} className="relative">
              <span className="bg-red-400 rounded-full w-4 h-4 text-white absolute text-xs top-[-10px] right-0">
                1
              </span>
              <BsBookmarkHeart className="w-8 h-6" />
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }}>
              <BiShoppingBag className="w-10 h-8" />
            </motion.button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
