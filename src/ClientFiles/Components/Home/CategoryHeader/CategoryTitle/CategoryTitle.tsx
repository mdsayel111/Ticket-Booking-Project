import React from "react";

const CategoryTitle = ({ values }: { values: { title: string } }) => {
  const { title } = values;
  return (
    <h1 className="uppercase relative w-fit text-white text-2xl font-bold ">
      {title}
      <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-[var(--tertiary)]"></span>
    </h1>
  );
};

export default CategoryTitle;
