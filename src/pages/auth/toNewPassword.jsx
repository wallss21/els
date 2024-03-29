import React from "react";

import { Navigate, useLocation } from "react-router-dom";

function ToNewPassword() {
  const location = useLocation();
  console.log(location)

  return (
    <Navigate
      to={"/accounts/recovery/reset-password"}
      state={{ from: location }}
      replace={true}
    />
  );
}

export default ToNewPassword;
