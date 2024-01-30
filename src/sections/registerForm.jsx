import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { register as register_, showAlert } from "../features/auth/authSlice";
import FormInput from "../components/input";
import { Title } from "../components/text";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Spinner from "../components/spinner";

function RegisterForm() {
  const { register, handleSubmit } = useForm();
  const isLoading = useSelector((state) => state.auth.isLoading);

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    if (e.Password === "")
      return dispatch(
        showAlert({
          message: "Password is Required",
          type: "danger",
          title: "Registration Form Error",
        })
      );
    if (e.Email === "")
      return dispatch(
        showAlert({
          message: "Email is Required",
          type: "danger",
          title: "Registration Form Error",
        })
      );
    if (e.FirstName === "")
      return dispatch(
        showAlert({
          message: "First Name is Required",
          type: "danger",
          title: "Registration Form Error",
        })
      );
    if (e.LastName === "")
      return dispatch(
        showAlert({
          message: "Last Name is Required",
          type: "danger",
          title: "Registration Form Error",
        })
      );

    dispatch(
      register_({
        first_name: e.FirstName,
        last_name: e.LastName,
        email: e.Email,
        password: e.Password,
      })
    );
  };

  return (
    <section>
      <div className="main">
        <div className="px-5 lg:px-0 container mx-auto t">
          <div className="text-center">
            {" "}
            <h3 className="mt-16 pb-5 text-[44px] font-[500] font-mont ">
              Register
            </h3>
            <p className="font-mont text-sm pb-10">
              Please fill in the information below:
            </p>
          </div>
          <form
            action="/"
            onSubmit={handleSubmit(onSubmit)}
            className="w-full pb-10"
            method="post"
          >
            <div className="inputs flex  flex-col justify-center items-center  ">
              <FormInput
                register={register}
                label={"FirstName"}
                type={"text"}
              />
              <FormInput register={register} label={"LastName"} type={"text"} />
              <FormInput register={register} label={"Email"} type={"email"} />
              <FormInput
                register={register}
                label={"Password"}
                type={"password"}
              />

              <button
                disabled={isLoading}
                type="submit"
                className="w-full lg:w-4/12 py-4 mt-5 uppercase bg-[#282828] "
              >
                {isLoading ? (
                  <Spinner />
                ) : (
                  <Title
                    title={"Create Account"}
                    text_s={"text-sm "}
                    color={"text-white"}
                  />
                )}
              </button>
              <p className="text-sm font-light font-mont mt-2">
                Already have an account?
                <Link
                  className="underline underline-offset-2 pl-1
          accent-[#282828]
              "
                  to={"/account/login"}
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default RegisterForm;
