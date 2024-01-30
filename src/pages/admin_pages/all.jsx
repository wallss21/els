import React from "react";
import { useLocation } from "react-router-dom";
import BaseTemplate from "./base_template";

function All() {
  const location = useLocation();
  return (
    <div>
      <BaseTemplate />
    </div>
  );
}

export default All;
