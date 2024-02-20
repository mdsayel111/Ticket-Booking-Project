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
    <Card sx={{ display: "flex", width: "100%",  }}>
      <Box sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={bookingsItem.img}
          alt="Live from space album cover"
        />
        <CardContent sx={{ flex: "1 0 auto", flexDirection: "column" }}>
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
            <div>
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
      </Box>
    </Card>
  );
}
