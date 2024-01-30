import React from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";

function Pagination({ current_page, availablepage }) {
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  const goto = (page) => {
    parsed.page = page;
    return `?${queryString.stringify(parsed)}`;
  };

  return (
    <div className=" my-16 mx-auto flex justify-center items-center flex-nowrap">
      <div className="pagination  border py-3   border-gray-300">
        {current_page > 1 && (
          <Link to={`?page=${current_page - 1}`}>
            {" "}
            <span className="px-2 lg:px-4 py-4 border-r border-gray-300 ">
              <GoArrowLeft className="inline-flex" />
            </span>
          </Link>
        )}

        <Link to={goto(1)}>
          <span
            className={`${
              current_page === 1 ? "bg-[#282828] text-white" : ""
            } px-2 lg:px-4 py-4  border-r  border-gray-300`}
          >
            {1}
          </span>
        </Link>

        {current_page - 3 > 1 && (
          <span className={` px-2 lg:px-4 py-4 border-r  border-gray-300`}>...</span>
        )}

        {current_page - 2 <= 1 ? (
          ""
        ) : (
          <Link to={goto(current_page - 2)}>
            <span className={`${""} px-2 lg:px-4 py-4 border-r  border-gray-300`}>
              {current_page - 2}
            </span>
          </Link>
        )}
        {current_page - 1 <= 1 ? (
          ""
        ) : (
          <Link to={goto(current_page - 1)}>
            <span className={`${""} px-2 lg:px-4 py-4 border-r  border-gray-300`}>
              {current_page - 1}
            </span>
          </Link>
        )}
        {current_page !== 1 && (
          <Link to={goto(current_page)}>
            <span
              className={`bg-[#282828] text-white px-2 lg:px-4 py-4 border-r  border-gray-300`}
            >
              {current_page}
            </span>
          </Link>
        )}
        {current_page + 1 >= availablepage ? (
          ""
        ) : (
          <Link to={goto(current_page + 1)}>
            <span className={`${""} px-2 lg:px-4 py-4 border-r  border-gray-300`}>
              {current_page + 1}
            </span>
          </Link>
        )}
        {current_page + 2 >= availablepage ? (
          ""
        ) : (
          <Link to={goto(current_page + 2)}>
            <span className={`${""} px-2 lg:px-4 py-4 border-r  border-gray-300`}>
              {current_page + 2}
            </span>
          </Link>
        )}

        {current_page + 3 < availablepage && (
          <span
            className={`${
              current_page === availablepage ? "bg-[#282828] text-white" : ""
            } px-2 lg:px-4 py-4 border-r  border-gray-300`}
          >
            ...
          </span>
        )}

        {availablepage !== current_page && (
          <Link to={goto(availablepage)}>
            <span
              className={`${
                current_page === availablepage ? "bg-[#282828] text-white" : ""
              } px-2 lg:px-4 py-4 border-r  border-gray-300`}
            >
              {availablepage}
            </span>
          </Link>
        )}

        {current_page < availablepage && (
          <Link className="cursor-pointer" to={goto(current_page + 1)}>
            <span className="px-2 lg:px-4 py-4  ">
              <GoArrowRight className="inline-flex" />
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Pagination;
