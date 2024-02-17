"use client";
import { event_And_Sports, movie } from "@/ClientFiles/Types/CommonTypes";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { MouseEventHandler } from "react";
import NoSSR from "../../Wraper/NoSSR";
import UpdateAndDeleteBtnGroup from "../UpdateAndDeleteBtnGroup/UpdateAndDeleteBtnGroup";
import "./ItemCard.css";
var moment = require("moment");

const ItemCard = ({
  values,
  callFromHost,
  updatePath,
}: {
  values: { item: movie | event_And_Sports; path: string };
  callFromHost?: boolean;
  handleDelete?: MouseEventHandler;
  updatePath?: string;
}) => {
  const { item, path } = values;
  return (
    <NoSSR>
      <Link href={path}>
        <div id="card">
          <Card
            sx={{
              maxWidth: 320,
              backgroundColor: "#032055",
              position: "relative",
            }}
          >
            {callFromHost ? (
              <UpdateAndDeleteBtnGroup
                path={updatePath as string}
                category={`${item.category}s`}
                id={item._id}
              />
            ) : (
              <></>
            )}
            <div className="overflow-hidden">
              <CardMedia
                sx={{
                  height: 320,
                  width: 320,
                  margin: "0 auto",
                  backgroundPosition: "top center",
                }}
                image={`${item.img}`}
                title="green iguana"
              />
            </div>
            <CardContent>
              <div>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{
                    color: "white",
                    fontWeight: "500",
                    borderBottom: "#11326f dashed",
                    borderBottomWidth: "1px",
                    paddingBottom: "20px",
                  }}
                >
                  {item.title}
                </Typography>
                <span className="text-white">
                  Date : {moment(item.date).format("DD/MM/YYYY")}
                </span>
              </div>
            </CardContent>
            <CardActions>
              <p className="text-white">{item.location}</p>
            </CardActions>
          </Card>
        </div>
      </Link>
    </NoSSR>
  );
};

export default ItemCard;
