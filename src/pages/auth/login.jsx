import React from "react";
import Header from "../../components/shared/header";
import Footer from "../../components/shared/footer";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginForm from "../../sections/loginForm";


function Login() {
  const location = useLocation();
  const auth = useSelector((state) => state.auth.authenticated);
  let from = location.state?.from?.pathname || "/";
  if (!auth) {
    return (
      <div className="page bg-white">
        <Header />
        <LoginForm />
        <Footer />
      </div>
    );
  }
  return <Navigate to={from} state={location.state?.other} replace />;
}

export default Login;
