import React, { useEffect } from "react";
import "./products.css";
import Header from "../../components/shared/header";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
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
import { Button } from "../../components/text";






const NotFoundCategory = () => {
  const navigate = useNavigate();
  return (
    <div className="empty flex flex-col h-[50vh] justify-center items-center">
      <p className="capitalize"> Category Not found</p>
      <p
        onClick={() => {
          navigate("/collections/jewellery");
        }}
      >
        <Button title={"CONTINUE SHOPING"}></Button>
      </p>
    </div>
  );
};





function Products() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { category } = useParams();

  const displaylist = useSelector((state) => state.products.products);

  const current_page = parseInt(
    searchParams.get("page") ? searchParams.get("page") : 1
  );

  // const dispatch=useDispatc()
 const price_range = [
      searchParams.get("minV") ? searchParams.get("minV") : "min",
      searchParams.get("maxV") ? searchParams.get("maxV") : "max",
    ];
  useEffect(() => {
   

    const filters = searchParams.getAll("filter");
    dispatch(
      getJewellery({
        category: category,
        current_page: current_page,
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

  

  return (
    <div className="">
      <Header />
      {/* <Landing /> */}
      <section>
        <CategoryBanner />
        {displaylist.count <= 0 && <NotFoundCategory />}
        {displaylist?.count > 0 && (
          <div className="lg:grid grid-cols-12 gap-x-6 container  mx-auto px-5 lg:px-0 ">
            {/* sidebar */}
            <Sidefilter />

            {/* main page */}
            <div className=" xl:col-span-10 col-span-9">
              <p className="py-7 font-mont text-sm font-semibold">
                Total Items {displaylist.count}
              </p>
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-5 pb-10">
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
        )}
      </section>
      <Footer />
    </div>
  );
}

export default Products;
