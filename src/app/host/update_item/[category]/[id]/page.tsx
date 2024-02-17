import UpdateEventOrSport from "@/ClientFiles/Components/UpdateEventOrSport/UpdateEventOrSport";
import UpdateMovie from "@/ClientFiles/Components/UpdateMovie/UpdateMovie";
import { getAddedSingleItemsData } from "@/ClientFiles/Utils/FetchPagedata";
import { NoSsr } from "@mui/material";

const page = async ({
  params,
  searchParams,
}: {
  params: { category: string; id: string };
  searchParams: { email: string };
}) => {
  const { singleData } = await getAddedSingleItemsData(searchParams, params);
  const { category } = params;
  return (
    <div>
      {category === "movies" ? (
        <NoSsr>
          <UpdateMovie item={singleData} />
        </NoSsr>
      ) : (
        <UpdateEventOrSport item={singleData} />
      )}
    </div>
  );
};

export default page;
