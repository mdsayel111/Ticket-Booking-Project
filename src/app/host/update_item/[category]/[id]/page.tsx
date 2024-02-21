import UpdateEventOrSport from "@/ClientFiles/Components/UpdateEventOrSport/UpdateEventOrSport";
import UpdateMovie from "@/ClientFiles/Components/UpdateMovie/UpdateMovie";
import { getAddedSingleItemsData } from "@/ClientFiles/Utils/FetchPagedata";
import { verifyHost } from "@/ClientFiles/Utils/auth-utils";
import { connectDB } from "@/ServerFiles/Utils/MongoDB-Utils";
import { NoSsr } from "@mui/material";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async ({
  params,
  searchParams,
}: {
  params: { category: string; id: string };
  searchParams: { email: string };
}) => {
  const { category } = params;
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
  let singleData;
  if (isVerify) {
    await connectDB();
    const res = await getAddedSingleItemsData(searchParams, params);
    singleData = res.singleData;
  } else {
    redirect("/signup_or_signin");
  }

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
