import React from "react";

const BoxCategories = ({ data }) => {
  return (
    <div>
      <img
        src={data.image}
        className="w-full h-50 rounded-2xl shadow-2xl hover:scale-105 "
      />
      <span className="font-semibold text-xl shadow-2xl">{data.name}</span>
    </div>
  );
};

export default BoxCategories;
