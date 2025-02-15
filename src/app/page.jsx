

import { Suspense } from "react";
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
        <Suspense fallback={<div>Loading...</div>}>
          <CardList page={page} cat={cat} />
        </Suspense>
        <Suspense fallback={<div>Loading menu...</div>}>
          <Menu />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;