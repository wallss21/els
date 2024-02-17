import React from "react";

import { Link, useLocation } from "react-router-dom";
import numeral from "numeral";
import { Title } from "../../components/text";
import { Panel, PanelGroup, Placeholder } from "rsuite";
import { BiLock } from "react-icons/bi";
import BillingAddFormInput from "../../components/billing_address_input";

function Checkout() {
  const location = useLocation();
  const products = location.state.items;
  const total_price = location.state.total_amount;

const handleSubmit=(e)=>{
  console.log(e)
}



  return (
    <div className="pb-16">
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-5 lg:w-11/12 mx-auto">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          El Classic Jewery Shop
        </Link>
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </a>
                <span className="font-semibold text-gray-900">Shop</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                  href="#"
                >
                  2
                </a>
                <span className="font-semibold text-gray-900">Shipping</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                  href="#"
                >
                  3
                </a>
                <span className="font-semibold text-gray-500">Payment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="lg:grid sm:px-5 lg:grid-cols-12 lg:w-11/12   lg:gap-x-5 space-y-5 mx-auto  justify-between items-start ">
        <div className="px-4 pt-8 lg:col-span-5 lg:sticky top-[0vh] ">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>






          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {products.map((product) => (
              <div className="flex justify-center items-center rounded-lg bg-white ">
                <div className="inline-flex relative ">
                  <img
                    className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                    src={product.img1}
                    alt={product.name}
                  />
                  <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-[#282828] border-2 border-white rounded-full top-4 end-0 dark:border-gray-900">
                    {product.count}
                  </div>
                </div>

                <div className="flex w-full flex-col px-5 py-2">
                  <span className="font-light text-sm lg:w-9/12">
                    {product.name}
                  </span>

                  <p className="font-bold">
                    ${numeral(product.price).format()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          
          

          

          
        </div>
        <div className="mt-5 bg-gray-50 px-4 lg:col-span-7">
        <p className="mt-8 text-lg font-medium">Shipping Methods</p>
            {/* SHIPPING ADDRESS INPUT Form */}
        <BillingAddFormInput onSubmit={handleSubmit} />
          
        </div>
      </div>
    </div>
  );
}

export default Checkout;
