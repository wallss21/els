import { useDispatch, useSelector } from "react-redux";
import Cart from "../components/cart";
import Footer from "../components/shared/footer";
import Header from "../components/shared/header";
import Cto from "../sections/cto";
import Gshock from "../sections/gshock";
import Showcase from "../sections/showcase";
import Product from "../components/product";
import { useEffect, useState } from "react";
import MyCarousel, { MoCarousel } from "../sections/carousel";
import { Title } from "../components/text";
import { featureProducts } from "../features/products/product_listSlice";

function Home() {
  console.log(JSON.parse( localStorage.getItem("cartItems")))
  const topProductss = useSelector((state) => state.products.topProducts);
  const [topProducts, setTopproducts] = useState([]);

  useEffect(() => {
    setTopproducts(topProductss);
  }, [topProductss]);

  const dispatch = useDispatch();
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
      <div className="container mt-10 mx-auto px-2 lg:px-0">
        <div className="header_title">
          <p className="text-[#282828] font-medium py-2 ">Save More</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-10  gap-x-3 lg:gap-5 ">
          {topProducts.map((product, id) => (
            <div className="border-gray-200 border rounded-md shadow-md relative">
              {product.new_arrival && (
                <span class="bg-[#2828] absolute z-30 text-white text-xs font-medium me-2 px-2.5 py-0.5 ">
                  New Arrival
                </span>
              )}

              <Product id={id} product={product} />
            </div>
          ))}
        </div>
      </div>
      <div className="repair mt-20 relative lg:h-[60vh]  h-[50vh] overflow-hidden flex items-center justify-center ">
        <img
          className=" w-full object-cover origin-bottom"
          width={"100vw"}
          src="https://www.wallacebishop.com.au/cdn/shop/files/DigiSku_19072_copy.jpg?v=1656568923&width=1400"
          alt=""
          srcset=""
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
          <button class="inline-flex text-[#282828] bg-white mt-5 lg:mt-16  py-4 px-8 text-lg">
            <Title title={"  Contact Us"} />
          </button>
        </div>
      </div>

      <Gshock />

      <Showcase />
      <div className="repair lg:mt-16 relative lg:h-[75vh]  h-[65vh] overflow-hidden flex items-center justify-center ">
        <img
          className=" w-full object-cover origin-bottom hidden lg:block"
          width={"100vw"}
          src="https://www.wallacebishop.com.au/cdn/shop/files/engagement.png?v=1705631747&width=1400"
          alt=""
          srcset=""
        />
        <img
          className=" w-full object-cover origin-bottom lg:hidden"
          width={"100vw"}
          src="www.wallacebishop.com.au/cdn/shop/files/Untitled-2_1f710df1-b617-4b8d-83eb-ca8da11dd839.png?v=1705632543&amp;width=3000"
          alt=""
          srcset="//www.wallacebishop.com.au/cdn/shop/files/Untitled-2_1f710df1-b617-4b8d-83eb-ca8da11dd839.png?v=1705632543&amp;width=600 600w, //www.wallacebishop.com.au/cdn/shop/files/Untitled-2_1f710df1-b617-4b8d-83eb-ca8da11dd839.png?v=1705632543&amp;width=700 700w, //www.wallacebishop.com.au/cdn/shop/files/Untitled-2_1f710df1-b617-4b8d-83eb-ca8da11dd839.png?v=1705632543&amp;width=800 800w, //www.wallacebishop.com.au/cdn/shop/files/Untitled-2_1f710df1-b617-4b8d-83eb-ca8da11dd839.png?v=1705632543&amp;width=1000 1000w, //www.wallacebishop.com.au/cdn/shop/files/Untitled-2_1f710df1-b617-4b8d-83eb-ca8da11dd839.png?v=1705632543&amp;width=1200 1200w, //www.wallacebishop.com.au/cdn/shop/files/Untitled-2_1f710df1-b617-4b8d-83eb-ca8da11dd839.png?v=1705632543&amp;width=1400 1400w, //www.wallacebishop.com.au/cdn/shop/files/Untitled-2_1f710df1-b617-4b8d-83eb-ca8da11dd839.png?v=1705632543&amp;width=1600 1600w, //www.wallacebishop.com.au/cdn/shop/files/Untitled-2_1f710df1-b617-4b8d-83eb-ca8da11dd839.png?v=1705632543&amp;width=1800 1800w, //www.wallacebishop.com.au/cdn/shop/files/Untitled-2_1f710df1-b617-4b8d-83eb-ca8da11dd839.png?v=1705632543&amp;width=2000 2000w, //www.wallacebishop.com.au/cdn/shop/files/Untitled-2_1f710df1-b617-4b8d-83eb-ca8da11dd839.png?v=1705632543&amp;width=2200 2200w, //www.wallacebishop.com.au/cdn/shop/files/Untitled-2_1f710df1-b617-4b8d-83eb-ca8da11dd839.png?v=1705632543&amp;width=2400 2400w, //www.wallacebishop.com.au/cdn/shop/files/Untitled-2_1f710df1-b617-4b8d-83eb-ca8da11dd839.png?v=1705632543&amp;width=2600 2600w, //www.wallacebishop.com.au/cdn/shop/files/Untitled-2_1f710df1-b617-4b8d-83eb-ca8da11dd839.png?v=1705632543&amp;width=2800 2800w, //www.wallacebishop.com.au/cdn/shop/files/Untitled-2_1f710df1-b617-4b8d-83eb-ca8da11dd839.png?v=1705632543&amp;width=3000 3000w"
        />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
