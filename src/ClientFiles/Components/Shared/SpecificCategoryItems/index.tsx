"use client";
import { event_And_Sports, movie } from "@/ClientFiles/Types/CommonTypes";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import FilterSection from "./Filter/FilterSection";

import { useAppSelector } from "@/ClientFiles/Hooks/ReduxHook";
import useAxiosSecure from "@/ClientFiles/Hooks/useAxiosSecure";
import BackgroundImage from "../BackgroundImage/BackgroundImage";
import Container from "../Container/Container";
import ItemCard from "../ItemCard/ItemCard";

interface dataType {
  multiData: (movie | event_And_Sports)[];
}

const SpecificCategoryItems = ({
  callFromHost,
}: {
  callFromHost?: boolean;
}) => {
  const { category, id }: { category: string; id: string } = useParams();
  const [date, setDate] = useState<string | Date>("all");
  const [data, setData] = useState<dataType>({} as dataType);
  const { userInfo } = useAppSelector((state) => state.user);
  const axiosSecure = useAxiosSecure();

  // make url for fetch data for admin or user
  const url = callFromHost
    ? `/api/v1/host_apis/category/${category}?email=${
        userInfo.email
      }&date=${date.toString()}`
    : `/api/v1/public_apis/category/${category}?date=${date.toString()}`;

  const fetchData = async () => {
    const data = await axiosSecure.get(url);
    setData(data.data);
  };

  useEffect(() => {
    fetchData();
  }, [date, category]);

  return (
    <>
      {/* if this component call from host show normal text otherwise show banner */}
      {callFromHost ? (
        <h1 className="text-[32px] text-center mt-10 m-4 font-bold text-white">
          YOUR ADDED{" "}
          <span className="text-[var(--tertiary)]">{`${category.toUpperCase()}`}</span>
        </h1>
      ) : (
        <BackgroundImage
          values={{
            background: `url(${
              category === "movies"
                ? "/images/banner02.jpg"
                : category === "events"
                ? "/images/banner05.jpg"
                : "/images/banner08.jpg"
            })`,
            marginTop: "-68px",
          }}
        >
          <div className="absolute z-20 text-center">
            <h1 className="text-[32px] mb-4 font-bold text-white">
              GET{" "}
              <span className="text-[var(--tertiary)]">{`${category.toUpperCase()}`}</span>{" "}
              TICKETS
            </h1>
            <p className="text-white font-semibold text-xl">
              {category === "movies" ? (
                <span>
                  Buy movie tickets in advance, find movie times watch trailers,{" "}
                  <br />
                  read movie reviews and much more
                </span>
              ) : category === "events" ? (
                <span>
                  Buy event tickets in advance, <br /> find event times and much
                  more
                </span>
              ) : (
                <span>
                  Buy match tickets in advance, <br /> find event times and much
                  more
                </span>
              )}
            </p>
          </div>
        </BackgroundImage>
      )}
      <Container>
        <FilterSection
          values={{
            date: date === "all" ? "" : date,
            setDate: setDate,
          }}
          className="w-fit mx-auto"
        />
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-fit mx-auto gap-8 my-10">
          {data?.multiData?.map((item: movie | event_And_Sports) => (
            <ItemCard
              callFromHost={callFromHost}
              key={item._id}
              values={{
                item: JSON.parse(JSON.stringify(item)),
                path: callFromHost
                  ? `/host/update_item/${category}/${item._id}?email=${userInfo.email}`
                  : `/category/${category}/${item._id}?email=${userInfo.email}`,
              }}
            />
          ))}
        </div>
      </Container>
    </>
  );
};

export default SpecificCategoryItems;
