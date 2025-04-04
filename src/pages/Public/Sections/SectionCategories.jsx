import React from "react";
import {
  Beauty,
  Furniture,
  Groceries,
  Kitchen_Accessories,
  Laptops,
  Mens_shirts,
  Mobile_Accessories,
  Pets_food,
} from "../../../utils/Images";
import BoxCategories from "../Boxs/BoxCategories";
import { Link } from "react-router-dom";

const SectionCategories = () => {
  const ourCategories = [
    {
      image: Beauty,
      name: "Beauty",
    },
    {
      image: Furniture,
      name: "Furniture",
    },
    {
      image: Groceries,
      name: "Groceries",
    },
    {
      image: Kitchen_Accessories,
      name: "Kitchen_Accessories",
    },
    {
      image: Laptops,
      name: "Laptops",
    },
    {
      image: Mens_shirts,
      name: "Mens_shirts",
    },
    {
      image: Mobile_Accessories,
      name: "Mobile_Accessories",
    },
    {
      image: Pets_food,
      name: "Pets_food",
    },
  ];
  return (
    <div className="bg-white p-10 ">
      <div className="w- flex items-center justify-between p-5">
        <p className="font-bold text-3xl ">Our Categories</p>
        <Link
          to={"/product"}
          className="mt-6 lg:mt-0 h-9 border border-black px-7 inline-flex items-center font-semibold text-black rounded-full text-[15px] hover:bg-black hover:text-white transition-all duration-300"
        >
          View all
        </Link>
      </div>
      <ul className="grid grid-cols-4 gap-3 items-center p-5">
        {ourCategories.map((item) => (
          <BoxCategories key={item.name} data={item} />
        ))}
      </ul>
    </div>
  );
};

export default SectionCategories;
