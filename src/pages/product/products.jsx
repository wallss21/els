import React, { useEffect } from "react";
import "./products.css";
import Header from "../../components/shared/header";
import {
  Link,
  NavLink,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Jewellery_material } from "../../assets/data";
import Footer from "../../components/shared/footer";

import { useDispatch, useSelector } from "react-redux";
import {
  filterProduct,
  getJewellery,
} from "../../features/products/product_listSlice";
import Product from "../../components/product";
import Landing from "../../sections/landing";
import { Plus } from "../../components/icons";
import Pagination from "../../components/pagination";
import PriceRange from "../../components/price_range";
import CategoryBanner from "../../sections/categoryBanner";
import Sidefilter from "./sidefilter";

function Products() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { category } = useParams();

  const displaylist = useSelector((state) => state.products.products);

  const current_page = parseInt(
    searchParams.get("page") ? searchParams.get("page") : 1
  );

  // const dispatch=useDispatc()

 

  useEffect(() => {
    const price_range = [
      searchParams.get("minV") ? searchParams.get("minV") : "min",
      searchParams.get("maxV") ? searchParams.get("maxV") : "max",
    ];

    const filters = searchParams.getAll("filter");
    dispatch(
      getJewellery({
        category: category,
        current_page: current_page,
        price_range: price_range,
        filters: filters,
        minv: price_range[0],
        maxv: price_range[1],
      })
    );
    // dispatch(filterProduct({ filter: filter?.split("-"), page: current_page }));
  }, [dispatch, category, searchParams, current_page]);


  useEffect(() => {
    window.scrollTo(0, 0);
   
  }, [searchParams]);

  useEffect(() => {
    

  });

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
      <Header />
      {/* <Landing /> */}
      <section>
        <CategoryBanner />
        {/* <div className=" overflow-x-auto lg:flex justify-center pt-3 pb-2 lg:pb-5 no-scrollbar border-b border-gray-300">
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
        </div> */}

        <div className="lg:grid grid-cols-12 gap-x-6 container  mx-auto px-5 lg:px-0 ">
          {/* sidebar */}
          <Sidefilter />

          {/* main page */}
          <div className=" xl:col-span-10 col-span-9">
            <span>Total {displaylist.count}</span>
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-5 py-10">
              {displaylist?.results?.map((product) => {
                return <Product id={product.product_id} product={product} />;
              })}
            </div>

            <Pagination
              availablepage={Math.ceil(displaylist?.count / 24)}
              current_page={current_page}
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Products;
