"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ItemCard from "../Shared/ItemCard/ItemCard";
import { event_And_Sports, movie } from "@/ClientFiles/Types/CommonTypes";

interface dataType {
  multiData: (movie | event_And_Sports)[];
}

const CategoryPage = () => {
  const { category, id } = useParams();
  const [date, setDate] = useState<string>("all");
  const [data, setData] = useState<dataType>({} as dataType);

  const fetchData = async () => {
    const data = await axios.get(
      `/api/v1/public_apis/${category}?date=${date}`
    );
    setData(data.data);
  };

  useEffect(() => {
    fetchData();
  }, [date, category]);

  return (
    <div className="flex flex-wrap justify-center gap-8 my-10">
      {data?.multiData?.map((item: movie | event_And_Sports) => (
        <ItemCard
          key={item._id}
          values={{
            item: JSON.parse(JSON.stringify(item)),
            path: `/${category}/${item._id}`,
          }}
        />
      ))}
    </div>
  );
};

export default CategoryPage;
