import AllCategoryItems from "@/ClientFiles/Components/Shared/AllCategoryItems/AllCategoryItems";
import TextAnimation from "@/ClientFiles/Components/Shared/TextAnimation/TextAnimation";
import { event_And_Sports, movie } from "@/ClientFiles/Types/CommonTypes";
import { getAddedItemsData } from "@/ClientFiles/Utils/FetchPagedata";
import { verifyHost } from "@/ClientFiles/Utils/auth-utils";
import { connectDB } from "@/ServerFiles/Utils/MongoDB-Utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async ({
  params,
  searchParams,
}: {
  params: { categoryName: string };
  searchParams: { email: string };
}) => {
  // get cookies
  const cookieStore = cookies();
  const tokenObj = cookieStore.get("token");
  const token = tokenObj?.value as string;
  // format email
  searchParams.email = searchParams.email.replace("%40", "@");
  // fetch all bookings data
  const isVerify = await verifyHost({
    // send email like searchParams
    searchParams,
    token,
  });
  let addedItems: Record<string, (movie | event_And_Sports)[]>;
  console.log(isVerify);
  if (isVerify) {
    await connectDB();
    addedItems = await getAddedItemsData(searchParams);
  } else {
    redirect("/signup_or_signin");
  }

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
