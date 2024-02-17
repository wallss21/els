import React from "react";
import { sidenav } from "../../assets/sidenav";
import { Gemstone_Cut, Gemstone_Type, Ring_brand } from "../../assets/rings";
import CheckBoxInput from "../../components/checkBok";
import { GoArrowLeft, GoArrowRight, GoPlus } from "react-icons/go";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Jewellery_material } from "../../assets/data";
import { Plus } from "../../components/icons";
import PriceRange from "../../components/price_range";
import queryString from "query-string";

function Sidefilter({ visibility }) {
  const location = useLocation();
  const navigate = useNavigate();
  const parsed = queryString.parse(location.search);

  // METHODS

  const handleBrand = (a, b) => {
    console.log(a);
   
  };

  // END METHODS

  return (
    <div
      className={` sidebar overflow-y-auto no-scrollbar sticky top-10 h-[90vh]  hidden lg:block  col-span-3 xl:col-span-2`}
    >
      <div className="title">
        <p className="text-2xl font-mont font-medium mt-10">Filter</p>
      </div>

      <div id="accordionExample " className="mt-5 ">
        {sidenav.map((option, id) => (
          <div key={id} className="border-b  border-neutral-200 bg-white ">
            <h2 className="mb-0" id="headingOne">
              <button
                onClick={(e) => {
                  e.currentTarget.parentElement.parentElement.lastElementChild.classList.toggle(
                    "hidden"
                  );
                  e.stopPropagation();
                }}
                className="group relative flex w-full items-center   bg-white px-5 py-4 pb-5 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none"
                type="button"
              >
                {option}
                <span className="ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                  <GoPlus />
                </span>
              </button>
            </h2>
            <div className="!visible hidden">
              <div className="px-5 py-4">
                {option.toLowerCase() === "price" ? (
                  <PriceRange />
                ) : option.toLowerCase() === "brand" ? (
                  Ring_brand.names.map((brand, id) => {
                    return (
                      <CheckBoxInput
                        handler={handleBrand}
                        data={brand}
                        id={id}

                      />
                    );
                  })
                ) : option.toLowerCase() === "gemstone type" ? (
                  Gemstone_Type.names.map((type, id) => {
                    return <CheckBoxInput data={type} id={id} />;
                  })
                ) : option.toLowerCase() === "gemstone cut" ? (
                  Gemstone_Cut.names.map((cut, id) => {
                    return <CheckBoxInput data={cut} id={id} />;
                  })
                ) : option.toLowerCase() === "material" ? (
                  Jewellery_material.map((material, id) => (
                    <CheckBoxInput data={material} id={id} />
                  ))
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidefilter;
