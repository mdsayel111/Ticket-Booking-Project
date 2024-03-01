import Loader from "@/ClientFiles/Components/Shared/Loader/Loader";
import NoSSR from "@/ClientFiles/Components/Wraper/NoSSR";
import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="text-white">
      <NoSSR>
        <Loader />
      </NoSSR>
    </div>
  );
};

export default Loading;
