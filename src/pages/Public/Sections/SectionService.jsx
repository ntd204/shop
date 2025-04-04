import React from "react";
import BoxService from "../Boxs/BoxService";
import { Delivery, Quality, Return, Support } from "../../../utils/Images";

const SectionService = () => {
  const dataServiceSection = [
    {
      image: Delivery,
      title: "Free Shipping Over $50",
    },
    {
      image: Quality,
      title: "Quality Assurance",
    },
    {
      image: Return,
      title: "Return within 14 days",
    },
    {
      image: Support,
      title: "Support 24/7",
    },
  ];
  return (
    <ul className="grid grid-cols-4 gap-5 items-center p-14 bg-gray-200">
      {dataServiceSection.map((item) => (
        <BoxService key={item.title} data={item} />
      ))}
    </ul>
  );
};

export default SectionService;
