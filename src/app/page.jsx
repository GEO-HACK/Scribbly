import React from "react";
import Featured from "@/components/featured/Featured";
import CategoryList from "@/components/categoryList/CategoryList";
import CardList from "@/components/cardList/CardList";
import Menu from "@/components/menu/Menu";

const page = () => {
  return (
    <div>
      <Featured/>
      <CategoryList/>
      <div className="flex gap-[50px] mt-6 ">
        <CardList/>
        <Menu/>
      </div>  
    </div>
  );
};

export default page;
