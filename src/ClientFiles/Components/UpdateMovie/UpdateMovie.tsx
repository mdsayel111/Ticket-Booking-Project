"use client";
import React, { FormEvent } from "react";
import MovieForm from "../Shared/MovieForm/MovieForm";
import { uploadImage } from "@/ClientFiles/Utils/ImageUpload";
import { useAppSelector } from "@/ClientFiles/Hooks/ReduxHook";
import useAxiosSecure from "@/ClientFiles/Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { movie } from "@/ClientFiles/Types/CommonTypes";
import { useRouter } from "next/navigation";

const UpdateMovie = ({ item }: { item: movie }) => {
  const { userInfo } = useAppSelector((state) => state.user);
  const axiosSecure = useAxiosSecure();
  const router = useRouter();

  const handleUpdateMovie = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form: any = e.target;
    // set old value if the user does not provide input otherwise set user value link
    const name = form.name.value || item.title;
    const duration = form.duration.value || item.duration;
    const price = form.price.value || item.price;
    const location = form.location.value || item.location;
    const description = form.description.value || item.description;
    const thumbnailImg = form.thumbnailImg.files[0];
    const bgImg = form.bgImg.files[0];
    const sliderImg = [...form.sliderImg.files];

    // set old image link if the user does not provide input otherwise upload imag on uimgbb and set link
    const thumbnailImgUrl =
      form.thumbnailImg.files.length < 1
        ? item.img
        : await uploadImage(thumbnailImg);
    const bgImgUrl =
      form.bgImg.files.length < 1 ? item.bgImg : await uploadImage(bgImg);
    const sliderImgUrl =
      form.sliderImg.files.length < 1
        ? item.photos
        : await uploadImage(sliderImg);

    // make language array
    const languageArray: string[] = [];
    form.english.checked && languageArray.push("English");
    form.hindi.checked && languageArray.push("Hindi");
    form.bengali.checked && languageArray.push("Bengali");

    // creat movie object
    const updatedMovieObj = {
      title: name,
      duration,
      language: languageArray,
      price,
      location,
      description,
      img: thumbnailImgUrl,
      bgImg: bgImgUrl,
      photos: sliderImgUrl,
      hostName: userInfo.name,
      hostEmail: userInfo.email,
    };

    // update movie
    const result = await axiosSecure.patch(
      `/api/v1/host_apis/category/movies?email=${userInfo.email}&id=${item._id}`,
      updatedMovieObj
    );
    toast.success(result.data.message);
    form.reset();
    router.refresh();
  };
  return (
    <div>
      <MovieForm
        callFromUpdatePage={true}
        handleSubmit={handleUpdateMovie}
        // passing value for set initial value of movie form
        values={{
          name: item.title,
          description: item.description,
          duration: item.duration,
          language: item.language,
          location: item.location,
          price: item.price,
        }}
      />
    </div>
  );
};

export default UpdateMovie;
