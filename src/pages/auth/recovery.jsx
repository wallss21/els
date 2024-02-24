import V from "max-validator"
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, recoverAccount, showAlert } from "../../features/auth/authSlice";
import FormInput from "../../components/input";
import { useForm } from "react-hook-form";
import Spinner from "../../components/spinner";
import { Title } from "../../components/text";
import Header from "../../components/shared/header";

function Recovery() {
  const { register, handleSubmit } = useForm();
  const isLoading = useSelector((state) => state.auth.isLoading);

  const dispatch = useDispatch();
  const onSubmit = (e) => {
    // V.validate(e.,b)
    if (e.Email.trim() === "")
      return dispatch(
        showAlert({
          message: "Email field is required",
          type: "danger",
          title: "Authentication",
        })
      );

   
    dispatch(recoverAccount({ email: e.Email}));
  };

  return (
   <div className="">
    <Header/>
     <section>
      <div className="main">
        <div className="px-5 lg:px-0 container mx-auto t">
          <div className="text-center">
            {" "}
            <h3 className="mt-16 pb-5 text-[40px] font-[500] font-mont ">
              Recover Account
            </h3>
            <p className="font-mont text-sm pb-10">
              Please enter your registered e-mail
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
              
             
              <button 
              disabled={isLoading}
                type="submit"
                className=" lg:w-4/12 md:w-6/12 w-full mt-3 py-4 uppercase bg-[#282828] "
              >
                {isLoading ? (
                  <Spinner  />
                ) : (
                  <Title
                    title={"Recover Password"}
                    text_s={"text-sm "}
                    color={"text-white"}
                  />
                )}
              </button>
              <p className="text-sm font-light font-mont mt-5">
               Remember password?  &nbsp;
                <Link
                  to={"/accounts/login"}
                  className="underline underline-offset-2 pl-1 accent-[#282828]                    "
                >
                 Back to login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
   </div>
  );
}

export default Recovery;
















