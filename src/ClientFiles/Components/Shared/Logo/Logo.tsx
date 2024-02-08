import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"}>
      <div className="flex gap-2 items-center">
        <Image src={"/images/logo.png"} alt="logo" height={50} width={50} />
        <span className="text-2xl font-bold text-white">
          Ticket<span className="text-[var(--red)]">BD</span>
        </span>
      </div>
    </Link>
  );
};

export default Logo;
