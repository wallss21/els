import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import React from "react";

function MyCarousel() {
  return (
    <div className="hidden lg:block">
      <Carousel
        autoPlay
        infiniteLoop
        statusFormatter={() => false}
        swipeable
        renderThumbs={() => false}
      >
        <div>
          <img
            className=""
            src="https://outlet.wallacebishop.com.au/cdn/shop/files/casio-banner_1300x.png?v=1703383319"
            alt="..."
          />
        </div>
        <div>
          <img
            className=""
            src="https://outlet.wallacebishop.com.au/cdn/shop/files/loyal_6831541c-c1d3-4a89-9a88-cc5e666ef8ab_1300x.png?v=1703384608"
            alt="..."
          />
        </div>
        <div>
          <img
            className=""
            src="https://outlet.wallacebishop.com.au/cdn/shop/files/hoe_1300x.png?v=1703385759"
            alt="..."
          />
        </div>
      </Carousel>
    </div>
  );
}

export function MoCarousel() {
  return (
    <div className="md:hidden">
      <Carousel
        className="z-0"
        autoPlay
        infiniteLoop
        emulateTouch
        statusFormatter={() => false}
        swipeable
        renderThumbs={() => false}
        preventMovementUntilSwipeScrollTolerance={true}
        swipeScrollTolerance={50}
        renderArrowNext={() => false}
        renderArrowPrev={() => false}
        showStatus={() => false}
      >
        <div>
          <img
            className=""
            src="https://outlet.wallacebishop.com.au/cdn/shop/files/loyalmobile_800x.png?v=1703384506"
            alt="..."
          />
        </div>
        <div>
          <img
            className=""
            src="https://outlet.wallacebishop.com.au/cdn/shop/files/BoxingDay-Outlet-Mobile_Banner_1200x.png?v=1703375009"
            alt="..."
          />
        </div>
        <div>
          <img
            className=""
            src="https://outlet.wallacebishop.com.au/cdn/shop/files/em_1200x.png?v=1703386525"
            alt="..."
          />
        </div>
      </Carousel>
    </div>
  );
}

export function ProductCarousel({ imgs }) {
  return (
    <div className="prduct_carousel ">
      <Carousel
        statusFormatter={() => false}
        className=""
        // autoPlay
        // infiniteLoop
        // emulateTouch
        swipeable
        // renderThumbs={() => false}
        preventMovementUntilSwipeScrollTolerance={true}
        swipeScrollTolerance={50}
        renderArrowNext={() => true}
        renderArrowPrev={() => true}
        showStatus={() => false}
      >
        {imgs.split(",").map((img) => {
          return (
            <div className="bg-gray-300 mx-auto">
              <img
                className="lg:w-10/12 bg-blend-multiply "
                src={img}
                alt="..."
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export default MyCarousel;
