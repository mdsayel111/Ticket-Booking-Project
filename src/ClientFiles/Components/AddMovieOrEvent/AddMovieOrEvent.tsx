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
import { MdSportsBaseball } from "react-icons/md";
import { MdEmojiEvents } from "react-icons/md";

const AddMovieOrEvent = ({ category }: { category: string }) => {
  const { userInfo } = useAppSelector((state: any) => state.user);
  const axiosSecure = useAxiosSecure();

  const handleAddMovie = async (e: FormEvent<HTMLFormElement>) => {
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
  return (
    <div className="w-full h-[100vh] my-[70px]">
      <BackgroundImage
        values={{
          background: `url("/images/account-bg.jpg")`,
          height: "100vh",
        }}
      >
        <div className="relative z-20 w-[90%]">
          <Form
            values={{
              handleSubmit: handleAddMovie,
              icon:
                category === "events" ? (
                  <MdEmojiEvents />
                ) : (
                  <MdSportsBaseball />
                ),
              title: category === "events" ? "Add Event" : "Add Sport",
              btnText: category === "events" ? "Add Event" : "Add Sport",
            }}
          >
            {
              <Grid
                container
                spacing={2}
                sx={{ margin: "0 auto", gap: "16px" }}
              >
                <div className="grid grid-cols-2 gap-4 w-full">
                  <Input
                    required={true}
                    values={{
                      name: "name",
                      title: "Name",
                      type: "text",
                      placeholder: "Name",
                    }}
                  />
                  <div>
                    {/* <Input
                      required={true}
                      values={{
                        name: "availableTicket",
                        title: "Available Ticket",
                        type: "number",
                        placeholder: "3600 s",
                      }}
                    /> */}
                    <Input
                      required={true}
                      values={{
                        name: "price",
                        title: "Price",
                        type: "number",
                        placeholder: "Price",
                      }}
                    />
                  </div>
                  <div className="flex gap-4 col-span-2">
                    <Input
                      required={true}
                      values={{
                        name: "talentSpeaker",
                        title: "Talent Speaker",
                        type: "number",
                        placeholder: "Talent Speaker",
                        className: "w-1/2",
                      }}
                    />
                    <Input
                      required={true}
                      values={{
                        name: "usefulSession",
                        title: "Useful Session",
                        type: "number",
                        placeholder: "Useful Session",
                        className: "w-1/2",
                      }}
                    />
                  </div>
                  <div className="col-span-2 flex gap-4">
                    <FileInput
                      className="w-1/2"
                      required={true}
                      values={{
                        multiple: false,
                        title: "Thumbnail Img",
                        name: "thumbnailImg",
                      }}
                    />
                    <FileInput
                      className="w-1/2"
                      required={true}
                      values={{
                        multiple: false,
                        title: "Background Img",
                        name: "bgImg",
                      }}
                    />
                  </div>
                  <Input
                    required={true}
                    values={{
                      name: "location",
                      title: "Location",
                      type: "text",
                      placeholder: "Location",
                      className: "col-span-2",
                    }}
                  />
                </div>
                <div className="w-full">
                  <TextArea
                    required={true}
                    values={{ name: "description", title: "Description" }}
                  />
                </div>
              </Grid>
            }
          </Form>
        </div>
      </BackgroundImage>
    </div>
  );
};

export default AddMovieOrEvent;
