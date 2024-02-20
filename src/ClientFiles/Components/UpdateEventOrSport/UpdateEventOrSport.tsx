"use client";
import React, { FormEvent } from "react";
import EventOrSportsForm from "../Shared/EventOrSportsForm/EventOrSportsForm";
import { event_And_Sports } from "@/ClientFiles/Types/CommonTypes";
import { uploadImage } from "@/ClientFiles/Utils/ImageUpload";
import useAxiosSecure from "@/ClientFiles/Hooks/useAxiosSecure";
import { useAppSelector } from "@/ClientFiles/Hooks/ReduxHook";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

const UpdateEventOrSport = ({ item }: { item: event_And_Sports }) => {
  const { category } = useParams();
  const axiosSecure = useAxiosSecure();
  const { userInfo } = useAppSelector((state) => state.user);
  const handleUpdateEventOrSport = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form: any = e.target;
    // set old value if the user does not provide input otherwise set user value link
    const name = form.name.value || item.title;
    const price = form.price.value || item.price;
    const talentSpeaker = form.talentSpeaker.value || item.stats.talentSpeaker;
    const usefulSession = form.usefulSession.value || item.stats.usefulSession;
    const location = form.location.value || item.location;
    const description = form.description.value || item.description;
    const thumbnailImg = form.thumbnailImg.files[0];
    const bgImg = form.bgImg.files[0];

    // set old image link if the user does not provide input otherwise upload imag on uimgbb and set link
    const thumbnailImgUrl =
      form.thumbnailImg.files.length < 1
        ? item.img
        : await uploadImage(thumbnailImg);
    const bgImgUrl =
      form.bgImg.files.length < 1 ? item.bgImg : await uploadImage(bgImg);

    // creat updated Event or sports object
    const updateEventOrSportsObj = {
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

    // add update or sports
    const result = await axiosSecure.patch(
      `/api/v1/host_apis/category/events?email=${userInfo.email}&id=${item._id}`,
      updateEventOrSportsObj
    );
    toast.success(result.data.message);
    form.reset();
  };
  return (
    <EventOrSportsForm
      callFromUpdatePage={true}
      handleAddEventOrSports={handleUpdateEventOrSport}
      // set deafault value of event or sports form's input
      values={{
        name: item.title,
        price: item.price,
        description: item.description,
        location: item.location,
        talentSpeaker: item.stats.talentSpeaker,
        usefulSession: item.stats.usefulSession,
      }}
    />
  );
};

export default UpdateEventOrSport;
