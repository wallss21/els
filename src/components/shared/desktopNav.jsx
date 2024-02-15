import React from "react";
import queryString from "query-string";
import { Link, NavLink, useLocation } from "react-router-dom";

function DesktopNav({ navlinks }) {
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  const addActive = (state) => {
    return state
      ? "block py-2 px-3 font-mont font-[400]  rounded  md:p-0 underline text-[#282828]"
      : "block py-2 px-3 font-mont font-[400]  rounded  md:p-0  text-[#282828]";
  };


  return (
    <div
      className="items-center justify-center hidden w-full md:flex md:w-auto md:order-1 py-[1.1rem] overflow-x-hidden shadow-sm "
      id="navbar-sticky"
    >
      <ul className="flex flex-col md:p-0  font-medium borer border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white ">
        {navlinks.map((link_, index) => {
          return (
            <li
              key={index}
              onMouseOver={(e) => {
                e.currentTarget.lastElementChild.classList.remove("hidden");
              }}
              onMouseLeave={(e) => {
                e.currentTarget.lastElementChild.classList.add("hidden");
              }}
              className="hover:underline underline-offset-4 hover: ease-in-out"
            >
              <NavLink
                className={({ isActive, isPending, isTransitioning }) =>
                  addActive(isActive)
                }
                to={`/collections/${link_.navlink
                  ?.toLowerCase()
                  .replace(" ", "-")}`}
              >
                {link_.navlink.toUpperCase()}
              </NavLink>
              <div className=" bg-white absolute left-0 right-0 w-[100vw] nav hidden shadow-md ">
                <div className="mx-auto px-6 pt-10 pb-5 container flex lg:max-h-[60vh] text-start justify-center gap-14">
                  {link_.sublinks.map((obj, id) => {
                    return (
                      <div key={id} className="drop">
                        <h5 className="text-sm">{obj.title}</h5>
                        <ul className="pt-5  font-mont font-light text-sm">
                          {obj.sub.map((link, id) => {
                            return (
                              <li key={id} className="mt-2">
                                <Link
                                  className="font-[400] text-opacity-50 text-[#282828]"
                                  to={`/collections${`/${link_.navlink
                                    .toLowerCase()
                                    .trim()
                                    .replaceAll("'", "")
                                    .replaceAll(" ", "-")}?filter=${link
                                    .toLowerCase()
                                    .trim()
                                    .replaceAll("'", "")
                                    .replaceAll(" ", "-")}`}`}
                                >
                                  {link}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default DesktopNav;
