import CategoryHeader from "@/ClientFiles/Components/Home/CategoryHeader/CategoryHeader";
import Banner from "@/ClientFiles/Components/Shared/Banner/Banner";
import Container from "@/ClientFiles/Components/Shared/Container/Container";
import ItemCard from "@/ClientFiles/Components/Shared/ItemCard/ItemCard";
import { event_And_Sports, movie } from "@/ClientFiles/Types/CommonTypes";
import { getLatestData } from "@/ClientFiles/Utils/FetchPagedata";

const page = async () => {
  const categories = [
    { title: "movies", path: "/movies" },
    { title: "events", path: "/events" },
    { title: "sports", path: "/sports" },
  ];
  const latestItems: Record<string, (movie | event_And_Sports)[]> =
    await getLatestData();
  const latestItemName = Object.keys(latestItems);

  return (
    <>
      <Banner bannerImg="/images/banner01.jpg" />
      <Container>
        {categories.map((category, index) => (
          <div key={index}>
            <CategoryHeader
              values={{ title: category.title, link: category.path }}
            />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 my-10">
              {latestItems[latestItemName[index]].map((item, index) => (
                <ItemCard
                  key={index}
                  values={{
                    item: JSON.parse(JSON.stringify(item)),
                    path: `/category/${item.category}s/${item._id}`,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </Container>
    </>
  );
};

export default page;
