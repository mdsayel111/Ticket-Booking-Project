import AllCategoryItems from "@/ClientFiles/Components/Shared/AllCategoryItems/AllCategoryItems";
import Banner from "@/ClientFiles/Components/Shared/Banner/Banner";
import CategoryHeader from "@/ClientFiles/Components/Shared/CategoryHeader/CategoryHeader";
import Container from "@/ClientFiles/Components/Shared/Container/Container";
import ItemCard from "@/ClientFiles/Components/Shared/ItemCard/ItemCard";
import { event_And_Sports, movie } from "@/ClientFiles/Types/CommonTypes";
import { getLatestData } from "@/ClientFiles/Utils/FetchPagedata";

const page = async () => {
  const latestItems: Record<string, (movie | event_And_Sports)[]> =
    await getLatestData();

  return (
    <>
      <Banner bannerImg="/images/banner01.jpg" />
      <AllCategoryItems
        items={latestItems}
        categories={[
          { title: "movies", path: "/category/movies" },
          { title: "events", path: "/category/events" },
          { title: "sports", path: "/category/sports" },
        ]}
      />
    </>
  );
};

export default page;
