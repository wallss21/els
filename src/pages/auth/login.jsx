import React, { useEffect } from "react";
import Header from "../../components/shared/header";
import Footer from "../../components/shared/footer";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginForm from "../../sections/loginForm";
import { createAlert } from "../../features/auth/authSlice";

function Login() {
  const location = useLocation();
  const auth = useSelector((state) => state.auth.authenticated);
  let from = location.state?.from?.pathname || "/";
  
  useEffect(() => {
    window.scrollTo(0, 0);
    let message = location.state?.message;
    message?.title  &&
      createAlert({
        title: message.title,
        message: message.message,
        type: message.type,
      });
      return ()=> {
        
       if(message?.title){ location.state.message=null
        message=null
       }
      }
  }, []);
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
