import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import CloseIcon from "../closeIcon";
import queryString from "query-string";
import { Avatar } from "rsuite";
import { Title } from "../text";
import { useDispatch, useSelector } from "react-redux";
import { checkIfUserLogin } from "../../features/auth/authSlice";

// import { navlinks } from "../../assets/data";

function MobileMainNav({ isNavOpen, setIsNavOpen, mobile_ref, navlinks }) {
  const userDetails = useSelector((state) => state.auth.userDetails);
  const location = useLocation();
  const dispatch = useDispatch();
  const parsed = queryString.parse(location.search);

  useEffect(() => {
    dispatch(checkIfUserLogin());
  }, [dispatch]);

  return (
    <div className="">
      <div
        onClick={(e) => {
          setIsNavOpen(false);
          e.stopPropagation();
        }}
        ref={mobile_ref}
        className={`items-center  justify-start md:hidden h-[100vh] transition-all ease-in duration-300   ${
          isNavOpen ? "left-0" : "-translate-x-[100vw]"
        } z-[50]  bg-black bg-opacity-40  fixed top-0 w-[100vw]  md:w-auto md:order-1 `}
      >
        <div className="bg-white py-[1.3rem]  w-10/12 h-[100vh] overflow-y-scroll">
          {" "}
          <div className="close px-5 flex justify-between items-center pt-3 pb-7">
            <div className="avatar px-5   flex flex-col items-center">
              {userDetails ? (
                <div className="tit uppercase">
                  <Link to={"/account"} className="hover:text-[#282828]">
                  <Avatar circle />
                  <Title title={"Username"} /></Link>
                </div>
              ) : (
                <div className="signin">
                  <Link
                    state={{ from: location }}
                    className="text-[#282828]"
                    to={"/accounts/login"}
                    replace
                  >
                    <p
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="font-semibold"
                    >
                      Login/Register
                    </p>
                  </Link>
                </div>
              )}
            </div>

            <button
              onClick={(e) => {
                setIsNavOpen(false);
                console.log(isNavOpen);
              }}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center "
            >
              <CloseIcon />

              <span className="sr-only">Close main menu</span>
            </button>
          </div>
          <ul className="flex px-5 flex-col  md:p-0 font-medium border-b border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white ">
            {navlinks.map((link_, index) => {
              return (
                <li
                  key={index}
                  onClick={(e) => {
                    e.currentTarget.lastElementChild.classList.toggle("hidden");
                    e.currentTarget.firstElementChild.lastElementChild.classList.toggle(
                      "flipIcon"
                    );

                    e.stopPropagation();
                  }}
                  className=" border-b border-b-gray-200 transition-all ease-linear duration-100"
                >
                  <button className="w-full pt-4 text-lg pb-4 pl-3 font-mont font-[18px]  rounded  flex justify-between  ">
                    {link_.navlink.toUpperCase()}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </button>
                  <div className=" bg-white right-0  nav hidden  ">
                    <div className="mx-auto pl-2  pb-5 container  text-start justify-start space-y-3">
                      {link_.sublinks.map((obj, indx) => {
                        return (
                          <div key={indx} className="drop">
                            <div
                              onClick={(e) => {
                                e.currentTarget.parentElement.lastElementChild.classList.toggle(
                                  "hidden"
                                );
                                e.currentTarget.firstElementChild.classList.toggle(
                                  "flipIcon"
                                );

                                e.stopPropagation();
                              }}
                              className=" flex px-3 font-medium  font-mont  justify-between  w-full capitalize"
                            >
                              {obj.title.toLowerCase()}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-4 w-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                />
                              </svg>
                            </div>
                            <ul className="hidden   pl-3 ">
                              {obj.sub.map((link, w) => {
                                parsed.filter = link;
                                parsed.page = "1"
                                  .toLowerCase()
                                  .trim()
                                  .replaceAll("'", "")
                                  .replaceAll(" ", "-");
                                return (
                                  <li
                                    key={w}
                                    className="mt-3 mb-4 txt-[#282828] font-mont font-normal  text-xs"
                                  >
                                    <Link
                                      className="text-[#282828]  "
                                      onClick={() => setIsNavOpen(false)}
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
      </div>
    </div>
  );
}

export default MobileMainNav;
