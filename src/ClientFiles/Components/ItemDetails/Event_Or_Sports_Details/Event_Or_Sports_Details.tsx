import BookingBtn from "@/ClientFiles/HOC/BookingBtn";
import { event_And_Sports } from "@/ClientFiles/Types/CommonTypes";
import Image from "next/image";
import BackgroundImage from "../../Shared/BackgroundImage/BackgroundImage";
import CommonButton from "../../Shared/CommonButton/CommonButton";
import Container from "../../Shared/Container/Container";
import CountDawn from "../../Shared/CountDawn/CountDawn";

const Event_Or_Sports_Details = ({
  values,
}: {
  values: { item: event_And_Sports };
}) => {
  const { item } = values;
  return (
    <div className="my-10 h-max">
      <div>
        <BackgroundImage values={{ background: `url("${item.bgImg}")` }}>
          <></>
        </BackgroundImage>
        <Container>
          <div className="flex items-center justify-between flex-col-reverse md:flex-row">
            <div className="space-y-2 w-1/2">
              <h3 className="text-[var(--tertiary)] text-xl font-bold">
                ARE YOU READY TO ATTEND?
              </h3>
              <h2 className="text-[var(--red)] text-3xl font-bold">
                {item.title}
              </h2>
              <p className="text-white">{item.description}</p>
              <div>
                {/* call HOC for booking btn with onClick function */}
                <BookingBtn
                  item={item}
                  ButtonComponent={CommonButton}
                  value={{
                    text: "Book Ticket",
                    className: "w-[140px]",
                  }}
                />
              </div>
            </div>
            <div
              className="h-[300px] w-[300px] flex justify-center items-center"
              style={{
                background:
                  "linear-gradient(90deg, #5560ff 17%, #aa52a1 63%, #ff4343 100%)",
              }}
            >
              <div className="w-[98%] relative h-[98%] bg-[var(--primary)] m-auto">
                <Image
                  className="relative !top-[-10%] !left-[-10%]"
                  src={item.img}
                  fill
                  alt="img"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4 w-fit mx-auto p-8 bg-[#032055] my-10 rounded-lg flex-col md:flex-row">
            <div className="flex items-center gap-4 p-4 bg-[#08378E]">
              <Image
                src={
                  "https://pixner.net/boleto/demo/assets/images/statistics/stat01.png"
                }
                width={40}
                height={40}
                alt="img"
              />
              <div className="flex items-center flex-col">
                <CountDawn
                  values={{
                    value: item.stats.ticketBooked,
                    className: "text-3xl",
                  }}
                />
                <h3 className="text-white">Booked Ticket</h3>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-[#08378E]">
              <Image
                src={
                  "https://pixner.net/boleto/demo/assets/images/statistics/stat02.png"
                }
                width={40}
                height={40}
                alt="img"
              />
              <div className="flex items-center flex-col">
                <CountDawn
                  values={{
                    value: item.stats.usefulSession,
                    className: "text-3xl",
                  }}
                />
                <h3 className="text-white">Usefull Session</h3>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-[#08378E]">
              <Image
                src={
                  "https://pixner.net/boleto/demo/assets/images/statistics/stat03.png"
                }
                width={40}
                height={40}
                alt="img"
              />
              <div className="flex items-center flex-col">
                <CountDawn
                  values={{
                    value: item.stats.talentSpeaker,
                    className: "text-3xl",
                  }}
                />
                <h3 className="text-white">Talent Speaker</h3>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Event_Or_Sports_Details;
