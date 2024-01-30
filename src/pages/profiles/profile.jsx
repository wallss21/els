import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Title } from "../../components/text";
import Header from "../../components/shared/header";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

function Profile() {
  const dispatch = useDispatch();

  const links = ["order", "Addresses", "Logout"];
  return (
    <div className="page">
      <Header />
      <section>
        <div className="profile bg-white">
          <div className="container flex  flex-col w-full mx-auto justify-center items-center">
            <div className="top_nav  mt-16">
              <ul className="flex justify-center gap-x-5 ">
                {links.map((link, id) => {
                  return (
                    <li>
                      {link.toLowerCase() === "logout" ? (
                        <NavLink
                          onClick={(e) => dispatch(logout())}
                          className="block py-2 px-3 font-mont font-[400]  rounded  md:p-0 capitalize"
                        >
                          {link}
                        </NavLink>
                      ) : (
                        <NavLink
                          to={"/"}
                          className="block py-2 px-3 font-mont font-[400]  rounded  md:p-0 capitalize"
                        >
                          {link}
                        </NavLink>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="py-16">
              <div className="text- text-center space-y-5">
                <h3 className="text-2xl .text-[#282828].text-light flex justify-center items-center ">
                  Orders
                  <span className="py-2 px-3 ml-3  text-xs rounded-full  bg-[#282828] text-white ">
                    9
                  </span>
                </h3>{" "}
                <p className="txt-sm font-mont font-light">
                  You have not placed any orders yet.
                </p>
                <div className="btn mt-10">
                  <button
                    type="button"
                    className="bg-[#282828] py-5 px-7 text-white "
                  >
                    <Title
                      title={"Start Shopping"}
                      color={"text-white"}
                      text_s={"uppercase text-xs"}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
