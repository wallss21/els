import React, { useState } from "react";
import Header from "../../components/shared/header";
import FormInput from "../../components/input";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../features/auth/authSlice";
import { Title } from "../../components/text";

function NewPassword() {
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [pass, setPass] = useState({ password1: "", password2: "" });
  const [error, setError] = useState({ err1: "", err2: "", gerror: "" });

  const handleOnChane = (e) => {
    setPass({ ...pass, [e.currentTarget.name]: e.target.value });
    setError({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (from === undefined || from === null) return navigate("/");

    if (pass.password1.trim() === "") {
      return setError({ ...error, err1: "this field can not be empty" });
    }
    if (pass.password1.length < 7) {
      return setError({
        ...error,
        err1: "Password must be at leaset 7 charaters ",
      });
    }
    if (pass.password2.trim() === "") {
      return setError({ ...error, err2: "this field can not be empty" });
    }
    if (pass.password1 !== pass.password2) {
      return setError({ gerror: "password does not match" });
    }
    let data = {
      route: {
        email: from.split("/")[from.split("/").length - 3],
        time: from.split("/")[from.split("/").length - 2],
      },
      password1: pass.password1,
      password2: pass.password2,
    };
    dispatch(resetPassword(data));

    // TODO  grap the current url,
    // TODO  redirect the user and attach the above saved url to the new page,
    // TODO  On the new page present the new password form, on submit , attach the that saved url and send to for verification and modification
  };

  return (
    <div>
      <Header />
      <section className="bg-white">
        <div className="container mx-auto max-w-screen-lg">
          <form
            className="min-h-[80vh] w-full flex flex-col items-center justify-center"
            onSubmit={handleSubmit}
            action="/"
            method="post"
          >
            <p className="text-2xl font-mont font-semibold tex-center text-[#282828] pb-5"> Reset Password</p>

            <div className="input_group lg:w-4/12 md:w-6/12 mb-4 w-full">
              {/* <label htmlFor={id}>{name}</label> */}
              <input
                name="password1"
                onChange={handleOnChane}
                value={pass.password1}
                type="password"
                placeholder="Enter New Password"
                className="w-full border border-gray-300 px-3 py-4 mt-2 mb-1 placeholder-[#282828] font-light text-[#282828] font-mont text-sm"
              />
              {error.err1 && (
                <p className="text-red-500 text-sm">{error.err1}</p>
              )}
            </div>
            <div className="input_group lg:w-4/12 mb-4 md:w-6/12 w-full">
              <input
                name="password2"
                onChange={handleOnChane}
                value={pass.password2}
                type="password"
                placeholder="Re-enter New Password"
                className="w-full border border-gray-300 px-3 py-4 mt-2 mb-1 placeholder-[#282828] font-light text-[#282828] font-mont text-sm"
              />
              {error.err2 && (
                <p className="text-red-500 text-sm">{error.err2}</p>
              )}
              {error.gerror && (
                <p className="text-red-500 text-sm">{error.gerror}</p>
              )}
            </div>
            <div className="formgroup">
              <button
                type="submit"
                className="bg-[#282828] w-full py-4 px-10 mt-5 "
              >
                <Title title={"Reset Password"} color={"text-white"} />
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default NewPassword;
