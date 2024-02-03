import React from "react";
import { mainNav_featuredImages as fim } from "../assets/data";
import { NavLink, useParams } from "react-router-dom";

function CategoryBanner() {
  const params = useParams();

  let data = { url: "", title: "" };

  params.category === "wedding-rings"
    ? (data = { ...data, url: fim.wedding, title: "Wedding Rings" })
    : params.category === "engagement-rings"
    ? (data = { ...data, url: fim.engagement, title: "Engagement Rings" })
    : params.category === "watches"
    ? (data = { ...data, url: fim.watches, title: "Watches" })
    : params.category === "jewellery"
    ? (data = { ...data, url: fim.jewelry, title: "Jewellery" })
    : (data = { ...data });

  console.log(data);
  const navlinks = [
    "Automatic",
    "Quartz",
    "Chronograph",
    "Analogue",
    "Digital",
    "Men's Watches",
    "Women's Watches",
  ];

  return (
    <div className="">
    <div className="top bg-center bg-cover"
    style={{backgroundImage:`url(${data.url})`}} 
    >
      
      <div 
     
      className="py-20 lg:py-32 bg-center overlay"   >
        
        <p className="text-5xl text-white font-mont font-meduim  text-center">
          {data.title}
        </p>
      </div>
    </div>
     {params.category==="watches"&&( <div className=" overflow-x-auto lg:flex justify-center pt-3 pb-2 lg:pb-5 no-scrollbar border-b border-gray-300">
          <ul className="flex md:p-0 lg:mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-3 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {navlinks.map((link, index) => {
              return (
                <li
                  key={index}
                  onMouseOver={(e) => {}}
                  onMouseLeave={(e) => {}}
                  className=""
                >
                  <NavLink
                    to={`/collections/${link
                      .toLowerCase()
                      .replace(" ", "-")
                      .replace("'", "")}`}
                    className="py-3 px-3 font-mont font-light text-[#282828] hover:text-white active:bg-[#282828] active:no-underline hover:no-underline hover:bg-[#282828] rounded   "
                  >
                    {link}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>)}
    </div>
  );
}

export default CategoryBanner;
