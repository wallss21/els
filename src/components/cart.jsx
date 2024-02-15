import React, { useEffect, useState } from "react";
import CartIcon from "./cartIcon";
import CloseIcon from "./closeIcon";
import { Button, Text, Title } from "./text";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus } from "./icons";
import { useDispatch, useSelector } from "react-redux";
import IncreamentDecreamentQuantity from "./increament_decreament_quantity";
import {
  addToCart,
  addToCartdb,
  decreaseCartdb,
  reduceItemFromCart,
  removeFromCart,
  removeFromCartdb,
} from "../features/products/cartSlice";
import numeral from "numeral";
import { GoPlus } from "react-icons/go";

const EmptyCart = ({ showCartSideEffect }) => {
  const navigate = useNavigate();
  return (
    <div className="empty flex flex-col h-[70vh] justify-center items-center">
      <p>Your cart is Empty</p>
      <p
        onClick={() => {
          showCartSideEffect(false);
          navigate("/collections/jewellery");
        }}
      >
        <Button title={"START SHOPING"}></Button>
      </p>
    </div>
  );
};

function Cart({ showCart, showCartSideEffect }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  let cartItemsCount = useSelector((state) => state.cart.count);
  const total_amount = useSelector((state) => state.cart.total_amount);
  const token=useSelector(state=>state.auth.userDetails)
  // console.log(cartItems);

  useEffect(() => {
    return () => {};
  }, []);
  return (
    <section
      onClick={(e) => {
        showCartSideEffect(false);
        e.stopPropagation();
      }}
      className={`bg-black bg-opacity-20 z-20 ${
        showCart ? "fixed" : "hidden"
      }  top-0 right-0  w-[100vw] h-[100vh] `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className=" bg-white  lg:w-6/12 px-3 md:px-0  h-[100vh] ml-auto"
      >
        <div className="lg:grid grid-cols-6">
          <div className="may_like col-span-2 bg-gray-100 overflow-y-auto "></div>
          <div className="col-span-4">
            <div className="header flex justify-between  px-10 py-6 border-b border-gray-200">
              <div className="left flex gap-x-4">
                <CartIcon />
                <p>{cartItemsCount ? cartItemsCount : 0}</p>
              </div>
              <button
                className=""
                onClick={(e) => showCartSideEffect(false)}
                type="button"
              >
                {" "}
                <CloseIcon />
              </button>
            </div>
            <div className=" flex flex-col items-center justify-start  h-[calc(73vh-2rem)] overflow-y-auto">
              {/* <EmptyCart /> */}

              {cartItemsCount ? (
                cartItems.map((item) => {
                  return (
                    <div key={item.id} className="item lg:grid grid-cols-10 flex border-b-2 bg-slate-50   border-b-gray-50 pb-2 lg:px-3  pt-8 justify-between items-center gap-x-4 text-xs font-mont ">
                      <div className="product_img col-span-4">
                        <img
                          className="mix-blend-multiply"
                          src={item.img1}
                          alt="..."
                        />
                      </div>
                      <div className="product-name justify-center  flex flex-col items-center gap-y-3 lg:gap-y-0 col-span-6">
                        <div className="brand self-start">
                          {/* <img className="w-9" src={item.initial_img} alt="" /> */}
                        </div>
                        <div className="flex flex-col lg:flex-row lg:gap-x-8 gap-y-5">
                          <p className="name">{item.name}</p>
                          <div className="product_price  text-base">
                            ${numeral(item.price * item.count).format()}
                          </div>
                        </div>

                        <div className="bttm flex gap-x-8 items-end pt-4">
                          {/* <IncreamentDecreamentQuantity /> */}
                          <p className="flex gap-x-6 items-center w-fit  border self-center border-gray-300 ">
                            <span
                              className="cursor-pointer p-3"
                              onClick={() => {
                                dispatch(decreaseCartdb({product:item,token:token}));
                              }}
                            >
                              <Minus />
                            </span>

                            <span className="text-lg font-mont">
                              {item.count}
                            </span>
                            <span
                              className="p-3 cursor-pointer"
                              onClick={() => {
                                dispatch(addToCartdb({payload:{ ...item, count: 1 },token:token}));
                              }}
                            >
                              <GoPlus size={18} strokeWidth={0.1} />
                            </span>
                          </p>
                          <p
                            onClick={() => {
                              dispatch(removeFromCartdb({payload:item,token:token}));
                            }}
                            className="text-xs  capitalize underline  cursor-pointer underline-offset-1"
                          >
                            remove
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <EmptyCart showCartSideEffect={showCartSideEffect} />
              )}
            </div>
            {cartItems.length>0 && (
              <div className="button border-t border-gray-300">
                <div className="top flex justify-between text-sm py-4 px-5">
                  <Link>
                    <Text
                      data={"Add order note"}
                      moreClass={"underline text-xs"}
                    />
                  </Link>
                  <Text
                    data={"Shipping & taxes calculated at checkout"}
                    moreClass={"text-xs"}
                  />
                </div>
                <div className="down  justify-center items-center flex flex-col ">
                  <button
                    onClick={() =>
                      navigate("/products/checkout/", {
                        state: { items: cartItems, total_amount: total_amount },
                      })
                    }
                    type="button"
                    className="bg-[#282828] ripple-bg-neutral-700 text-white w-11/12 py-4 flex  justify-center items-center"
                  >
                    <Title
                      title={`CHECKOUT `}
                      text_s={"leading-7 text-xs "}
                      color={"text-white"}
                    />
                    <strong className="ml-3">
                      ${numeral(total_amount).format()}
                    </strong>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
