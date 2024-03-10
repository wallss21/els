import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Timed = () => {
  const navigate = useNavigate();
  const [sec, setSec] = useState(4);

  let time;
  if (sec > 0) {
    time = setTimeout(() => {
      setSec(sec - 1);
    }, 1000);
  } else {
    navigate("/");
    clearTimeout(time);
  }

  return sec;
};

const ErrorPage = () => {
  useEffect(() => {}, []);

  return (
    <div className="px-5">
      <div className="flex flex-col justify-center items-center h-[100vh]">
        <div className="text-center font-mont font-light text-8xl mb-10">Oops! </div>
        <div className="text font-mont font-light text-5xl text-center ">
          Sorry Page Not Found{" "}
        </div>
        <div className="mt-16"> redirecting to shop in {<Timed />} sec</div>{" "}
      </div>
    </div>
  );
};

export default ErrorPage;
