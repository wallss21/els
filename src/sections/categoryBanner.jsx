import React from "react";
import { mainNav_featuredImages as fim } from "../assets/data";
import { useParams } from "react-router-dom";

function CategoryBanner() {
  const params = useParams();

  let data = { url: "", title: "" };

  params.category === "wedding-rings"
    ? (data = { ...data, url: fim.wedding, title: "Wedding Rings" })
    : params.category === "engagement-rings"
    ? (data = { ...data, url: fim.engagement, title: "Engagement Rings" })
    : params.category === "watches"
    ? (data = { ...data, url: fim.watches, title: "Watches" })
    : params.category === "jewellery"
    ? (data = { ...data, url: fim.jewelry, title: "Jewellery" })
    : (data = { ...data });

  console.log(data);

  return (
    <div className="top bg-center bg-cover"
    style={{backgroundImage:`url(${data.url})`}} 
    >
      
      <div 
     
      className="py-20 lg:py-32 bg-center overlay"   >
        
        <p className="text-5xl text-white font-mont font-meduim  text-center">
          {data.title}
        </p>
      </div>
    </div>
  );
}

export default CategoryBanner;
