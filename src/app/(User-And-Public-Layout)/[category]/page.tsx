import CategoryPage from "@/ClientFiles/Components/Category";
import ItemCard from "@/ClientFiles/Components/Shared/ItemCard/ItemCard";
import { event_And_Sports, movie } from "@/ClientFiles/Types/CommonTypes";
import { getData } from "@/ClientFiles/Utils/FetchPagedata";

const page = async ({
  params,
}: {
  params: { category: string };
  searchParams: Record<string, string>;
}) => {
  return (
    <CategoryPage />
  );
};

export default page;
