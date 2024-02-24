import React from "react";
import { Outlet } from "react-router-dom";
import AuthModal from "../../components/modals/AuthModal";

function AccountFrame() {
  return (
    <div>
      <AuthModal />
      <Outlet />
    </div>
  );
}

export default AccountFrame;
