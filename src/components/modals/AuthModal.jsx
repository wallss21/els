import React from "react";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { BiCloset, BiErrorAlt } from "react-icons/bi";
import { PiTelegramLogoFill } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { closeAuthModal } from "../../features/utils/modalSlice";
import { GoSignIn } from "react-icons/go";
import { CiLock } from "react-icons/ci";
import { IoLockClosed } from "react-icons/io5";

function AuthModal({ title, message }) {
    const data=useSelector(state=>state.modal.authMessage)
  ReactModal.defaultStyles.overlay.backgroundColor = "#282828cb";
  ReactModal.setAppElement("#root");
  const navigate = useNavigate();

  const modalIsOpen = useSelector(
    (state) => state.modal.isAuthMessageModalOpen
  );
  // const isPayLoading = useSelector((state) => state.modal.isPayLoading);
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
      <div className="flex  flex-col justify-center w-11/12 mx-auto items-center mt-10 lg:px-16 ">
        <p className="font-semibold text-xl tracking-wide text-[red] flex justify-evenly gap-x-4 items-center">
          <IoLockClosed color="red" size={50} />
          {data?.title?data.title:""}
        </p>
        <p className="text-medium mt-5 font-mont">
          {data?.message?data.message:""}
          {""}
        </p>    
        <div className="py-5 ">
          <Link
            onClick={()=>dispatch(closeAuthModal({ message: "", title: "" }))}
            to={"/accounts/login"}
            class="inline-flex text-white bg-[#282828]  visited:text-white hover:no-underline hover:text-slate-50 ripple-bg-neutral-700 gap-x-4 border-0 py-2 px-6 focus:outline-none  rounded text-lg"
          >
            <GoSignIn size={30} />
            Back to Login
          </Link>
        </div>
      </div>
    </ReactModal>
  );
}

export default AuthModal;
