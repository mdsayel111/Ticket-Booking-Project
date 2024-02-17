import React from "react";
import DateFIlter from "./DateFilter/DateFIlter";

const FilterSection = ({
  values,
}: {
  values: { date: Date | string; setDate: Function };
}) => {
  const { date, setDate } = values;
  return (
    <div className="w-full">
      <DateFIlter values={{ date: date, setDate: setDate }} />
    </div>
  );
};

export default FilterSection;
