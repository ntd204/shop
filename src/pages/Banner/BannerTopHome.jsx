import React from "react";
import { BackGround } from "../../utils/Images";
import { Link } from "react-router-dom";

const BannerTopHome = () => {
  return (
    <div>
      <div className="animate-zoomIn relative">
        <img className="w-screen h-[500px]" src={BackGround} alt="" />
        <div className="absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <h2 className="text-xl lg:text-4xl font-bold text-white lg:leading-10 animate-slideInLeft">
            Harmony in Design: <br />
            Blending Form and Function
          </h2>

          <Link
            style={{ animationDelay: "0.3s" }}
            to={"/product"}
            className="animate-slideInLeft mt-4 lg:mt-8 h-9 border border-white px-7 inline-flex items-center font-semibold text-white rounded-full text-[15px] hover:bg-white hover:text-black transition-all duration-300"
          >
            Shop now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BannerTopHome;
