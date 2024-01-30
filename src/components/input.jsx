import React from "react";
import { useForm } from "react-hook-form";

function FormInput({
  type,
  id,

  register,
  label,
  required,
}) {
  const {
    formState: { errors },
  } = useForm();

  return (
    <div key={id} className="input_group lg:w-4/12 md:w-6/12 w-full">
      {/* <label htmlFor={id}>{name}</label> */}
      <input
        {...register(label, { required })}
        type={type}
        placeholder={label}
        aria-invalid={errors.firstName ? "true" : "false"}
        className="w-full border border-gray-300 px-3 py-4 mt-2 mb-4 placeholder-[#282828] font-light text-[#282828] font-mont text-sm"
      />
      {errors[label]?.type === "required" && (
        <p role="alert">First name is required</p>
      )}
    </div>
  );
}

export default FormInput;
