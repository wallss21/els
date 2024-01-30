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

  const handleOnChane = (name, data) => {
    setPass({ ...pass, [name]: data });
  };

  return (
    <div>
      <Header />
      <section className="bg-white">
        <div className="container mx-auto max-w-screen-lg">
          <form
            className="min-h-[80vh] w-full flex flex-col items-center justify-center"
            onSubmit={(e) => {
              e.preventDefault();
              if (from === undefined || from === null) navigate("/");
              console.log("SUbmited");

              console.log(from.split("/")[from.split("/").length - 2]);
              console.log(from.split("/")[from.split("/").length - 3]);
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
            }}
            action="/"
            method="post"
          >
            {""}
            <FormInput
              id={"password1"}
              name={"password1"}
              type={"password"}
              value={pass.password1}
              onChange={handleOnChane}
            />
            <FormInput
              id={"password2"}
              placeholder="Repeat Password"
              type={"password"}
              value={pass.password2}
              onChange={handleOnChane}
              name={"password2"}
            />
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
