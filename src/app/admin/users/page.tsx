import CustomTable from "@/ClientFiles/Components/Users/Table/Table";
import { getUserData } from "@/ClientFiles/Utils/FetchPagedata";
import React from "react";

const page = async ({
  params,
  searchParams,
}: {
  params: any;
  searchParams: { status: string };
}) => {
  const userData = await getUserData(searchParams);
  console.log(userData?.multiUser)
  return (
    <div>
      <CustomTable data={userData?.multiUser} />
    </div>
  );
};

export default page;
