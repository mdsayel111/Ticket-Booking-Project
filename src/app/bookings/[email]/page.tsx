import BookingCard from "@/ClientFiles/Components/Booking/BookingCard/BookingCard";
import Container from "@/ClientFiles/Components/Shared/Container/Container";
import NoSSR from "@/ClientFiles/Components/Wraper/NoSSR";
import { getBookingsData } from "@/ClientFiles/Utils/FetchPagedata";
import { verifyToken } from "@/ClientFiles/Utils/auth-utils";
import { connectDB } from "@/ServerFiles/Utils/MongoDB-Utils";
import { verify } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const page = async ({
  params,
  searchParams,
}: {
  params: { email: string };
  searchParams: { email: string };
}) => {
  // get cookies
  const cookieStore = cookies();
  const tokenObj = cookieStore.get("token");
  const token = tokenObj?.value as string;
  // format email
  params.email = params.email.replace("%40", "@");
  // fetch all bookings data
  let bookingData = [];
  const isVerify = await verifyToken({
    // send email like searchParams
    searchParams: { email: params.email },
    token,
  });
  console.log(isVerify);
  if (isVerify) {
    await connectDB();
    const res = await getBookingsData(params);
    bookingData = res.bookingData;
  } else {
    redirect("/signup_or_signin");
  }
  return (
    <Container>
      <div className="my-10 grid grid-col-1 lg:grid-cols-2 gap-10">
        {bookingData.map((booking: any) => (
          <NoSSR key={booking._id}>
            <BookingCard booking={booking} />
          </NoSSR>
        ))}
      </div>
    </Container>
  );
};

export default page;
