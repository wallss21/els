import React, { useEffect } from "react";
import "./products.css";
import Header from "../../components/shared/header";
import { useParams, useSearchParams } from "react-router-dom";
import Footer from "../../components/shared/footer";

import { useDispatch, useSelector } from "react-redux";
import { getJewellery } from "../../features/products/product_listSlice";
import Product from "../../components/product";
// import Landing from "../../sections/landing";
// import { Plus } from "../../components/icons";
import Pagination from "../../components/pagination";
// import PriceRange from "../../components/price_range";
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



const NotFoundCategory=()=>{
  
}


  return (
    <div className="">
      <Header />
      {/* <Landing /> */}
      <section>
        <CategoryBanner />

        <div className="lg:grid grid-cols-12 gap-x-6 container  mx-auto px-5 lg:px-0 ">
          {/* sidebar */}
         { displaylist?.count>0&&(<Sidefilter />)}

          {/* main page */}
          <div className=" xl:col-span-10 col-span-9">
            <p className="py-7 font-mont text-sm font-semibold">
              Total Items {displaylist.count}
            </p>
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
