import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Title } from "../components/text";
import { useDispatch, useSelector } from "react-redux";
import { login, showAlert } from "../features/auth/authSlice";
import FormInput from "../components/input";
import { useForm } from "react-hook-form";
import Spinner from "../components/spinner";

function LoginForm() {
  const { register, handleSubmit } = useForm();
  const isLoading = useSelector((state) => state.auth.isLoading);

  const dispatch = useDispatch();
  const onSubmit = (e) => {
    console.log(e);
    if (e.Email.trim() === "")
      return dispatch(
        showAlert({
          message: "Email field is required",
          type: "danger",
          title: "Authentication",
        })
      );

    if (e.Password.trim() === "")
      return dispatch(
        showAlert({
          message: "Password field is required",
          type: "danger",
          title: "Authentication",
        })
      );
    dispatch(login({ email: e.Email, password: e.Password }));
  };

  return (
    <section>
      <div className="main">
        <div className="px-5 lg:px-0 container mx-auto t">
          <div className="text-center">
            {" "}
            <h3 className="mt-16 pb-5 text-[44px] font-[500] font-mont ">
              Login
            </h3>
            <p className="font-mont text-sm pb-10">
              Please enter your e-mail and password:
            </p>
          </div>
          <form
            action="/"
            onSubmit={handleSubmit(onSubmit)}
            className="w-full pb-10"
            method="post"
          >
            <div className="inputs flex  flex-col justify-center items-center  ">
              <FormInput register={register} label={"Email"} type={"email"} />
              <FormInput
                register={register}
                label={"Password"}
                type={"password"}
              />
              <div className="input_group  lg:w-4/12 md:w-6/12 w-full  flex justify-end">
                <Link to={"/account/recovery"}>
                  <span className="text-xs font-light font-mont text-[#282828] underline underline-offset-4">
                    forgot password ?
                  </span>
                </Link>
              </div>

              <button
                type="submit"
                className=" lg:w-4/12 md:w-6/12 w-full mt-3 py-4 uppercase bg-[#282828] "
              >
                {isLoading ? (
                  <Spinner  />
                ) : (
                  <Title
                    title={"Login Account"}
                    text_s={"text-sm "}
                    color={"text-white"}
                  />
                )}
              </button>
              <p className="text-sm font-light font-mont mt-5">
                New customer?
                <Link
                  to={"/account/register"}
                  className="underline underline-offset-2 pl-1 accent-[#282828]                    "
                >
                  Create an account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
