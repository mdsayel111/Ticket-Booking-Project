"use client";
import { event_And_Sports, movie } from "@/ClientFiles/Types/CommonTypes";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./ItemCard.css";
import Link from "next/link";
import NoSSR from "@/ClientFiles/Wraper/NoSSR";

const ItemCard = ({
  values,
}: {
  values: { item: movie | event_And_Sports; path: string };
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
            }}
          >
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
