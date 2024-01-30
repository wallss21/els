import React from "react";

function CategoryBanner({ data }) {
  return (
    <div
      className="top  "
      style={{
        backgroundPosition: "center",
        backgroundImage: data.url,
      }}
    >
      <div className="overlay bg-black bg-opacity-20 py-24 lg:py-32">
        <p className="text-5xl text-white font-mont font-meduim  text-center">
          {data.title}
        </p>
      </div>
    </div>
  );
}

export default CategoryBanner;
