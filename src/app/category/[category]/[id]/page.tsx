import Event_Or_Sports_Details from "@/ClientFiles/Components/ItemDetails/Event_Or_Sports_Details";
import MovieDetails from "@/ClientFiles/Components/ItemDetails/MovieDetails";
import { getData } from "@/ClientFiles/Utils/FetchPagedata";

const page = async ({
  params,
}: {
  params: { category: string; id: string };
}) => {
  const { category, id } = params;
  const { singleData: item } = await getData(params, {
    id,
  });
  return (
    <>
      {category === "movies" ? (
        <MovieDetails values={{ item: item }} />
      ) : (
        <Event_Or_Sports_Details values={{ item: item }} />
      )}
    </>
  );
};

export default page;
