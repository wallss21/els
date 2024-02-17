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
          console.log(e.target.value);
          onChange(e.target.value, "email");
        }}
        value={value}
        placeholder={placeholder}
        // aria-invalid={errors.firstName ? "true" : "false"}
        className="w-full border border-gray-300 px-3 py-3 mt-2 mb-4 placeholder-[#282828] font-light text-[#282828] font-mont text-sm"
      />
      {/* {errors[label]?.type === "required" && (
        <p role="alert">First name is required</p>
      )} */}
    </div>
  );
};

const BillingAddFormInput = ({ onSubmit }) => {
  const [errors, setErrors] = useState({});
  const [formState, setFormState] = useState({
    country: "",
    province: "",
    email: "",
    suburb: "",
    first_name: "",
    last_name: "",
    postcode: "",
    address: "",
    phone: "",
    delivery: "",
  });

  const handleChange = (data, field) => {
    setErrors({});
    setFormState({ ...formState, [field]: data });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let deliElem = window.document.getElementsByName("delivery");
    for (let i = 0; i < deliElem.length; i++) {
      if (deliElem[i].checked) {
        setFormState({ ...formState, delivery: deliElem[i].value });
      }
    }
    Object.entries(formState).map((entry) => {
      return entry[1] === ""
        ? setErrors({ ...errors, [entry[0]]: "can not be empty" })
        : console.log(entry[1]);
    });
    console.log(errors);
    Object.keys(errors).length === 0 && onSubmit(formState);
  };

  return (
    <div className="py-10 ">
      <form onSubmit={handleSubmit} action="/" method="post">
        <FormInput
          message={errors}
          type={"email"}
          id={"email"}
          placeholder={"Email"}
          name={"email"}
          value={formState.email}
          onChange={handleChange}
        />

        {/* COUNTRY SELECT */}
        <div className="py-3">
          {" "}
          <Select
            options={countries}
            name="country"
            placeholder="Country"
            onChange={(e) => handleChange(e.label, "country")}
          />
        </div>
        {formState.country === "United States" && (
          <div className="py-3">
            {" "}
            <Select
              options={usa}
              name="province"
              placeholder="Province"
              onChange={(e) => handleChange(e.label, "province")}
            />
          </div>
        )}
        <div className="lg:grid gap-x-3 grid-cols-3">
          {formState.country === "Australia" && (
            <div className="py-3">
              <Select
                options={au}
                placeholder="Province"
                className={"py-4"}
                // styles={{paddingTop:"20px"}}
                name="province"
                onChange={(e) => handleChange(e.label, "province")}
              />
            </div>
          )}
          {formState.country !== "Australia" &&
            formState.country !== "United States" && (
              <FormInput
                placeholder={"state/Teritory"}
                id={"province"}
                onChange={(e) => {
                  handleChange(e, "province");
                }}
                name={"province"}
              />
            )}
          <FormInput
            name={"suburb"}
            placeholder={"Postcode"}
            onChange={(e) => handleChange(e, "suburb")}
          />
          <FormInput
            name={"postcode"}
            placeholder={"Suburb"}
            onChange={(e) => handleChange(e, "postcode")}
          />
        </div>
        <div className="lg:grid grid-cols-2 gap-x-4">
          <FormInput
            placeholder={"first_name"}
            onChange={(e) => handleChange(e, "first_name")}
          />

          <FormInput
            placeholder={"last_name"}
            onChange={(e) => handleChange(e, "last_name")}
          />
        </div>

        <FormInput
          value={FormInput.address}
          placeholder={"Address"}
          onChange={(e) => handleChange(e, "address")}
        />
        <FormInput
          value={FormInput.address2}
          placeholder={"Address 2 Optional"}
          onChange={(e) => handleChange(e, "address2")}
        />
        <FormInput
          placeholder={"Phone"}
          type={"number"}
          value={FormInput.phone}
          name={"phone"}
          onChange={(e) => handleChange(e, "phone")}
        />
        <div className="relative py-3">
          <input
            className="peer hidden"
            id="radio_1"
            type="radio"
            name="delivery"
            value={"standard"}
            checked
          />
          <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
          <label
            className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
            for="radio_1"
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
            value={"express"}
          />
          <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
          <label
            className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
            for="radio_2"
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
