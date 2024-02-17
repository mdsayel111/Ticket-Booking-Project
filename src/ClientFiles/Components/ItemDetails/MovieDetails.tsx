import { movie } from "@/ClientFiles/Types/CommonTypes";
import moment from "moment";
import Image from "next/image";
import { FaCalendarAlt, FaStopwatch } from "react-icons/fa";
import BackgroundImage from "../Shared/BackgroundImage/BackgroundImage";

import { FcRating } from "react-icons/fc";
import CommonButton from "../Shared/CommonButton/CommonButton";
import Container from "../Shared/Container/Container";
import CountDawn from "../Shared/CountDawn/CountDawn";
import LogoGroup from "../Shared/LogoGroup/LogoGroup";
import BasicTabs from "./DetailsTabs/DetailsTabs";
import NoSSR from "../Wraper/NoSSR";

const MovieDetails = ({ values }: { values: { item: movie } }) => {
  const { item } = values;

  //   make Duration string

  function customDuration(duration: moment.Duration): string {
    const hours: number = Math.floor(duration.asHours());
    const minutes: number = Math.floor(duration.asMinutes()) % 60;
    const seconds: number = Math.floor(duration.asSeconds()) % 60;

    let result: string = "";

    if (hours > 0) {
      result += `${hours}h `;
    }

    if (minutes > 0) {
      result += `${minutes}m `;
    }

    if (seconds > 0) {
      result += `${seconds}s`;
    }

    return result.trim();
  }

  const duration: moment.Duration = moment.duration(item.duration, "seconds");
  const formattedDuration: string = customDuration(duration);

  return (
    <div>
      <BackgroundImage values={{ background: `url("${item.bgImg}")` }}>
        <span className="absolute z-20 rounded-lg overflow-hidden -bottom-10 left-[10%]">
          <Image src={item.img} width={200} height={400} alt="img" />
        </span>
        <div
          className="absolute z-20 bottom-10 flex justify-between"
          style={{
            left: "calc(10% + 230px)",
            width: "calc(100% - (10% + 300px))",
          }}
        >
          <div className="space-y-2">
            <h1 className="text-[var(--tertiary)] font-bold text-2xl">
              {item.title}
            </h1>
            <p className="text-white">
              Languages :{" "}
              {item.language.map((language, index) => (
                <span key={index}>{language} </span>
              ))}
            </p>
            <p className="text-white flex items-center gap-2">
              <FaCalendarAlt />
              {moment(item.date).format("DD/MM/YYYY")}
            </p>
            <p className="text-white flex items-center gap-2">
              <FaStopwatch />
              {formattedDuration}
            </p>
          </div>
          <div>
            <div className="flex justify-center gap-4 h-full">
              <div className="mt-auto">
                <LogoGroup />
              </div>
            </div>
          </div>
        </div>
      </BackgroundImage>
      <div className="w-full mt-8 text-white">
        <div className="flex items-center gap-2">
          <div
            className="flex items-center flex-col"
            style={{
              marginLeft: "calc(10% + 230px)",
              width: "calc(100% - (10% + 300px))",
            }}
          >
            <div className="flex gap-2">
              <Image
                src={
                  "https://pixner.net/boleto/demo/assets/images/movie/tomato2.png"
                }
                width={20}
                height={20}
                alt="img"
              />
              <p>
                <CountDawn values={{ value: 100 }} /> %
              </p>
            </div>
            <p>Tomatometer</p>
          </div>
          <div
            className="flex items-center flex-col"
            style={{
              width: "calc(100% - (10% + 300px))",
            }}
          >
            <div className="flex gap-2">
              <Image
                src={
                  "https://pixner.net/boleto/demo/assets/images/movie/cake2.png"
                }
                width={20}
                height={20}
                alt="img"
              />
              <p>
                <CountDawn values={{ value: 80 }} /> %
              </p>
            </div>
            <p>Audience Score</p>
          </div>
          <div
            className="flex items-center flex-col"
            style={{
              width: "calc(100% - (10% + 300px))",
            }}
          >
            <div className="flex gap-2">
              <FcRating className="w-5 h-5" />
              <p>
                <CountDawn values={{ value: item.rating }} />
              </p>
            </div>
            <p>Rating</p>
          </div>
          <div className="mr-8">
            <CommonButton
              value={{ text: "Book Ticket", className: "w-[140px]" }}
            />
          </div>
        </div>
      </div>
      <Container>
        <div>
          <h1 className="text-2xl text-white font-bold">PHOTOS</h1>
          <div className="flex gap-4">
            {item.photos.map((photo) => (
              <div key={photo} className="w-[200px]  relative h-[120px]">
                <Image src={photo} fill alt="img" />
              </div>
            ))}
          </div>
        </div>
        <div className="my-10">
          <NoSSR>
            <BasicTabs>
              <div>
                <p className="text-white">{item.description}</p>
              </div>
              <div></div>
            </BasicTabs>
          </NoSSR>
        </div>
      </Container>
    </div>
  );
};

export default MovieDetails;
