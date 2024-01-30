import React from "react";
import { Title } from "../components/text";
import { Button } from "../components/text";

function Cto() {
  return (
    <section className="">
      <div className="cto px-5 lg:px-10 container mx-auto  ">
        <div className="lg:grid grid-cols-11 w-full py-4 items-center gap-x-10">
          <div className=" col-span-5 px-4 lg:px-0">
            {" "}
            <img
              src="https://www.wallacebishop.com.au/cdn/shop/files/Catalogue_Less_Shadow_600x.jpg?v=1697585155"
              alt="books"
              srcSet=""
            />
          </div>{" "}
          <div className="text px-3 font-mont font-xs font-light text-[#282828] col-span-6 ">
            <div className="title text-center lg:text-start">
              {" "}
              <Title title={"SHOP OUR CHRISTMAS CATALOGUE"} />
            </div>{" "}
            <p className="mt-5 text-center text-sm  text-14 letspacing-1 ">
              Explore this year's Christmas catalogue filled with marvelous gift
              ideas. Discover hidden gems that will leave your friends and
              family wondering, "Where did you find that?"
            </p>
            <p className="mt-4 text-sm font-b text-center ">
              Dive in and choose your favourites for both yourself and your
              loved ones. And make this Christmas a special moment.
            </p>
            <div className="btn text-center">
              {" "}
              <Button title={"SHop Now"} />
            </div>{" "}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cto;
