import React, { useState } from "react";

const FormInput = ({ type, id, name, value, placeholder }) => {
  return (
    <div key={id} className="input_group lg:w-4/12 md:w-6/12 w-full">
      <label htmlFor={id}>{name}</label>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        // aria-invalid={errors.firstName ? "true" : "false"}
        className="w-full border border-gray-300 px-3 py-4 mt-2 mb-4 placeholder-[#282828] font-light text-[#282828] font-mont text-sm"
      />
      {/* {errors[label]?.type === "required" && (
        <p role="alert">First name is required</p>
      )} */}
    </div>
  );
};

const BillingAddFormInput = () => {
  const [formState, setFormState] = useState({
    country: "",
    province: "",
    postal: "",
    code: "",
    email: "",
  });
  const fields = ["country", "province", "postal code", "email"];
  return (
    <div className="py-10 px-5">
      <form action="/" method="post">
        {fields.map((input) => {
          return (
            <FormInput
              type={"text"}
              id={input}
              name={input}
              placeholder={input.toUpperCase()}
              value={formState[input]}
            />
          );
        })}
      </form>
    </div>
  );
};


export default  BillingAddFormInput