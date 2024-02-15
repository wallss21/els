import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/shared/header";
import { Title } from "../../components/text";
import IncreamentDecreamentQuantity from "../../components/increament_decreament_quantity";
import Footer from "../../components/shared/footer";
import { useLocation } from "react-router-dom";
import numeral from "numeral";
import { getProductDetail } from "../../features/products/product_listSlice";
import PlaceholderGrid from "rsuite/esm/Placeholder/PlaceholderGrid";
import PlaceholderGraph from "rsuite/esm/Placeholder/PlaceholderGraph";
import { addToCart, addToCartdb } from "../../features/products/cartSlice";
import { PiDotFill } from "react-icons/pi";
import { ProductCarousel } from "../../sections/carousel";
import { BiHeart } from "react-icons/bi";

const AddToCart = ({ className, product }) => {
  const [item_count, setItem_count] = useState(1);
  const token =useSelector(state=>state.auth.userDetails)

  const adjustItem = (newstate) => {
    newstate === "increment" &&
      item_count <= 15 &&
      setItem_count(item_count + 1);
    newstate === "decrement" && item_count > 1 && setItem_count(item_count - 1);
  };
  const dispatch = useDispatch();
  return (
    <div className={`add_to_cart lg:col-span-5 ${className}`}>
      <div className="  border-gray-200   bg-white lg:sticky top-[20vh] rounded ">
        <p className="product_name font-mont text-xl font-medium tracking-tight pb-3">
          {product.name}
        </p>
        <p className="mb-2 inline-flex justify-center items-center text-sm font-mont font-light">
          <Title title={product.category} />
          &nbsp;| SKU :&nbsp; {product.sku}
        </p>
        <hr className="pt-2" />
        <div className="review_group">
          <div className="price text-lg font-mont font-medium">
            <span className="text-base">Price</span>: $
            {numeral(product.price).format()}
          </div>
          <div className="status text-lg font-mont pb-4 font-medium flex  items-center">
            <span className="text-base">Stock</span>:&nbsp; &nbsp; &nbsp;{" "}
            {product.sold_out ? (
              <div className="status flex items-center">
                <PiDotFill color="red" size={25} />
                <Title title={"Out of Stock"} />
              </div>
            ) : (
              <div className="status flex items-center">
                <PiDotFill color="green" size={25} />{" "}
                <Title title={"In Stock"} color={"text-green-700"} />
              </div>
            )}
          </div>
          <IncreamentDecreamentQuantity
            adjustItem={adjustItem}
            item_count={item_count}
          />
          <div className="add_to_cart space-y-4  pt-3">
            <button
              onClick={() =>
                dispatch(addToCart({payload:{ ...product, count: item_count }}))
              }
              className="inline-flex ripple-bg-neutral-700 text-white bg-[#282828] border-0  text-lg uppercase py-5  justify-center w-full"
            >
              <Title title={"ADD TO Cart"} color={"text-white"} />
            </button>
            <div className="flex justify-stretch gap-x-4 gap-y-4">
              <button className="inline-flex basis-10/12 text-white bg-blue-400 border-0 ripple-bg-blue-300 text-lg uppercase py-3 justify-center items-center">
                <Title title={"Buy With "} color={"text-white"} /> &nbsp; &nbsp;
                <svg
                  className="main-header__logo-image w-10"
                  fill="#282828"
                  role="presentation"
                  viewBox="0 0 435.97 173.13"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M206.2,84.58v50.75H190.1V10h42.7a38.61,38.61,0,0,1,27.65,10.85A34.88,34.88,0,0,1,272,47.3a34.72,34.72,0,0,1-11.55,26.6q-11.2,10.68-27.65,10.67H206.2Zm0-59.15V69.18h27a21.28,21.28,0,0,0,15.93-6.48,21.36,21.36,0,0,0,0-30.63,21,21,0,0,0-15.93-6.65h-27Z"
                    fill="#5f6368"
                  />
                  <path
                    d="M309.1,46.78q17.85,0,28.18,9.54T347.6,82.48v52.85H332.2v-11.9h-.7q-10,14.7-26.6,14.7-14.17,0-23.71-8.4a26.82,26.82,0,0,1-9.54-21q0-13.31,10.06-21.17t26.86-7.88q14.34,0,23.62,5.25V81.25A18.33,18.33,0,0,0,325.54,67,22.8,22.8,0,0,0,310,61.13q-13.49,0-21.35,11.38l-14.18-8.93Q286.17,46.78,309.1,46.78Zm-20.83,62.3a12.86,12.86,0,0,0,5.34,10.5,19.64,19.64,0,0,0,12.51,4.2,25.67,25.67,0,0,0,18.11-7.52q8-7.53,8-17.67-7.53-6-21-6-9.81,0-16.36,4.73C290.46,100.52,288.27,104.41,288.27,109.08Z"
                    fill="#5f6368"
                  />
                  <path
                    d="M436,49.58,382.24,173.13H365.62l19.95-43.23L350.22,49.58h17.5l25.55,61.6h.35l24.85-61.6Z"
                    fill="#5f6368"
                  />
                  <path
                    d="M141.14,73.64A85.79,85.79,0,0,0,139.9,59H72V86.73h38.89a33.33,33.33,0,0,1-14.38,21.88v18h23.21C133.31,114.08,141.14,95.55,141.14,73.64Z"
                    fill="#4285f4"
                  />
                  <path
                    d="M72,144c19.43,0,35.79-6.38,47.72-17.38l-23.21-18C90.05,113,81.73,115.5,72,115.5c-18.78,0-34.72-12.66-40.42-29.72H7.67v18.55A72,72,0,0,0,72,144Z"
                    fill="#34a853"
                  />
                  <path
                    d="M31.58,85.78a43.14,43.14,0,0,1,0-27.56V39.67H7.67a72,72,0,0,0,0,64.66Z"
                    fill="#fbbc04"
                  />
                  <path
                    d="M72,28.5A39.09,39.09,0,0,1,99.62,39.3h0l20.55-20.55A69.18,69.18,0,0,0,72,0,72,72,0,0,0,7.67,39.67L31.58,58.22C37.28,41.16,53.22,28.5,72,28.5Z"
                    fill="#ea4335"
                  />
                </svg>
              </button>
              <button className="lg:flex-inline flex basis-2/12 ripple-bg-neutral-100 border text-[#282828] bg-slate-50   text-lg uppercase py-3 justify-center items-center ">
                <BiHeart strokeWidth={0.4} size={30} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="title"></div>
    </div>
  );
};

