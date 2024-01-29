import React, { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return <div className="w-fit my-16 mx-auto">{children}</div>;
};

export default Container;
