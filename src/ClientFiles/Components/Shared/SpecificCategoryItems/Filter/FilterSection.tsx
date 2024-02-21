import React from "react";
import DateFIlter from "./DateFilter/DateFIlter";

const FilterSection = ({
  values,
  className,
}: {
  values: { date: Date | string; setDate: Function };
  className?: string;
}) => {
  const { date, setDate } = values;
  return (
    <div className={`lg:w-full ${className}`}>
      <DateFIlter values={{ date: date, setDate: setDate }} />
    </div>
  );
};

export default FilterSection;
