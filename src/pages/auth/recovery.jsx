import React, { useState } from "react";
import Header from "../../components/shared/header";
import LoginForm from "../../sections/loginForm";
import Footer from "../../components/shared/footer";
import FormInput from "../../components/input";
import { useDispatch, useSelector } from "react-redux";
import { recoverAccount, showAlert } from "../../features/auth/authSlice";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Spinner from "../../components/spinner";

function Recovery() {
  const { register, handleSubmit } = useForm();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    console.log(e);
    if (e.Email === "") {
      dispatch(
        showAlert({
          message: "Email Required",
          type: "danger",
          title: "Password Recovery",
        })
      );
      return;
    }
    dispatch(recoverAccount({ email: e.Email }));
  };

  return (
    <div className=" ">
      <Header />
      <div className="p headings text-5xl font-mont tracking-tight font-normal  text-center pt-20">
        Recover password
      </div>
      <form
        className="py-20 px-10 flex flex-col justify-center items-center "
        action="/"
        onSubmit={handleSubmit(onSubmit)}
        method="post"
      >
        <div className="mb-5 font-mont lg:w-4/12 md:w-6/12 ">
          Please Enter your registered Email
        </div>
        <FormInput label={"Email"} register={register} type={"email"} />

        <div className="formgroup lg:w-4/12 md:w-6/12 w-full mt-3 ">
          <button
            disabled={isLoading}
            type="submit"
            class="bg-[#282828] w-full text-white py-3 text-lg text-center"
          >
            {isLoading ? <Spinner /> : " Reset Password"}
          </button>

          <p className="text-xs font-mont  mt-3">
            Remember your password? &nbsp;
            <Link
              to={"/account/login"}
              className="underline underline-offset-4"
            >
              Back to login
            </Link>
          </p>
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default Recovery;
