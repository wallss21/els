import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/shared/footer";
import Header from "../components/shared/header";
import Gshock from "../sections/gshock";
import Showcase from "../sections/showcase";
import Product from "../components/product";
import { useEffect, useState } from "react";
import MyCarousel, { MoCarousel } from "../sections/carousel";
import { Button, Title } from "../components/text";
import { featureProducts } from "../features/products/product_listSlice";

const ReloadFeaturedP = () => {
  const dispatch=useDispatch()
  return (
    <div className="py-10 text-[#282828] text-center px-5 ">
      <p className="text-sm font-light font-mont">
        Something went wrong Please refresh to Load items
      </p>
      <Button onClicked={    dispatch(featureProducts())} title={"Refresh"}  />
    </div>
  );
};

function Home() {
  const dispatch = useDispatch();
  const topProducts = useSelector((state) => state.products.topProducts);

  useEffect(() => {
    dispatch(featureProducts());
  }, [dispatch]);

  return (
    <div className="Home">
      <Header />
      <div className="caroSection bg-slate-50 lg:px-5 lg:pt-10 ">
        <MyCarousel />
        <MoCarousel />
      </div>
      <div className="container mt-5 mx-auto lg:px-0">
        <div className="header_title  py-3 text-center">
          <Title text_s={"text-xs"} title={" most loved Treasures"} />
        </div>
        {topProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-10 px-2 gap-x-3 lg:gap-5 ">
            {topProducts.map((product) =>{ console.log(product); return(
              <div
                key={product.id}
                className="border-gray-200 border  rounded-md shadow-md relative"
              >
                {product.new_arrival && (
                  <span className="bg-[#2828] absolute z-30 text-white text-xs font-medium me-2 px-2.5 py-0.5 ">
                    New Arrival
                  </span>
                )}

                <Product id={product.id} product={product} />
              </div>
            )})}
          </div>
        ) : (
          <ReloadFeaturedP />
        )}
      </div>
      <div className="repair mt-20 relative lg:h-[60vh]  h-[50vh] overflow-hidden flex items-center justify-center ">
        <img
          className=" w-full object-cover origin-bottom"
          width={"100vw"}
          src="https://www.wallacebishop.com.au/cdn/shop/files/DigiSku_19072_copy.jpg?v=1656568923&width=1400"
          alt=""
          srcSet=""
        />
        <div className="absolute text-center ">
          <Title
            title={"CREATE YOUR OWN"}
            color={"text-white"}
            text_s={"mb-5 text-xs"}
          />
          <p className="text-white  font-mont  lg:text-6xl text-2xl font-normal">
            Custom Made
          </p>
          <button className="inline-flex text-[#282828] bg-white mt-5 lg:mt-16  py-4 px-8 text-lg">
            <Title title={"  Contact Us"} />
          </button>
        </div>
      </div>

      <Gshock />

      <Showcase />
      <div className="repair lg:mt-16 relative mt-8 overflow-hidden flex items-center justify-center ">
        <img
          className=" w-full object-cover origin-bottom hidden lg:block"
          width={"100vw"}
          src="https://www.wallacebishop.com.au/cdn/shop/files/engagement.png?v=1705631747&width=1400"
          alt=""
          srcSet=""
        />
        <img
          className=" w-full object-cover origin-bottom lg:hidden"
          width={"100vw"}
          src="www.wallacebishop.com.au/cdn/shop/files/Untitled-2_1f710df1-b617-4b8d-83eb-ca8da11dd839.png?v=1705632543&amp;width=3000"
          alt=""
          srcSet="//www.wallacebishop.com.au/cdn/shop/files/Untitled-2_1f710df1-b617-4b8d-83eb-ca8da11dd839.png?v=1705632543&amp;width=600 600w"
        />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
