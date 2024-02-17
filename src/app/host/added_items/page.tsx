import AllCategoryItems from "@/ClientFiles/Components/Shared/AllCategoryItems/AllCategoryItems";
import CategoryHeader from "@/ClientFiles/Components/Shared/CategoryHeader/CategoryHeader";
import Container from "@/ClientFiles/Components/Shared/Container/Container";
import ItemCard from "@/ClientFiles/Components/Shared/ItemCard/ItemCard";
import TextAnimation from "@/ClientFiles/Components/Shared/TextAnimation/TextAnimation";
import { event_And_Sports, movie } from "@/ClientFiles/Types/CommonTypes";
import { getAddedItemsData } from "@/ClientFiles/Utils/FetchPagedata";

const page = async ({
  params,
  searchParams,
}: {
  params: { categoryName: string };
  searchParams: { email: string };
}) => {
  const addedItems: Record<string, (movie | event_And_Sports)[]> =
    await getAddedItemsData(searchParams);

  return (
    <div>
      <div className="h-[25vh] mt-10">
        <TextAnimation
          className="w-full"
          value={{
            sameText: "YOUR ADDED",
            dainamicText: ["MOVIE", "EVENT", "SPORT"],
          }}
        />
      </div>
      <div>
        <AllCategoryItems
          callFromHost={true}
          items={addedItems}
          categories={[
            { title: "movies", path: "/host/added_items/movies" },
            { title: "events", path: "/host/added_items/events" },
            { title: "sports", path: "/host/added_items/sports" },
          ]}
        />
      </div>
    </div>
  );
};

export default page;
