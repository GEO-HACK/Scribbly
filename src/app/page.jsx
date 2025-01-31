import Featured from "@/components/featured/Featured";
import CategoryList from "@/components/categoryList/CategoryList";
import CardList from "@/components/cardList/CardList";
import Menu from "@/components/menu/Menu";

const Page = async ({ searchParams }) => {
  // Ensure searchParams is awaited properly
  const { page = "1", cat = null } = searchParams ?? {};

  // Parse the page number as an integer, defaulting to 1
  const pageNum = parseInt(page, 10);

  return (
    <div>
      <Featured />
      <CategoryList />
      <div className="flex gap-[50px] mt-6">
        <CardList page={pageNum} cat={cat} />
        <Menu />
      </div>
    </div>
  );
};

export default Page;
