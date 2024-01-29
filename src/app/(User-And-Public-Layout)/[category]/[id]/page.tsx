import { getData } from "@/ClientFiles/Utils/FetchPagedata";
import React from "react";

const page = async ({
  params,
}: {
  params: { category: string; id: string };
}) => {
  const { category, id } = params;
  const data = await getData(params, { id });
  return <div></div>;
};

export default page;
