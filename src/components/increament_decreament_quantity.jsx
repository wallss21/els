import React, { useState } from "react";

function IncreamentDecreamentQuantity({adjustItem,item_count}) {
 
  return (
    <div className="quantity mb-5">
      <div className=" w-fit  py-3 ">
        <span
          onClick={() => adjustItem("decrement")}
          className="border ripple-bg-white py-4 px-5 text-center cursor-pointer"
        >
          -
        </span>
        <span className="border-y py-4 px-5 text-center ">{item_count}</span>
        <span
          onClick={() => adjustItem("increment")}
          className="border ripple-bg-white py-4 px-5 text-center cursor-pointer"
        >
          +
        </span>
      </div>
    </div>
  );
}

export default IncreamentDecreamentQuantity;
