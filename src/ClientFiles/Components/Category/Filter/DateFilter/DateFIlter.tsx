"use client";
import React, { useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import "./DateFilter.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const DateFIlter = ({
  values,
}: {
  values: { date: Date | string; setDate: Function };
}) => {
  const { date, setDate } = values;
  const changeDate = (date: Value) => {
    setDate(date);
  };
  return (
    <div className="text-white flex items-center gap-4">
      <p>Search By Date : </p>
      <DatePicker
        format="d-M-yyyy"
        className="text-white"
        onChange={changeDate}
        value={date}
      />
    </div>
  );
};

export default DateFIlter;
