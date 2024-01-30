import React, { useState } from "react";

function CheckBoxInput({ handler, data, id }) {
  const [state, setState] = useState(false);

  return (
    <div key={id} className="flex items-center mb-4">
      <input
        id={data.toLowerCase().replace("-", "_")}
        type="checkbox"
        checked={state}
        onChange={(e) => {
          handler(state, data);
          setState(!state);
        }}
        // value={state}
        className="w-4 h-4 accent-[#282828] text-[#282828] border-[#282828]  rounded-none "
      />
      <label
        htmlFor={data.toLowerCase().trim().replace("-", "_")}
        className="ms-2 text-sm font-medium text-[#282828] "
      >
        {data}
      </label>
    </div>
  );
}

export default CheckBoxInput;
