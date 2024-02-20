import BookingCard from "@/ClientFiles/Components/Booking/BookingCard/BookingCard";
import Container from "@/ClientFiles/Components/Shared/Container/Container";
import NoSSR from "@/ClientFiles/Components/Wraper/NoSSR";
import { getBookingsData } from "@/ClientFiles/Utils/FetchPagedata";

export const dynamic = "force-dynamic";

const page = async ({
  params,
}: // searchParams,
{
  params: { email: string };
  // searchParams: { email: string };
}) => {
  console.log("booking page");
  // format email
  params.email = params.email.replace("%40", "@");
  // fetch all bookings data
  const { bookingData } = await getBookingsData(params);
  console.log(bookingData);
  return (
    <Container>
      <div className="my-10 grid grid-cols-2 gap-10">
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
