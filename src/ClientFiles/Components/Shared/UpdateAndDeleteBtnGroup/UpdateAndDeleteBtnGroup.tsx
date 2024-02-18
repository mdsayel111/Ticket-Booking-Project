import { useAppSelector } from "@/ClientFiles/Hooks/ReduxHook";
import useAxiosSecure from "@/ClientFiles/Hooks/useAxiosSecure";
import Link from "next/link";
import React, { MouseEventHandler } from "react";
import toast from "react-hot-toast";
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
  const { userInfo } = useAppSelector((state) => state.user);
  const axiosSecure = useAxiosSecure();
  const handleDelete: MouseEventHandler<HTMLDivElement> = async (e) => {
    const { data } = await axiosSecure.delete(
      `/api/v1/host_apis/category/${category}?id=${id}&email=${userInfo.email}`
    );
    toast.success(data.message);
  };
  return (
    <div className="absolute top-2 right-2 z-30 cursor-pointer">
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
