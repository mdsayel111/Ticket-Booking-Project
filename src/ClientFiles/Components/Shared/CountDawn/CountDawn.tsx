"use client";
import CountUp from "react-countup";

const CountDawn = ({ values }: { values: { value: number, className?: string } }) => {
  const { value, className } = values;
  return <CountUp className={`text-white ${className}`} end={value} />;
};

export default CountDawn;
