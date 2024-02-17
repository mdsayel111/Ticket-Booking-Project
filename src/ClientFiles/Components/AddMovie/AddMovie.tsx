"use client";
import { useAppSelector } from "@/ClientFiles/Hooks/ReduxHook";
import useAxiosSecure from "@/ClientFiles/Hooks/useAxiosSecure";
import { uploadImage } from "@/ClientFiles/Utils/ImageUpload";
import { Grid } from "@mui/material";
import axios from "axios";
import { FormEvent } from "react";
import { MdMovie } from "react-icons/md";
import BackgroundImage from "../Shared/BackgroundImage/BackgroundImage";
import Form from "../Shared/Form/Form";
import CheckBox from "../Shared/Input/CheckBox";
import FileInput from "../Shared/Input/FileInput";
import Input from "../Shared/Input/Input";
import TextArea from "../Shared/Input/TextArea";
import toast from "react-hot-toast";
import MovieForm from "../Shared/MovieForm/MovieForm";

const AddMovie = () => {
  const { userInfo } = useAppSelector((state: any) => state.user);
  const axiosSecure = useAxiosSecure();

  const handleAddMovie = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form: any = e.target;
    const name = form.name.value;
    const duration = form.duration.value;
    const price = form.price.value;
    const location = form.location.value;
    const description = form.description.value;
    const thumbnailImg = form.thumbnailImg.files[0];
    const bgImg = form.bgImg.files[0];
    const sliderImg = [...form.sliderImg.files];

    const thumbnailImgUrl = await uploadImage(thumbnailImg);
    const bgImgUrl = await uploadImage(bgImg);
    const sliderImgUrl = await uploadImage(sliderImg);

    // make language array
    const languageArray: string[] = [];
    form.english.checked && languageArray.push("English");
    form.hindi.checked && languageArray.push("Hindi");
    form.bengali.checked && languageArray.push("Bengali");

    // creat movie object
    const movie = {
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

    // add movie
    const result = await axiosSecure.post(
      `/api/v1/host_apis/category/movies?email=${userInfo.email}`,
      movie
    );
    toast.success(result.data.message);
    form.reset();
  };
  return <MovieForm handleSubmit={handleAddMovie} />;
};

export default AddMovie;
