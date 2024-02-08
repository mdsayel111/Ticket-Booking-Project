"use client";
import { event_And_Sports, movie } from "@/ClientFiles/Types/CommonTypes";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ItemCard from "../Shared/ItemCard/ItemCard";
import BackgroundImage from "../Shared/BackgroundImage/BackgroundImage";
import FilterSection from "./Filter/FilterSection";
import Container from "../Shared/Container/Container";

interface dataType {
  multiData: (movie | event_And_Sports)[];
}

const CategoryPage = () => {
  const { category, id }: { category: string; id: string } = useParams();
  const [date, setDate] = useState<string | Date>("all");
  const [data, setData] = useState<dataType>({} as dataType);

  const fetchData = async () => {
    const data = await axios.get(
      `/api/v1/public_apis/category/${category}?date=${date.toString()}`
    );
    setData(data.data);
  };

  useEffect(() => {
    fetchData();
  }, [date, category]);

  return (
    <>
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
      <Container>
        <FilterSection
          values={{
            date: date === "all" ? "" : date,
            setDate: setDate,
          }}
        />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 my-10">
          {data?.multiData?.map((item: movie | event_And_Sports) => (
            <ItemCard
              key={item._id}
              values={{
                item: JSON.parse(JSON.stringify(item)),
                path: `/category/${category}/${item._id}`,
              }}
            />
          ))}
        </div>
      </Container>
    </>
  );
};

export default CategoryPage;
