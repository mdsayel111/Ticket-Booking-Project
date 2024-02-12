"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { CiMenuBurger } from "react-icons/ci";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Image from "next/image";
import CommonButton from "../CommonButton/CommonButton";
import Logo from "../Logo/Logo";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/ClientFiles/Hooks/ReduxHook";
import { setUser } from "@/ClientFiles/Slices/UserSlices";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { IoIosArrowDropdown } from "react-icons/io";
import "./Navbar.css";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  opening?: () => Window;
}

const drawerWidth = 240;
const navItems = [
  { title: "Home", path: "/" },
  { title: "Movies", path: "/category/movies" },
  { title: "Events", path: "/category/events" },
  { title: "Sports", path: "/category/sports" },
];
const dashboardItems = [
  { title: "Add Movie", path: "/" },
  { title: "Movies", path: "/category/movies" },
  { title: "Events", path: "/category/events" },
  { title: "Sports", path: "/category/sports" },
];

const hostItems = [
  { title: "Add Movie", path: "/host/movies/add_movie" },
  { title: "Add Event", path: "/host/events/add_event" },
  { title: "Add Sports", path: "/host/sports/add_sport" },
];

const adminItems = [];

export default function Navbar(props: Props) {
  const { opening } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.user);
  const [isDashboardNav, setIsDashboardNav] = React.useState(false);

  console.log(userInfo);

  // handle logout function
  const handleLogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(setUser({}));
  };

  const handleDrawerToggle = (e: any) => {
    setMobileOpen((prevState) => !prevState);
    console.log(e.target);
  };

  const handleDashboardNavToggole = () => {
    setMobileOpen((prevState) => !prevState);
    setIsDashboardNav(true);
  };

  React.useEffect(() => {
    const navbar = document.getElementById("navbar") as HTMLElement;

    // Add a scroll event listener
    window.addEventListener("scroll", function () {
      // Check if the scroll position is at the top
      const isTop = window.scrollY === 0;

      // Update the background color based on the scroll position
      navbar.style.backgroundColor = isTop ? "transparent" : "var(--secondary)";
    });
  }, []);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      {!isDashboardNav && (
        <Typography variant="h6" sx={{ my: 2 }}>
          <Image src={"/images/logo.png"} alt="logo" height={50} width={50} />
        </Typography>
      )}
      <Divider />
      <List>
        {/* if isDashboardNav === true, means drower will be open for dashboard items so then show dashboard drawer else show regular navar drawer */}
        {isDashboardNav ? (
          userInfo.role === "admin" ? (
            adminItems.map((item) => (
              <ListItem key={item.title} disablePadding>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <Link href={item.path}>
                    <ListItemText primary={item.title} />
                  </Link>
                </ListItemButton>
              </ListItem>
            ))
          ) : userInfo.role === "host" ? (
            hostItems.map((item) => (
              <ListItem key={item.title} disablePadding>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <Link href={item.path}>
                    <ListItemText primary={item.title} />
                  </Link>
                </ListItemButton>
              </ListItem>
            ))
          ) : (
            ""
          )
        ) : (
          <>
            {navItems.map((item) => (
              <ListItem key={item.title} disablePadding>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <Link href={item.path}>
                    <ListItemText primary={item.title} />
                  </Link>
                </ListItemButton>
              </ListItem>
            ))}

            {/* show dashboard button for opening dasboard navbar items if user role is nor "user" */}
            {userInfo.email && userInfo.role !== "user" && (
              <ListItem key={"Dashboard"} disablePadding>
                <ListItemButton
                  onClick={(e) => {
                    console.log("dashboard");
                    e.stopPropagation();
                  }}
                  sx={{ textAlign: "center" }}
                >
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<IoIosArrowDropdown />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      Dashboard
                    </AccordionSummary>
                    <AccordionDetails>
                      {/* add admin or host Navbar Items */}
                      {userInfo.role === "admin"
                        ? adminItems.map((item) => (
                            <ListItem key={item.title} disablePadding>
                              <ListItemButton sx={{ textAlign: "center" }}>
                                <Link href={item.path}>
                                  <ListItemText primary={item.title} />
                                </Link>
                              </ListItemButton>
                            </ListItem>
                          ))
                        : hostItems.map((item) => (
                            <ListItem key={item.title} disablePadding>
                              <ListItemButton sx={{ textAlign: "center" }}>
                                <Link href={item.path}>
                                  <ListItemText primary={item.title} />
                                </Link>
                              </ListItemButton>
                            </ListItem>
                          ))}
                    </AccordionDetails>
                  </Accordion>
                </ListItemButton>
              </ListItem>
            )}
          </>
        )}
      </List>
    </Box>
  );

  const container =
    opening !== undefined ? () => opening().document.body : undefined;

  return (
    <Box sx={{ display: "flex", height: "64px" }}>
      <CssBaseline />
      <AppBar
        id="navbar"
        component="nav"
        sx={{ backgroundColor: "transparent" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <CiMenuBurger />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Logo />
          </Typography>
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
            }}
          >
            {navItems.map((item) => (
              <Link key={item.title} href={item.path}>
                <Button sx={{ color: "#fff" }}>{item.title}</Button>
              </Link>
            ))}

            {/* show dashboard button for opening dasboard navbar items if user role is nor "user" */}
            {userInfo.email && userInfo.role !== "user" && (
              <Button
                onClick={handleDashboardNavToggole}
                sx={{ color: "#fff" }}
              >
                {"Dashboard"}
              </Button>
            )}
            {/* show dashboard menu items if user role !== "user" */}
            {userInfo?.email ? (
              <CommonButton
                value={{
                  text: "Log Out",
                  onClick: handleLogOut,
                }}
              />
            ) : (
              <Link href={"/signup_or_signin"}>
                <CommonButton value={{ text: "join us" }} />
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          anchor={isDashboardNav ? "right" : "left"}
          sx={{
            // display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}
