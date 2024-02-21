import Event_Or_Sports_Details from "@/ClientFiles/Components/ItemDetails/Event_Or_Sports_Details/Event_Or_Sports_Details";
import MovieDetails from "@/ClientFiles/Components/ItemDetails/MovieDetails/MovieDetails";

import { getData } from "@/ClientFiles/Utils/FetchPagedata";
import { verifyToken } from "@/ClientFiles/Utils/auth-utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { movie, event_And_Sports } from "@/ClientFiles/Types/CommonTypes";
import { connectDB } from "@/ServerFiles/Utils/MongoDB-Utils";

const page = async ({
  params,
  searchParams,
}: {
  params: { category: string; id: string };
  searchParams: { email: string };
}) => {
  const { category, id } = params;
  // get cookies
  const cookieStore = cookies();
  const tokenObj = cookieStore.get("token");
  const token = tokenObj?.value as string;
  // format email
  searchParams.email = searchParams.email.replace("%40", "@");
  // fetch all bookings data
  let bookingData = [];
  const isVerify = await verifyToken({
    // send email like searchParams
    searchParams,
    token,
  });
  let item;
  if (isVerify) {
    await connectDB();
    const { singleData } = await getData(params, {
      id,
    });
    item = singleData;
  } else {
    redirect("/signup_or_signin");
  }

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
