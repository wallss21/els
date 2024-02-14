import React from "react";
import Header from "../../components/shared/header";
import Footer from "../../components/shared/footer";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import RegisterForm from "../../sections/registerForm";

function Register() {
  const location = useLocation();
  const auth = useSelector((state) => state.auth.authenticated);
  const justReg = useSelector((state) => state.auth.new_reg);
  let from = location.state?.from?.pathname || "/";

  if (!auth) {
    return justReg ? (
      <Navigate to={"/accounts/login"} />
    ) : (
      <div className="page bg-white">
        <Header />
        <RegisterForm />
        <Footer />
      </div>
    );
  }
  return <Navigate to={from} replcae />;
}

export default Register;
