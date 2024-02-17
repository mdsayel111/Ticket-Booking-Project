"use client";
import { useAppSelector } from "@/ClientFiles/Hooks/ReduxHook";
import useAxiosSecure from "@/ClientFiles/Hooks/useAxiosSecure";
import { uploadImage } from "@/ClientFiles/Utils/ImageUpload";
import { FormEvent } from "react";
import toast from "react-hot-toast";
import EventOrSportsForm from "../Shared/EventOrSportsForm/EventOrSportsForm";
import { event_And_Sports } from "@/ClientFiles/Types/CommonTypes";

const AddEventOrSports = ({
  category,
}: {
  category: string;
  item?: event_And_Sports;
}) => {
  const { userInfo } = useAppSelector((state: any) => state.user);
  const axiosSecure = useAxiosSecure();

  const handleAddEventOrSports = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form: any = e.target;
    const name = form.name.value;
    const price = form.price.value;
    const talentSpeaker = form.talentSpeaker.value;
    const usefulSession = form.usefulSession.value;
    const location = form.location.value;
    const description = form.description.value;
    const thumbnailImg = form.thumbnailImg.files[0];
    const bgImg = form.bgImg.files[0];

    const thumbnailImgUrl = await uploadImage(thumbnailImg);
    const bgImgUrl = await uploadImage(bgImg);

    // creat movie object
    const eventOrSportsObj = {
      title: name,
      price,
      location,
      description,
      img: thumbnailImgUrl,
      bgImg: bgImgUrl,
      stats: {
        talentSpeaker,
        usefulSession,
      },
      category,
      hostName: userInfo.name,
      hostEmail: userInfo.email,
    };

    // add movie
    const result = await axiosSecure.post(
      `/api/v1/host_apis/category/events?email=${userInfo.email}`,
      eventOrSportsObj
    );
    toast.success(result.data.message);
    form.reset();
  };
  return <EventOrSportsForm handleAddEventOrSports={handleAddEventOrSports} />;
};

export default AddEventOrSports;
