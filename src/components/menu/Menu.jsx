import React from "react";
import Image from "next/image";
import Link from "next/link";
import MenuPosts from "../menuPosts/MenuPosts";
import MenuCategory from "../menucategory/MenuCategory";

const Menu = () => {
  return (
    <div className="max-w-[30%] mt-[30px] hidden lg:block md:block">
      <h2 className="text-gray-500 font-semibold">what's hot</h2>
      <h1 className="text-xl font-semibold">Most Popular</h1>
      <MenuPosts withImage={false}/>

     
      <h2 className="text-gray-500 font-semibold">Discover By Topic</h2>
      <h1 className="text-xl font-semibold">Categories</h1>
      <MenuCategory/>
      <h2 className="text-gray-500 font-semibold">Chosen by the editor</h2>
      <h1 className="text-xl font-semibold">Editors Pick</h1>
      <MenuPosts withImage={true}/>

     
    </div>
  );
};

export default Menu;
