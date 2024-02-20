import { Grid } from "@mui/material";
import { FormEventHandler } from "react";
import { MdMovie } from "react-icons/md";
import BackgroundImage from "../BackgroundImage/BackgroundImage";
import Form from "../Form/Form";
import CheckBox from "../Input/CheckBox";
import FileInput from "../Input/FileInput";
import Input from "../Input/Input";
import TextArea from "../Input/TextArea";

const MovieForm = ({
  handleSubmit,
  values,
  callFromUpdatePage,
}: {
  handleSubmit: FormEventHandler;
  values?: {
    name: string;
    duration: number;
    price: number;
    location: string;
    language: string[];
    description: string;
  };
  callFromUpdatePage?: boolean;
}) => {
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
              handleSubmit: handleSubmit,
              icon: <MdMovie />,
              // change btn text if copmonent call from user page
              title: callFromUpdatePage ? "Update Movie" : "Add Movie",
              btnText: callFromUpdatePage ? "Update Movie" : "Add Movie",
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
                    maxLength={15}
                    required={true}
                    values={{
                      name: "name",
                      title: "Name",
                      type: "text",
                      placeholder: "Name",
                      // set initial value of input if value exist
                      value: values && values.name,
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
                        // set initial value of input if value exist
                        value: values && values.duration,
                      }}
                    />
                    <Input
                      required={true}
                      values={{
                        name: "price",
                        title: "Price",
                        type: "number",
                        placeholder: "Price",
                        // set initial value of input if value exist
                        value: values && values.price,
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
                      // set initial value of input if value exist
                      value: values && values.location,
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
                            // set cheked value of input if value exist
                            cheked:
                              callFromUpdatePage &&
                              values?.language.includes("English"),
                          }}
                        />
                      </li>
                      <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <CheckBox
                          values={{
                            name: "hindi",
                            title: "Hindi",
                            // set cheked value of input if value exist
                            cheked:
                              callFromUpdatePage &&
                              values?.language.includes("Hindi"),
                          }}
                        />
                      </li>
                      <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <CheckBox
                          values={{
                            name: "bengali",
                            title: "Bengali",
                            // set cheked value of input if value exist
                            cheked:
                              callFromUpdatePage &&
                              values?.language.includes("Bengali"),
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
                    // set initial value of input if value exist
                    values={{
                      name: "description",
                      title: "Description",
                      value: values?.description,
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

export default MovieForm;
