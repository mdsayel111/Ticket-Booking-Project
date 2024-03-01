"use client";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

export default function BookingCard({ booking }: { booking: any }) {
  const theme = useTheme();
  const { bookingsItem } = booking;

  return (
    <Card
      sx={{
        display: "flex",
        width: "100%",
        backgroundColor: "var(--secondary)",
      }}
    >
      <div className="flex w-full flex-col lg:flex-row">
        <CardMedia
          className="w-full aspect-[1/1.5] lg:w-[200px] lg:h-[162px]"
          component="img"
          sx={{ width: 151 }}
          image={bookingsItem.img}
          alt="Live from space album cover"
        />
        <CardContent
          className="h-fit"
          sx={{
            color: "white",
            flex: "1 0 auto",
            flexDirection: { xs: "column", lg: "row" },
          }}
        >
          <Typography
            component="div"
            variant="h5"
            sx={{
              marginBottom: "10px",
              textAlign: "center",
              color: "var(--red)",
            }}
          >
            {bookingsItem.title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <div className="mx-auto">
              <h3>User Name: {booking.userName}</h3>
              <h3>User Email: {booking.userEmail}</h3>
              <h3>
                Price:{" "}
                <span className="text-[var(--tertiary)]">
                  $ {bookingsItem.price}
                </span>
              </h3>
            </div>
          </Box>
        </CardContent>
      </div>
    </Card>
  );
}
