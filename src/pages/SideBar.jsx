import React, { useEffect, useState } from "react";
import apiCategory from "../services/apiCategory";

const SideBar = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchGetAllCategory = async () => {
      const res = await apiCategory.getAllCategory();
      if (res.status === 200) {
        setCategories(res.data);
      }
    };
    fetchGetAllCategory();
  }, []);

  return (
    <div>
      <ul className="font-bold">
        {categories.map((category) => (
          <li
            key={category}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
