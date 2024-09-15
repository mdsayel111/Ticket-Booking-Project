"use client";
import React, { FC, MouseEventHandler } from "react";
import { commonBtnProps, event_And_Sports, movie } from "../Types/CommonTypes";
import { useAppSelector } from "../Hooks/ReduxHook";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

// return button component with handle bokking function and value
const BookingBtn = ({
  ButtonComponent,
  value,
  item,
}: {
  ButtonComponent: FC<commonBtnProps>;
  value: {
    text: string;
    className?: string;
  };
  item: event_And_Sports | movie;
}) => {
  const axiosSecure = useAxiosSecure();
  const { userInfo } = useAppSelector((state) => state.user);
  const router = useRouter();

  // handle booking
  const handleBooking: MouseEventHandler<HTMLButtonElement> = async (e) => {
    // creat booking object
    const bookingObj = {
      userName: userInfo.name,
      userEmail: userInfo.email,
      hostName: item.hostName,
      hostEmail: item.hostEmail,
      bookingsItem: item,
      status: "pending",
    };
    // add booking
    const { data } = await axiosSecure.post(
      `/api/v1/user_apis/booking?email=${userInfo.email}`,
      bookingObj
    );
    toast.success(data.message);
    router.refresh();
  };

  return (
    // call and return button component with onClick and value
    <>{<ButtonComponent value={{ ...value, onClick: handleBooking }} />}</>
  );
};

export default BookingBtn;
