"use client";

import React, { FormEventHandler } from "react";
import BackgroundImage from "../BackgroundImage/BackgroundImage";
import Form from "../Form/Form";
import { Grid } from "@mui/material";
import Input from "../Input/Input";
import FileInput from "../Input/FileInput";
import TextArea from "../Input/TextArea";
import { MdEmojiEvents, MdSportsBaseball } from "react-icons/md";
import { useParams } from "next/navigation";

const EventOrSportsForm = ({
  handleAddEventOrSports,
  values,
  callFromUpdatePage,
}: {
  callFromUpdatePage?: boolean;
  handleAddEventOrSports: FormEventHandler<HTMLFormElement>;
  values?: {
    name: string;
    price: number;
    talentSpeaker: number;
    usefulSession: number;
    location: string;
    description: string;
  };
}) => {
  const { category } = useParams();
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
              handleSubmit: handleAddEventOrSports,
              icon:
                category === "events" ? (
                  <MdEmojiEvents />
                ) : (
                  <MdSportsBaseball />
                ),
              title: callFromUpdatePage
                ? category === "events"
                  ? "Update Event"
                  : "Update Sport"
                : category === "events"
                ? "Add Event"
                : "Add Sport",
              btnText: callFromUpdatePage
                ? category === "events"
                  ? "Update Event"
                  : "Update Sport"
                : category === "events"
                ? "Add Event"
                : "Add Sport",
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
                    maxLength={15}
                    values={{
                      name: "name",
                      title: "Name",
                      type: "text",
                      placeholder: "Name",
                      value: values && values.name,
                    }}
                  />
                  <div>
                    <Input
                      required={true}
                      values={{
                        name: "price",
                        title: "Price",
                        type: "number",
                        placeholder: "Price",
                        value: values && values.price,
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
                        value: values && values.talentSpeaker,
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
                        value: values && values.usefulSession,
                      }}
                    />
                  </div>
                  <div className="col-span-2 flex gap-4">
                    <FileInput
                      className="w-1/2"
                      required={callFromUpdatePage ? false : true}
                      values={{
                        multiple: false,
                        title: "Thumbnail Img",
                        name: "thumbnailImg",
                      }}
                    />
                    <FileInput
                      className="w-1/2"
                      required={callFromUpdatePage ? false : true}
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
                      value: values && values.location,
                    }}
                  />
                </div>
                <div className="w-full">
                  <TextArea
                    required={true}
                    values={{
                      name: "description",
                      title: "Description",
                      value: values && values.description,
                    }}
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

export default EventOrSportsForm;
