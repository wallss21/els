import React from "react";
import { useNavigate } from "react-router-dom";
import { Title } from "./text";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/products/cartSlice";
import numeral from "numeral";
import { GoDotFill } from "react-icons/go";

function Product({ product, id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div key={id} className="product mb-3">
      <div
        onClick={() => {
          navigate(
            `/products/${product.name
              .split(" ")
              .join("-")
              .split(".")
              .join("")
              .split("'")
              .join("")}`,
            { state: product }
          );
        }}
      >
        <div
          onMouseOver={(e) => {
            if (product.img2 !== "") {
              e.currentTarget.firstElementChild.classList.add("hidden");
              e.currentTarget.firstElementChild.nextElementSibling.classList.remove(
                "hidden"
              );
            }

            e.currentTarget.lastElementChild.classList.remove("hidden");
          }}
          onMouseLeave={(e) => {
            e.currentTarget.lastElementChild.classList.add("hidden");
            if (product.img2 !== "") {
              e.currentTarget.firstElementChild.classList.remove("hidden");
              e.currentTarget.firstElementChild.nextElementSibling.classList.add(
                "hidden"
              );
            }
          }}
          className="img relative z-10 bg-blend-screen flex flex-col bg-light  justify-center items-center "
        >
          <img
            className=" self-center mix-blend-multiply w-full "
            src={product.img1}
            alt=""
            srcSet=""
          />
          <img
            className=" hidden self-center mix-blend-multiply w-full "
            src={product.img2}
            alt=""
            srcSet=""
          />
          {product.discount_percent > 0 && (
            <span className="text-red-600   absolute top-1 right-1 float-end px-2 py-2 bg-red-100">
              -{product.discount_percent}%
            </span>
          )}
          <div className="hidden w-full z-[100]  absolute bottom-2 add_to_cart_btn   ">
            <div className="hidden lg:block">
              <p
                onClick={(e) => {
                  dispatch(addToCart({ item: { ...product, count: 1 } }));
                  e.stopPropagation();
                  e.preventDefault();
                }}
                className="text-xs cursor-pointer text-[#282828] text-center z-[100]  mx-2 py-4 bg-white border border-gray-300 "
              >
                + Add to Cart
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <div
          className="font-mont lg:px-3 px-2 text-sm cursor-pointer text-[#282828] hover:text-[#282828] hover:no-underline"
          onClick={() => {
            navigate(
              `/products/${product.name
                .replaceAll(" ", "-")
                .replaceAll(".", "")
                .replaceAll("'", "")}`,
              { state: product }
            );
          }}
        >
          <div className="title  mb-1">
            <Title
              text_s={"text-xs"}
              color={"text-gray-600"}
              title={"El Classic Jewelry"}
            />
          </div>
          <p className="name  text-sm text-start font-mont mt-2 line-clamp-3">
            {product.name}
          </p>

          <div className="pt-2">
            <div className="gap-x-4 flex justify-center  items-center">
              {product.display_price < product.price && (
                <p className="text-sm font-mont font-light text-red-600 line-through ">
                  ${numeral(product.price).format()}
                </p>
              )}
              <p className="text-sm font-light font-mont ">
                ${numeral(product.display_price).format()}
              </p>
            </div>

            {product.number_in_stock < 4 ? (
              <div className="pb-3 py-2 flex items-center space-x-2">
                <GoDotFill color="#f14b4b" />
                <span className=" absolute z-30 text-[#f14b4b] text-xs font-medium me-2 px-2.5  ">
                  <Title
                    title={`Hurry ${product.number_in_stock} Left`}
                    color={"text-[#f14b4b]"}
                  />
                </span>
              </div>
            ) : (
              <div className="pb-3 py-2 flex items-center space-x-2">
                <GoDotFill color="#4dce6f" />
                <span className=" absolute z-30 text-white text-xs font-medium me-2 px-2.5  ">
                  <Title title={`In stock`} color="text-green-600" />
                </span>
              </div>
            )}
            <div className="addtocart pt-1 lg:hidden">
              <button
                onClick={(e) =>
                  dispatch(addToCart({ item: { ...product, count: 1 } }))
                }
                className="w-full bg-[#282828] rounded text-white py-4"
              >
                + add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
