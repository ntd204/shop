import React from "react";

const BoxService = ({ data }) => {
  return (
    <li className="flex justify-center items-center flex-1 gap-4">
      <img src={data.image} className="w-[50px]" />
      <span className="font-semibold text-xl">{data.title}</span>
    </li>
  );
};

export default BoxService;
