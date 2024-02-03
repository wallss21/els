import React from "react";
import { Text, Title, Button } from "../components/text";
import "./style.css";

function Gshock() {
  return (
    <section className="bg-white py-10 lg:py-10">
      <div className="lg:grid grid-cols-11 mx-auto container w-10/12 lg:mt-20  gap-x-16 items-center ">
        <div className="img col-span-5">
          <img
            src="https://www.wallacebishop.com.au/cdn/shop/files/Mudmaster_600x.png?v=1701050636"
            alt="watch"
          />
        </div>
        <div className="text col-span-6 ">
          <div className="title mt-10 mb-4">
            <Title title={"FREE ADVENTURE KIT"} />
          </div>
          <h4 className="text-xl text-[32px] font-mont mb-5">
            G-SHOCK MUDMASTER
          </h4>
          <div className="text gap-y-5 ">
            <Text
              fs={"text-sm"}
              moreClass={"font-light  "}
              data={
                "Developed for professionals working in the hardest environments or someone who likes to push the limits of their own toughness, the new GWGB1000 MUDMASTER  is radio-controlled and solar-powered"
              }
            />
          </div>
          <Text
            fs={"text-sm"}
            moreClass={" mt-10 font-light"}
            data={
              "We've teamed up with G-SHOCK to provide an exclusive Adventurer Pack with the purchase of any of the three new G-SHOCK MUDMASTER models"
            }
          />
          <Button title={"LEARN MORE"} />
        </div>
      </div>
      {/* <div className=" lg:grid grid-cols-11 mx-auto container w-10/12 mt-20  gap-x-16 items-center ">
        <div className="text col-span-6 ">
          <div className="title mt-10 mb-4">
            <Title title={"FREE ADVENTURE KIT"} />
          </div>
          TODO big title
          <h4 className="text-xl mb-5 font-mont text-[32px] font-medium">
            TISSOT
          </h4>

          <div className="text gap-y-5 ">
            <Text
              fs={"text-sm"}
              moreClass={"font-light  "}
              data={
                " In a world filled with distractions, find your own path. Your Tissot will be there with you, every second of the way."
              }
            />
          </div>
          <Text
            fs={"text-sm"}
            moreClass={" mt-10 font-light"}
            data={
              "Shop now for your new favorite Tissot watch. Where design, Swiss craftsmanship and performance meet."
            }
          />
          <Button title={"SHOP  NOW"} />
        </div>{" "}
        <div className="img col-span-5">
          <img
            src="https://www.wallacebishop.com.au/cdn/shop/files/Digital_1080x1080_LeLocle_T0064071103303_Lifestyle_700x.jpg?v=1701051106"
            alt="watch"
          />
        </div>
      </div> */}
    </section>
  );
}

export default Gshock;
