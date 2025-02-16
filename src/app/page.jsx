import { suspense } from "react";
import Featured from "@/components/featured/Featured";
import CategoryList from "@/components/categoryList/CategoryList";
import CardList from "@/components/cardList/CardList";
import Menu from "@/components/menu/Menu";

const Page = ({ searchParams }) => {
  const page = parseInt(searchParams?.page || "1", 10);
  const cat = searchParams?.cat || null;

  return (
    <div>
      <Featured />
      <CategoryList />
      <div className="flex gap-[50px] mt-6">
        <suspense fallback={<div>Loading...</div>}>
          <CardList page={page} cat={cat} />
        </suspense>
        <suspense fallback={<div>Loading menu...</div>}>
          <Menu />
        </suspense>
      </div>
    </div>
  );
};

export default Page;
