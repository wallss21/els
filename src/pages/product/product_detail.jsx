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
  const token = useSelector((state) => state.auth.userDetails);

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
                dispatch(addToCart({ item: { ...product, count: item_count } }))
              }
              className="inline-flex ripple-bg-neutral-700 text-white bg-[#282828] border-0  text-lg uppercase py-5  justify-center w-full"
            >
              <Title title={"ADD TO Cart"} color={"text-white"} />
            </button>
            <div className="flex justify-stretch gap-x-4 gap-y-4">
              <button className="inline-flex basis-10/12 text-[#282828] bg-slate-100  border border-gray-100 ripple-bg-slate-50 text-lg uppercase  justify-center items-center">
                <Title title={"Pay With "} color={"text-[#282828]"} /> &nbsp; &nbsp;
                <svg
                  height="50"
                  width="100"
                  viewBox="-.02682843 0 123.63183286 30.17842908"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m46.211 6.749h-6.839a.95.95 0 0 0 -.939.802l-2.766 17.537a.57.57 0 0 0 .564.658h3.265a.95.95 0 0 0 .939-.803l.746-4.73a.95.95 0 0 1 .938-.803h2.165c4.505 0 7.105-2.18 7.784-6.5.306-1.89.013-3.375-.872-4.415-.972-1.142-2.696-1.746-4.985-1.746zm.789 6.405c-.374 2.454-2.249 2.454-4.062 2.454h-1.032l.724-4.583a.57.57 0 0 1 .563-.481h.473c1.235 0 2.4 0 3.002.704.359.42.469 1.044.332 1.906zm19.654-.079h-3.275a.57.57 0 0 0 -.563.481l-.145.916-.229-.332c-.709-1.029-2.29-1.373-3.868-1.373-3.619 0-6.71 2.741-7.312 6.586-.313 1.918.132 3.752 1.22 5.031.998 1.176 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 0 0 .562.66h2.95a.95.95 0 0 0 .939-.803l1.77-11.209a.568.568 0 0 0 -.561-.658zm-4.565 6.374c-.316 1.871-1.801 3.127-3.695 3.127-.951 0-1.711-.305-2.199-.883-.484-.574-.668-1.391-.514-2.301.295-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.499.589.697 1.411.554 2.317zm22.007-6.374h-3.291a.954.954 0 0 0 -.787.417l-4.539 6.686-1.924-6.425a.953.953 0 0 0 -.912-.678h-3.234a.57.57 0 0 0 -.541.754l3.625 10.638-3.408 4.811a.57.57 0 0 0 .465.9h3.287a.949.949 0 0 0 .781-.408l10.946-15.8a.57.57 0 0 0 -.468-.895z"
                    fill="#253b80"
                  />
                  <path
                    d="m94.992 6.749h-6.84a.95.95 0 0 0 -.938.802l-2.766 17.537a.569.569 0 0 0 .562.658h3.51a.665.665 0 0 0 .656-.562l.785-4.971a.95.95 0 0 1 .938-.803h2.164c4.506 0 7.105-2.18 7.785-6.5.307-1.89.012-3.375-.873-4.415-.971-1.142-2.694-1.746-4.983-1.746zm.789 6.405c-.373 2.454-2.248 2.454-4.062 2.454h-1.031l.725-4.583a.568.568 0 0 1 .562-.481h.473c1.234 0 2.4 0 3.002.704.359.42.468 1.044.331 1.906zm19.653-.079h-3.273a.567.567 0 0 0 -.562.481l-.145.916-.23-.332c-.709-1.029-2.289-1.373-3.867-1.373-3.619 0-6.709 2.741-7.311 6.586-.312 1.918.131 3.752 1.219 5.031 1 1.176 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 0 0 .564.66h2.949a.95.95 0 0 0 .938-.803l1.771-11.209a.571.571 0 0 0 -.565-.658zm-4.565 6.374c-.314 1.871-1.801 3.127-3.695 3.127-.949 0-1.711-.305-2.199-.883-.484-.574-.666-1.391-.514-2.301.297-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.501.589.699 1.411.554 2.317zm8.426-12.219-2.807 17.858a.569.569 0 0 0 .562.658h2.822c.469 0 .867-.34.939-.803l2.768-17.536a.57.57 0 0 0 -.562-.659h-3.16a.571.571 0 0 0 -.562.482z"
                    fill="#179bd7"
                  />
                  <path
                    d="m7.266 29.154.523-3.322-1.165-.027h-5.563l3.866-24.513a.316.316 0 0 1 .314-.268h9.38c3.114 0 5.263.648 6.385 1.927.526.6.861 1.227 1.023 1.917.17.724.173 1.589.007 2.644l-.012.077v.676l.526.298a3.69 3.69 0 0 1 1.065.812c.45.513.741 1.165.864 1.938.127.795.085 1.741-.123 2.812-.24 1.232-.628 2.305-1.152 3.183a6.547 6.547 0 0 1 -1.825 2c-.696.494-1.523.869-2.458 1.109-.906.236-1.939.355-3.072.355h-.73c-.522 0-1.029.188-1.427.525a2.21 2.21 0 0 0 -.744 1.328l-.055.299-.924 5.855-.042.215c-.011.068-.03.102-.058.125a.155.155 0 0 1 -.096.035z"
                    fill="#253b80"
                  />
                  <path
                    d="m23.048 7.667c-.028.179-.06.362-.096.55-1.237 6.351-5.469 8.545-10.874 8.545h-2.752c-.661 0-1.218.48-1.321 1.132l-1.409 8.936-.399 2.533a.704.704 0 0 0 .695.814h4.881c.578 0 1.069-.42 1.16-.99l.048-.248.919-5.832.059-.32c.09-.572.582-.992 1.16-.992h.73c4.729 0 8.431-1.92 9.513-7.476.452-2.321.218-4.259-.978-5.622a4.667 4.667 0 0 0 -1.336-1.03z"
                    fill="#179bd7"
                  />
                  <path
                    d="m21.754 7.151a9.757 9.757 0 0 0 -1.203-.267 15.284 15.284 0 0 0 -2.426-.177h-7.352a1.172 1.172 0 0 0 -1.159.992l-1.564 9.906-.045.289a1.336 1.336 0 0 1 1.321-1.132h2.752c5.405 0 9.637-2.195 10.874-8.545.037-.188.068-.371.096-.55a6.594 6.594 0 0 0 -1.017-.429 9.045 9.045 0 0 0 -.277-.087z"
                    fill="#222d65"
                  />
                  <path
                    d="m9.614 7.699a1.169 1.169 0 0 1 1.159-.991h7.352c.871 0 1.684.057 2.426.177a9.757 9.757 0 0 1 1.481.353c.365.121.704.264 1.017.429.368-2.347-.003-3.945-1.272-5.392-1.399-1.593-3.924-2.275-7.155-2.275h-9.38c-.66 0-1.223.48-1.325 1.133l-3.907 24.765a.806.806 0 0 0 .795.932h5.791l1.454-9.225z"
                    fill="#253b80"
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
