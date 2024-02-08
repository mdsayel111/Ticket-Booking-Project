import TextAnimation from "@/ClientFiles/Components/Shared/TextAnimation/TextAnimation";
import "./BackgroundImage.css";
import { ReactNode } from "react";

const BackgroundImage = ({
  children,
  values,
}: {
  children: ReactNode;
  values: { background: string; marginTop?: string; height?: string };
}) => {
  const { background, marginTop, height } = values;
  return (
    <div
      className="relative banner-image bg-cover flex justify-center items-center flex-col"
      style={{
        height: height || "80vh",
        background: background,
        backgroundSize: "cover",
        backgroundPosition: "center",
        marginTop: marginTop ? marginTop : "",
      }}
    >
      {children}
    </div>
  );
};

export default BackgroundImage;
