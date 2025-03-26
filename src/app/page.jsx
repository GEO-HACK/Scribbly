export const dynamic = 'force-dynamic'


import { Suspense } from "react";
import Featured from "@/components/featured/Featured";
import CategoryList from "@/components/categoryList/CategoryList";
import CardList from "@/components/cardList/CardList";
import Menu from "@/components/menu/Menu";

export default function Page() {
  return (
    <div>
      <Featured />
      <CategoryList />
      <div className="flex gap-[50px] mt-6">
        <Suspense fallback={<div>Loading...</div>}>
          <CardList />
        </Suspense>
        <Suspense fallback={<div>Loading menu...</div>}>
          <Menu />
        </Suspense>
      </div>
    </div>
  );
}
