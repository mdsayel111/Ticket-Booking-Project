import CustomTable from "@/ClientFiles/Components/Users/Table/Table";
import { getUserData } from "@/ClientFiles/Utils/FetchPagedata";
import { verifyAdmin } from "@/ClientFiles/Utils/auth-utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({
  params,
  searchParams,
}: {
  params: any;
  searchParams: { status: string; email: string };
}) => {
  // get cookies
  const cookieStore = cookies();
  const tokenObj = cookieStore.get("token");
  const token = tokenObj?.value as string;
  // format email
  searchParams.email = searchParams?.email?.replace("%40", "@");
  // fetch all bookings data
  const isVerify = await verifyAdmin({
    // send email like searchParams
    searchParams,
    token,
  });
  let userData;
  if (isVerify) {
    const res = await getUserData(searchParams);
    userData = res;
  } else {
    redirect("/signup_or_signin");
  }
  return (
    <div>
      <CustomTable data={userData?.multiUser} />
    </div>
  );
};

export default page;
