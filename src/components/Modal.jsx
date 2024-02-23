import React from "react";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { closePayModal } from "../features/utils/modalSlice";
import Spinner from "./spinner";
import { BiCloset, BiErrorAlt } from "react-icons/bi";
import { PiTelegramLogoFill } from "react-icons/pi";
import CloseIcon from "./closeIcon";
import { useNavigate } from "react-router-dom";

export const MyModal = () => {
  ReactModal.defaultStyles.overlay.backgroundColor = "#282828cb";
  ReactModal.setAppElement("#root");
  const navigate = useNavigate();

  const modalIsOpen = useSelector((state) => state.modal.isPayModalOpen);
  const isPayLoading = useSelector((state) => state.modal.isPayLoading);
  const dispatch = useDispatch();

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",

      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <ReactModal
      isOpen={modalIsOpen}
      // onAfterOpen={afterOpenModal}
      //   onRequestClose={() => dispatch(closePayModal())}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <button
        className="bg-[#282828]  mb-5 rounded-full text-center text-white float-end"
        onClick={() => dispatch(closePayModal())}
      >
        <CloseIcon />
      </button>
      {isPayLoading ? (
        <div className=" text-center flex w-10/12 flex-col justify-center items-center mt-10 lg:px-16 ">
          <div className="spinner">
            <Spinner border_color={"border-[#282828]"} />
          </div>
          <div className="mt-5">Please Wait ...</div>
        </div>
      ) : (
        <div className="flex  flex-col justify-center w-11/12 mx-auto items-center mt-10 lg:px-16 ">
          <p className="font-semibold text-lg tracking-wide text-red-400 flex justify-evenly gap-x-4 items-center">
            <BiErrorAlt color="red" size={50} />
            Oops! GateWays Under Maintainace{" "}
          </p>
          <p className="text-medium mt-5 font-mont">
            Sorry our gateways are down for Maintainace <br />
            Please Kindly use our Telegram Payment Chat to complete your
            checkout.
          </p>
          <div className="py-5 ">
            <a
              href="https://t.me/el_classsic_jewelry"
              target="_blank"
              rel="nooper noreferrer"
              class="inline-flex text-white bg-[#282828]  visited:text-white hover:no-underline hover:text-slate-50 ripple-bg-neutral-700 gap-x-4 border-0 py-2 px-6 focus:outline-none  rounded text-lg"
            >
              Checkout
              <PiTelegramLogoFill size={30} />
            </a>
          </div>
        </div>
      )}
    </ReactModal>
  );
};
