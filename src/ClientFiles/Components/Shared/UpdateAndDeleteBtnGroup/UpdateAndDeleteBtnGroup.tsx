import useAxiosSecure from "@/ClientFiles/Hooks/useAxiosSecure";
import Link from "next/link";
import React, { MouseEventHandler } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const UpdateAndDeleteBtnGroup = ({
  path,
  category,
  id,
}: {
  path: string;
  category: string;
  id: string;
}) => {
  const axiosSecure = useAxiosSecure();
  const handleDelete: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    // const res = axiosSecure.delete(
    //   `/api/v1/host_apis/category/${category}/id=${id}`
    // );
    console.log("res");
  };
  return (
    <div className="absolute top-2 right-2 z-30">
      <Link href={path}>
        <div className="p-4 rounded-xl h-fit hover:bg-[var(--tertiary)]">
          <FaEdit className="text-white text-3xl " />
        </div>
      </Link>
      <div
        onClick={handleDelete}
        className="p-4 rounded-xl h-fit hover:bg-[var(--tertiary)]"
      >
        <MdDelete className="text-white text-3xl " />
      </div>
    </div>
  );
};

export default UpdateAndDeleteBtnGroup;
