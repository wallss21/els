import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";

import { PiShoppingBagThin } from "react-icons/pi";
import { navlinks } from "../../assets/data";
import MobileMainNav from "./mobileMainNav";
import DesktopNav from "./desktopNav";
import Cart from "../cart";
import CartIcon from "../cartIcon";
import FlashMessage from "./flashMessage";
import { useSelector } from "react-redux";
import FormInput from "../input";
import { message } from "./notification";

function Header() {
  const cartItemCount = useSelector((state) => state.cart.count);
  const [isNavOpen, setIsNavOpen] = useState("");

  const [showCart, setShowCart] = useState(false);

  const showCartSideEffect = (e) => {
    setShowCart(e);
  };

  const mobile_ref = useRef(null);
  const navigate = useNavigate();

  function showNav(e) {
    return setIsNavOpen(e);
  }

  return (
    <header className="z-50 body-font text-dark   sticky top-0 bg-white ">
      {/* <Cart /> */}

      <div className="border-b border-b-gray-200">
        <div className="container px-5 lg:px-0  py-3  grid grid-cols-12 lg:border-b border-b-gray-200 mx-auto">
          <div className="flex gap-3 lg:gap-5  items-center col-span-2    ">
            <button
              onClick={() => showNav(true)}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            <div className="search_bar">
              <div className="text-neutral-700 text-opacity-70  hidden cursor-pointer lg:flex">
                <IoSearchOutline size={20} />
                <p className="pl-3"> Search</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center col-span-8">
            <Link
            
              to={"/"}
              className="flex title-font font-semibold text-[#282828] items-center hover:text-[#282828] hover:no-underline font-mont leading-normal uppercase text-lg lg:text-4xl "
            >
             El Classic Jewelry 
            </Link>
          </div>

          <div className="icons justify-end items-center flex gap-4  col-span-2">
            <CiLocationOn className="hidden md:flex" size={27} />

            <BiUser
              onClick={() => navigate("/account")}
              className="hidden md:flex"
              size={27}
            />

            <button
              onClick={() => {
                setShowCart(true);
              }}
              type="button"
              className="relative  inline-flex items-center p-3 text-sm font-medium text-center "
            >
              <CartIcon width={"22"} height={"22"} />

              <span className="sr-only">Notifications</span>
              <div className="absolute z-[1] inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-neutral-800 border-2 border-white rounded-full top-1 end-0">
                {cartItemCount}
              </div>
            </button>
          </div>
        </div>
       

        <Cart showCart={showCart} showCartSideEffect={showCartSideEffect} />
        {/* Desktop navigation */}
        <DesktopNav navlinks={navlinks} />
        {/* mobile navigation */}
        <MobileMainNav
          mobile_ref={mobile_ref}
          isNavOpen={isNavOpen}
          setIsNavOpen={setIsNavOpen}
          navlinks={navlinks}
        />
      </div>
    </header>
  );
}

export default Header;
