import React from "react";

function CartIcon({ width, height, stroke_width }) {
  return (
    <svg
      focusable="false"
      width={width === undefined ? "20" : width}
      height={height === undefined ? "18" : height}
      className="icon icon--header-cart   "
      viewBox="0 0 20 18"
    >
      <path
        d="M3 1h14l1 16H2L3 1z"
        fill="none"
        stroke="currentColor"
        stroke-width={stroke_width === undefined ? "1" : stroke_width}
      ></path>
      <path
        d="M7 4v0a3 3 0 003 3v0a3 3 0 003-3v0"
        fill="none"
        stroke="currentColor"
        stroke-width="1"
      ></path>
    </svg>
  );
}

export default CartIcon;
