import React, { useEffect, useState } from "react";
import V from "max-validator";

import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import numeral from "numeral";
import { Title } from "../../components/text";
import { Panel, PanelGroup, Placeholder } from "rsuite";
import BillingAddFormInput from "../../components/billing_address_input";
import Payment from "../../components/payment";
import queryString from "query-string";
import { MyModal } from "../../components/Modal";
import { validationScheme } from "../../dataSchema";
import { verifyEmail } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  createBillingAddres,
  retriveBillingAddress,
} from "../../features/products/billingSlice";

function Checkout() {
  const location = useLocation();
  const token = useSelector((state) => state.auth.userDetails);
  const billingAddress = useSelector(
    (state) => state.billingAddress.billingAddress
  );
  const isLoadingBillingAddress = useSelector(
    (state) => state.billingAddress.isLoading
  );
  let products = location.state.items;
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const query = queryString.parse(location.search);

  const handleSubmit = async (e) => {
    let result = V.validate(e, validationScheme);

    if (e.country === "") {
      result.hasError = true;
      result.errors.country = "Country is required";
    }
    if (e.province === "") {
      result.hasError = true;
      result.errors.province = "State/teritoty is required";
    }
    if (e.delivery === "") {
      result.errors.delivery = "Please select a delivery method";
      result.hasError = true;
    }

    if (result.hasError) {
      console.log(result);
      setErrors({ ...result });
      return;
    }
    localStorage.setItem("checkoutPage", JSON.stringify(location));
    dispatch(createBillingAddres({ data: e, token }));
    
  };

  useEffect(() => {
    if (query?.page === "2") {
      products = JSON.parse(localStorage.getItem("checkoutPage"));
    }
  }, [query, location.state]);

  useEffect(() => {
    dispatch(retriveBillingAddress());
  }, []);

  return billingAddress?.length > 0 &&
    queryString.parse(location.search).page === undefined ? (
    <Navigate
      to={"/products/checkout?page=2"}
      state={{ items: location.state.items }}
      replace
    />
  ) : (
    <div className="pb-16">
      <MyModal />
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-5 lg:w-11/12 mx-auto">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          El Classic Jewery Shop
        </Link>
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <p className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </p>
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <p
                  className={`${
                    query?.page === "2"
                      ? "flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                      : "flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                  }`}
                >
                  2
                </p>
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
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

      {query?.page === "2" ? (
        <div className="lg:grid sm:px-5 lg:grid-cols-12 lg:w-11/12   lg:gap-x-5 space-y-5 mx-auto  justify-between items-start ">
          <div className="px-4 pt-8 lg:col-span-7 lg:sticky top-[0vh] ">
            <p className="text-xl font-medium">Order Summary</p>
            <p className="text-gray-400">
              Check your items. And select a suitable shipping method.
            </p>
            <div className="lg:hidden">
              <PanelGroup accordion defaultActiveKey={1} bordered>
                <Panel
                  header={
                    <div className="flex items-center justify-start ">
                      <p className="text-xl font-medium  "> Items</p>
                    </div>
                  }
                  eventKey={2}
                  id="panel2"
                >
                  <div className="mt-5 space-y-3 rounded-lg  bg-white ">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="flex justify-center items-center rounded-lg bg-white "
                      >
                        <div className="inline-flex relative ">
                          <img
                            className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                            src={product.img1}
                            alt={product.name}
                          />
                          <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-[#282828] border-2 border-white rounded-full top-4 end-0 dark:border-gray-900">
                            {product.count}
                          </div>
                        </div>

                        <div className="flex w-full flex-col px-5 py-2">
                          <span className="font-light text-sm lg:w-9/12">
                            {product.name}
                          </span>

                          <p className="font-semibold font-mont">
                            ${numeral(product.price).format()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>{" "}
                </Panel>
              </PanelGroup>
            </div>
            <div className="mt-5 space-y-3 rounded-lg hidden lg:block bg-white ">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex justify-center items-center rounded-lg bg-white "
                >
                  <div className="inline-flex relative ">
                    <img
                      className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                      src={product.img1}
                      alt={product.name}
                    />
                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-[#282828] border-2 border-white rounded-full top-4 end-0 dark:border-gray-900">
                      {product.count}
                    </div>
                  </div>

                  <div className="flex w-full flex-col px-5 py-2">
                    <span className="font-light text-sm lg:w-9/12">
                      {product.name}
                    </span>

                    <p className="font-semibold font-mont">
                      ${numeral(product.price).format()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 px-4 lg:col-span-5 lg:sticky top-[0vh]">
            {/*PAYMENT SECTION */}

            <div className="shipping  ">
              <p className="text-xl font-medium">Shiping Address</p>
              <div className="lg:flex justify-between items-start">
                <div className="adds lg:w-10/12 ">
                  {billingAddress.map((address,id) => {
                    console.log(address)
                    return (
                      <div className="relative py-3 w-12/12 ">
                        <input
                          className="peer hidden"
                          id={address.id}
                          type="radio"
                          name="delivery"
                          value={"standard"}
                          checked={id===0}
                          // onChange={(e) => handleChange(e.target.value, "delivery")}
                        />
                        <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                        <label
                          className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                          htmlFor={address.id}
                        >
                          <img
                            className="w-14 object-contain"
                            src="/images/naorrAeygcJzX0SyNI4Y0.png"
                            alt=""
                          />
                          <div className="">
                            <span className="mt-2 font-semibold">
                             {address.country}
                            </span>
                            <p className="text-slate-500 text-sm leading-6">
                             {address.province} / {address.postcode}
                            </p>
                          </div>
                        </label>
                      </div>
                    );
                  })}
                </div>
                <p className="py-3 text-end cursor-pointer "><Link to={"/accounts/new-billings"} className="underline underline-offset-2 text-sm text-[#282828] font-mont">Add new
                </Link> </p>
              </div>
            </div>
            <div className="bg-slate-50">
              <Payment />
            </div>
          </div>
        </div>
      ) : (
        <div className="lg:grid sm:px-5 lg:grid-cols-12 lg:w-11/12   lg:gap-x-5 space-y-5 mx-auto  justify-between items-start ">
          <div className="px-4 pt-8 lg:col-span-5 lg:sticky top-[0vh] ">
            <p className="text-xl font-medium">Order Summary</p>
            <p className="text-gray-400">
              Check your items. And select a suitable shipping method.
            </p>

            <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex justify-center items-center rounded-lg bg-white "
                >
                  <div className="inline-flex relative ">
                    <img
                      className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                      src={product.img1}
                      alt={product.name}
                    />
                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-[#282828] border-2 border-white rounded-full top-4 end-0 dark:border-gray-900">
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
            <p className="mt-8 text-lg font-medium">
              Shipping Address/ Methods
            </p>
            {/* SHIPPING ADDRESS INPUT Form */}
            <BillingAddFormInput isLoading={isLoadingBillingAddress} error={errors} onSubmit={handleSubmit} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
