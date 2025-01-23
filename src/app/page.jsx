

import Featured from "@/components/featured/Featured";
import CategoryList from "@/components/categoryList/CategoryList";
import CardList from "@/components/cardList/CardList";
import Menu from "@/components/menu/Menu";

const Page = ({searchParams}) => {

  const page = parseInt(searchParams.page) || 1;

  return (
    <div>
      <Featured />
      <CategoryList />
      <div className="flex gap-[50px] mt-6 ">
        <CardList page={page} />
        <Menu />
      </div>
    </div>
  );
};

export default Page;
