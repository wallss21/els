import React, { useState } from "react";
import {
  world_country as countries,
  us_province as usa,
  australian_province as au,
} from "../assets/country_json";
import Select from "react-select";
import { Link } from "react-router-dom";

const FormInput = ({ type, id, name, value, onChange, placeholder }) => {
  return (
    <div key={id} className="input_group w-full ">
      <label htmlFor={id}>{name}</label>
      <input
        id={id}
        type={type}
        name={name}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        value={value}
        placeholder={placeholder}
        aria-invalid={"true"}
        className="w-full border border-gray-300 px-3 py-3 mt-2 placeholder-[#282828] font-light text-[#282828] font-mont text-sm"
      />
    </div>
  );
};

const BillingAddFormInput = ({ error, onSubmit }) => {
  const [formState, setFormState] = useState({
    email: "",
    suburb: "",
    first_name: "",
    last_name: "",
    postcode: "",
    address: "",
    country: "",
    province: "",
    phone: "",
    delivery: "",
  });

  const handleChange = (data, field) => {
    setFormState({ ...formState, [field]: data.trim() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formState);
  };

  return (
    <div className="py-10 ">
      <form
        onSubmit={handleSubmit}
        action="/"
        method="post"
        className="xl:px-10"
      >
        <div className=" mb-4">
          <FormInput
            type={"email"}
            id={"email"}
            placeholder={"Email"}
            name={"Email"}
            value={formState.email}
            onChange={(e) => handleChange(e, "email")}
          />
          {error.errors?.email && (
            <p className=" capitalize text-red-400" role="alert">
              {error.errors?.email}
            </p>
          )}
        </div>

        {/* COUNTRY SELECT */}
        <div className="py-3">
          <label htmlFor="country" className="pb-2">
            Country
          </label>
          <Select
            options={countries}
            name="country"
            placeholder="Country"
            onChange={(e) => handleChange(e.label, "country")}
          />
          {error.errors?.country && (
            <p className=" capitalize text-red-400" role="alert">
              {error.errors?.country}
            </p>
          )}
        </div>
        {formState.country === "United States" && (
          <div className="py-3">
            <label htmlFor="usProvince">Province</label>
            <Select
              id="usProvince"
              options={usa}
              name="province"
              placeholder="Province"
              onChange={(e) => handleChange(e.label, "province")}
            />
            {error.errors?.province && (
              <p className=" capitalize text-red-400" role="alert">
                {error.errors?.province}
              </p>
            )}
          </div>
        )}
        <div className="lg:grid gap-x-3 grid-cols-3">
          {formState.country === "Australia" && (
            <div className="py-3">
              <label htmlFor="province">Province</label>
              <Select
                id="province"
                options={au}
                placeholder="Province"
                className={"py-4"}
                // styles={{paddingTop:"20px"}}
                name="province"
                onChange={(e) => handleChange(e.label, "province")}
              />
              {error.errors?.province && (
                <p className=" capitalize text-red-400" role="alert">
                  {error.errors?.province}
                </p>
              )}
            </div>
          )}
          {formState.country !== "Australia" &&
            formState.country !== "United States" && (
              <div className="mb-3">
                <FormInput
                  placeholder={"state/Teritory"}
                  id={"province"}
                  onChange={(e) => {
                    handleChange(e, "province");
                  }}
                  name={"Province"}
                  value={formState.province}
                />
                {error.errors?.province && (
                  <p className=" capitalize text-red-400" role="alert">
                    {error.errors?.province}
                  </p>
                )}
              </div>
            )}
          <div className="mb-3">
            <FormInput
              name={"Suburb"}
              placeholder={"Suburb"}
              id={"suburb"}
              value={formState.suburb}
              onChange={(e) => handleChange(e, "suburb")}
            />
            {error.errors?.suburb && (
              <p className=" capitalize text-red-400" role="alert">
                {error.errors?.suburb}
              </p>
            )}
          </div>
          <div className="mb-3">
            <FormInput
              name={"Postcode"}
              placeholder={"Postcode"}
              id={"postcode"}
              value={formState.postcode}
              onChange={(e) => handleChange(e, "postcode")}
            />{" "}
            {error.errors?.postcode && (
              <p className=" capitalize text-red-400" role="alert">
                {error.errors?.postcode}
              </p>
            )}
          </div>
        </div>
        <div className="lg:grid grid-cols-2 gap-x-4">
          <div className="mb-3">
            <FormInput
              name={"First Name"}
              id={"firt_name"}
              placeholder={"First Name"}
              value={formState.first_name}
              onChange={(e) => handleChange(e, "first_name")}
            />
            {error.errors?.first_name && (
              <p className=" capitalize text-red-400" role="alert">
                {error.errors?.first_name}
              </p>
            )}
          </div>
          <div className="mb-3">
            <FormInput
              name={"Last Name"}
              placeholder={"Last Name"}
              id={"last_name"}
              value={formState.last_name}
              onChange={(e) => handleChange(e, "last_name")}
            />
            {error.errors?.last_name && (
              <p className=" capitalize text-red-400" role="alert">
                {error.errors?.last_name}
              </p>
            )}
          </div>
        </div>
        <div className="mb-3">
          <FormInput
            id={"address"}
            name={"Address"}
            placeholder={"Address"}
            value={FormInput.address}
            onChange={(e) => handleChange(e, "address")}
          />{" "}
          {error.errors?.address && (
            <p className=" capitalize text-red-400" role="alert">
              {error.errors?.address}
            </p>
          )}
        </div>
        <div className="mb-3">
          <FormInput
            id={"address2"}
            name={"Address "}
            value={FormInput.address2}
            placeholder={"Address 2 Optional"}
            onChange={(e) => handleChange(e, "address2")}
          />
          {error.errors?.address2 && (
            <p className=" capitalize text-red-400" role="alert">
              {error.errors?.address2}
            </p>
          )}
        </div>
        <div className="mb-3">
          <FormInput
            placeholder={"Phone"}
            type={"number"}
            value={FormInput.phone}
            id={"phone"}
            name={"Phone"}
            onChange={(e) => handleChange(e, "phone")}
          />{" "}
          {error.errors?.phone && (
            <p className=" capitalize text-red-400" role="alert">
              {error.errors?.phone}
            </p>
          )}
        </div>
        <div className="relative py-3">
          <input
            className="peer hidden"
            id="radio_1"
            type="radio"
            name="delivery"
            value={"standard"}
            onChange={(e) => handleChange(e.target.value, "delivery")}
          />
          <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
          <label
            className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
            htmlFor="radio_1"
          >
            <img
              className="w-14 object-contain"
              src="/images/naorrAeygcJzX0SyNI4Y0.png"
              alt=""
            />
            <div className="">
              <span className="mt-2 font-semibold">Standard Delivery</span>
              <p className="text-slate-500 text-sm leading-6">
                Delivery: 7-14 Days
              </p>
            </div>
          </label>
        </div>
        <div className="relative py-3">
          <input
            className="peer hidden"
            id="radio_2"
            type="radio"
            name="delivery"
            onChange={(e) => handleChange(e.target.value, "delivery")}
            value={"express"}
          />
          <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
          <label
            className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
            htmlFor="radio_2"
          >
            <img
              className="w-14 object-contain"
              src="/images/oG8xsl3xsOkwkMsrLGKM4.png"
              alt=""
            />
            <div className="">
              <span className="mt-2 font-semibold">Express Delivery</span>
              <p className="text-slate-500 text-sm leading-6">
                Delivery: 2-7 Days
              </p>
            </div>
          </label>
        </div>
        {error.errors?.delivery && (
            <p className=" capitalize text-red-400" role="alert">
              {error.errors?.delivery}
              </p>
          )}
        <div className="flex justify-between items-center mt-5">
          <p className="text-xs underline">
            <Link to={"/"}>shop more</Link>
          </p>
          <button
            className="bg-[#282828] text-white  py-3 lg:px-10 px-5"
            type="submit"
          >
            Continue to Checkout
          </button>
        </div>

        {/* END COUNTRY SELECT */}
      </form>
    </div>
  );
};

export default BillingAddFormInput;
