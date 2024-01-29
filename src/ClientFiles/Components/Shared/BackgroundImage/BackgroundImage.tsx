import TextAnimation from "@/ClientFiles/Components/Shared/TextAnimation/TextAnimation";
import "./BackgroundImage.css";
import { ReactNode } from "react";

const BackgroundImage = ({
  children,
  values,
}: {
  children: ReactNode;
  values: { background: string; marginTop?: string };
}) => {
  const { background, marginTop } = values;
  return (
    <div
      className="relative banner-image bg-cover flex justify-center items-center flex-col"
      style={{
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