const Content = ({ product }) => {
  return (
    <div className="lg:grid grid-cols-12   lg:gap-x-10 pt-8">
      <div className=" col-span-7">
        <div className="imgs  self-center  gap-x-2 bg-white  ml-auto pt-2 pb-3 lg:pb-8 rounded  ">
          <div className="img_preview col-span-10 lg:order-2  w-10/12 mx-auto ">
            <ProductCarousel imgs={`${product.img1},${product.img2}`} />
          </div>
        </div>
        <div className="lg:hidden block">
          <AddToCart product={product} />
        </div>
        <div className="product_meta">
          <div className="description bg-white my-10 border border-gray-200 rounded px-5">
            <p className="title font-mont text-xl font-medium pt-10">
              Description
            </p>
            <p className="font-mont font-light text-[#282828]  ">
              {product.description.split(". ").map((p) => {
                return <span  className=" ">{" "}{p}.</span>;
              })}
            </p>
          </div>
          <div className="description bg-white my-10 border border-gray-200 rounded px-5">
            <p className="title font-mont text-xl font-medium pt-10">
              Product Details
            </p>

            <div className="relative overflow-x-auto font-mont font-light text-[#282828]">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <tbody>
                  <tr className="bg-white border-b">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap"
                    >
                      SKU
                    </th>
                    <td className="px-6 py-4"> {product.sku}</td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap"
                    >
                      Material
                    </th>

                    <td className="px-6 py-4">
                      {product.material === "None" ? "" : product.material}
                    </td>
                  </tr>

                  <tr className="bg-white">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium  whitespace-nowrap"
                    >
                      Product
                    </th>

                    <td className="px-6 py-4">{product.category}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="description bg-white my-10 border border-gray-200 rounded px-5">
            <p className="title font-mont text-xl font-medium pt-10 pb-5">
              Dispatch, Shipping & Delivery
            </p>

            <div className="relative overflow-x-auto font-mont font-light text-[#282828]">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <tbody>
                  <tr className="bg-white border-b">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap"
                    ></th>
                    <th className="px-6 py-4"> Standard Post</th>
                    <th className="px-6 py-4"> Express Post</th>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap"
                    >
                      Dispatch TIme
                    </th>

                    <td className="px-6 py-4">1-3 Business Days</td>
                    <td className="px-6 py-4">1-3 Business Days</td>
                  </tr>
                  <tr className="bg-white">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium  whitespace-nowrap"
                    >
                      Shipping Time
                    </th>

                    <td className="px-6 py-4">7-14 Business Days</td>
                    <td className="px-6 py-4">1-3 Business Days</td>
                  </tr>
                </tbody>
              </table>
              <div className="note pt-10">
                <ul>
                  <li className=" font-mont  text-sm pb-3">
                    <span className="font-semibold">
                      1) Important Dispatch Notes:
                    </span>
                    <ul>
                      <li className="list-disc  list-inside pt-2">
                        Please allow 1-3 business days for your order to be
                        shipped.
                      </li>
                    </ul>
                  </li>
                  <li className=" font-mont  text-sm pb-3">
                    <span className="font-semibold">
                      2) Important Shipping Notes:
                    </span>
                    <ul>
                      <li className="list-disc  list-inside pt-2">
                        Please allow 7-14 business days (after receiving
                        Shipping Confirmation) to receive your{" "}
                        <strong className="font-semibold">Standard Post</strong>{" "}
                        parcel.
                      </li>
                      <li className="list-disc  list-inside pt-2">
                        Please allow 1-3 business days (after receiving Shipping
                        Confirmation) to receive your{" "}
                        <strong className="font-semibold">Express Post</strong>{" "}
                        parcel.
                      </li>
                    </ul>
                  </li>
                  <li className=" font-mont  text-sm pb-3">
                    <span className="font-semibold">
                      3) Important Delivery Notes:
                    </span>
                    <ul>
                      <li className="list-disc  list-inside pt-2">
                        <strong className="font-semibold">ALL</strong> orders
                        require signature on delivery. If you are not home, your
                        parcel will be taken to your nearest post office for
                        collection.
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="description bg-white my-10 border border-gray-200 rounded px-5">
            <p className="title font-mont text-xl font-medium pt-10 pb-5">
              Exchanges, Returns & Refunds
            </p>

            <p className="text-sm font-semibold font-mont pt-5 pb-3">
              Important Returns Notes:
            </p>
            <p className="text-sm font-light  font-mont">
              {/* TODO change store-name to the real name   */}
              Store-name offers 21-day (after being received) returns for change
              of mind. Please ensure your item/s meet our returns policy.
              Merchandise must be in new and saleable condition and accompanied
              by the original sales receipt and original packaging. Item/s may
              be exchanged for another item of the equivalent value. You can
              return your item/s to the below address but please note, return
              costs will not be reimbursed for change of mind returns.
            </p>
            <p className="text-sm font-semibold font-mont pt-5 pb-3">
              Return Address:
            </p>
            <p className="text-sm font-light pb-5 font-mont">
              {/* TODO change store-address to the real name   */}
              ATTN: El Classic Jewelry E-Outlet 55 Doggett Street, Newstead 4006
              QLD
            </p>
            <p className="text-sm font-semibold font-mont  pb-3">
              Important Refunds Notes:
            </p>
            <p className="text-sm font-light pb-5 font-mont">
              Refunds will be issued back to the original payment method used.
              Please allow 3-7 business days to receive your funds.
            </p>
          </div>
        </div>
      </div>

      <AddToCart product={product} className="hidden lg:block" />
    </div>
  );
};

function ProductDetail() {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const product = useSelector((state) => state.products.product);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getProductDetail(state.product_id));
  }, [dispatch, state]);

  if (product?.name) {
    return (
      <div className="">
        <Header />
        <section className="lg:px-0 px-5 lg:w-10/12 mx-auto pb-10">
          <div className="main container mx-auto  w-12/12">
            <div className="meta_desc container mx-auto w-9/12"></div>
            <Content product={product} />
          </div>
        </section>
        <Footer />
      </div>
    );
  }
  return (
    <div className="">
      <Header />
      <section className=" w-11/12 mx-auto pb-10">
        <div className="main container mx-auto  w-12/12">
          <div className="meta_desc container mx-auto w-9/12"></div>
          <div className="py-20">
            <PlaceholderGraph />
            <PlaceholderGrid />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default ProductDetail;
