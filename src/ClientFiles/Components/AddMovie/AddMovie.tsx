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
              icon: <MdMovie />,
              title: "Add Movie",
              btnText: "Add Movie",
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
                  <div className="flex gap-2">
                    <Input
                      required={true}
                      values={{
                        name: "duration",
                        title: "Duration",
                        type: "number",
                        placeholder: "3600 s",
                      }}
                    />
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
                  <div>
                    <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                      Languages
                    </h3>
                    <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <CheckBox
                          values={{
                            name: "english",
                            title: "English",
                            value: "english",
                          }}
                        />
                      </li>
                      <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <CheckBox
                          values={{
                            name: "hindi",
                            title: "Hindi",
                            value: "hindi",
                          }}
                        />
                      </li>
                      <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <CheckBox
                          values={{
                            name: "bengali",
                            title: "Bengali",
                            value: "bengali",
                          }}
                        />
                      </li>
                    </ul>
                  </div>
                  <div>
                    <FileInput
                      required={true}
                      values={{
                        multiple: false,
                        title: "Thumbnail Img",
                        name: "thumbnailImg",
                      }}
                    />
                    <FileInput
                      required={true}
                      values={{
                        multiple: false,
                        title: "Background Img",
                        name: "bgImg",
                      }}
                    />
                    <FileInput
                      required={true}
                      values={{
                        multiple: true,
                        title: "Slider Img",
                        name: "sliderImg",
                      }}
                    />
                  </div>
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

export default AddMovie;
