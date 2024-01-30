import React from "react";
import { Title } from "../components/text";

function Showcase() {
  return (
    <section className="show">
      <div className="title pt-16 pb-5 lg:pb-2 text-center">
        <Title title={"SAVVY GIFTING SOLUTIONS"} />
      </div>{" "}
      <div className="lg:grid grid-cols-4 container px-5 lg:px-0 mx-auto  lg:gap-x-3 lg:py-10 flex overflow-x-auto no-scrollbar">
        <div className="case min-w-fit">
          <img
            className="w-11/12"
            src="https://www.wallacebishop.com.au/cdn/shop/files/100_df9fabcc-70a2-40f8-91b1-80907f0e0d1e_500x.png?v=1701050119"
            alt="gift"
            srcSet=""
          />
        </div>
        <div className="case min-w-fit">
          <img
            className="w-11/12"
            src="https://www.wallacebishop.com.au/cdn/shop/files/500_500x.png?v=1701049718"
            alt="gift"
            srcSet=""
          />
        </div>
        <div className="case min-w-fit">
          <img
            className="w-11/12"
            src="https://www.wallacebishop.com.au/cdn/shop/files/300_be020b6d-20cd-4795-ae68-566888241349_500x.png?v=1701050388"
            alt="gift"
            srcSet=""
          />
        </div>
        <div className="case min-w-fit">
          <img
            className="w-11/12"
            src="https://www.wallacebishop.com.au/cdn/shop/files/500_3d3b1df6-5339-4ac8-a8b2-bb088b42978b_500x.png?v=1701050502"
            alt="gift"
            srcSet=""
          />
        </div>
      </div>
    </section>
  );
}

export default Showcase;
