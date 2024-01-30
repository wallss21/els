import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Title } from "./text";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToCartdb } from "../features/products/cartSlice";
import numeral from "numeral";
import { useToaster } from "rsuite";
import { message } from "./shared/notification";

function Product({ product, id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toaster = useToaster();
  const token = useSelector((state) => state.auth.userDetails);

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
          <div className="hidden w-full z-[100]  absolute bottom-2 add_to_cart_btn   ">
            <p className="hidden lg:block">
              <p
                onClick={(e) => {
                  toaster.push(message("success", { ...product }), {
                    label: "topStart",
                    value: "topStart",
                    placement: "topEnd",
                    duration: 2000,
                  });
                  dispatch(
                    addToCartdb({
                      payload: { ...product, count:1 },
                      token: token,
                    })
                  );
                  e.stopPropagation();
                  e.preventDefault();
                }}
                className="text-xs cursor-pointer text-[#282828] text-center z-[100]  mx-2 py-4 bg-white border border-gray-300 "
              >
                + Add to Cart
              </p>
            </p>
          </div>
        </div>
      </div>
      <div className="text-center">
        <div
          className="font-mont text-sm cursor-pointer text-[#282828] hover:text-[#282828] hover:no-underline"
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
          <div className="title mt-5 mb-1">
            <Title
              text_s={"text-xs"}
              color={"text-gray-600"}
              title={"El Classic Jewelry"}
            />
          </div>
          <p className="name lg:px-3 text-sm font-mont mt-2">{product.name}</p>
          <div className="">
            <span className="prices  text-base font-mont ">
              ${numeral(product.price).format()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
