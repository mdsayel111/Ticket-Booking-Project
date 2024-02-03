import React from "react";
import BackgroundImage from "../BackgroundImage/BackgroundImage";
import TextAnimation from "../TextAnimation/TextAnimation";
// { bannerImg }: { bannerImg: string }
const Banner = ({ bannerImg }: { bannerImg: string }) => {
  return (
    <BackgroundImage
      values={{
        background: `url("${bannerImg}")`,
        marginTop: "-68px",
      }}
    >
      <TextAnimation
        value={{
          staticText: "BOOK YOUR",
          sameText: "TICKETS FOR",
          dainamicText: ["MOVIE", "EVENT", "SPORT"],
          subTitle:
            "Safe, secure, reliable ticketing.Your ticket to live entertainment!",
        }}
      />
    </BackgroundImage>
  );
};

export default Banner;
