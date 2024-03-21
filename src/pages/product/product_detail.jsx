import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/shared/header";
import { Title } from "../../components/text";
import IncreamentDecreamentQuantity from "../../components/increament_decreament_quantity";
import Footer from "../../components/shared/footer";
import { useLocation } from "react-router-dom";
import numeral from "numeral";
import {
  getProductDetail,
  getProductDetailByName,
} from "../../features/products/product_listSlice";
import PlaceholderGrid from "rsuite/esm/Placeholder/PlaceholderGrid";
import PlaceholderGraph from "rsuite/esm/Placeholder/PlaceholderGraph";
import { addToCart } from "../../features/products/cartSlice";
import { PiDotFill } from "react-icons/pi";
import { ProductCarousel } from "../../sections/carousel";
import PaypalBTN from "../../components/paypalBTN";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CiShare2 } from "react-icons/ci";

const AddToCart = ({ className, product }) => {
  const [item_count, setItem_count] = useState(1);
  const token = useSelector((state) => state.auth.userDetails);
  const location = useLocation();

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
            {numeral(product.display_price).format()}
          </div>
          <div className="status text-lg font-mont pb-4 font-medium flex  items-center">
            <span className="text-base">Stock</span>:&nbsp; &nbsp; &nbsp;{" "}
            {product.number_in_stock < 4 ? (
              <div className="status flex items-center">
                <PiDotFill color="red" size={25} />
                <Title title={"Low in Stock"} />
              </div>
            ) : product.number_in_stock <= 0 ? (
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
                dispatch(addToCart({ item: { ...product, count: item_count } }))
              }
              className="inline-flex ripple-bg-neutral-700 text-white bg-[#282828] border-0  text-lg uppercase py-5  justify-center w-full"
            >
              <Title title={"ADD TO Cart"} color={"text-white"} />
            </button>
            <div className="flex justify-stretch gap-x-4 gap-y-4">
              <PaypalBTN onPay={() => {}} />
              <CopyToClipboard
                text={`${decodeURI(window.location.origin)}/products/id/${
                  product.product_id
                }`}
              >
                <button className="lg:flex-inline flex basis-2/12 ripple-bg-neutral-100 border text-[#282828] bg-slate-50   text-lg uppercase py-3 justify-center items-center ">
                  <CiShare2 strokeWidth={0.4} size={30} />
                </button>
              </CopyToClipboard>
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
          <div className="img_preview col-span-10 lg:order-2  lg:w-10/12 mx-auto ">
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
                return <span className=" "> {p}.</span>;
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
  const location = useLocation();
  const product = useSelector((state) => state.products.product);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    dispatch(getProductDetail(location.state?.product_id));
  }, [dispatch, location.state, location.pathname]);

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
