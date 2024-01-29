import Link from "next/link";
import React from "react";

const CategoryViewAll = ({ values }: { values: { link: string } }) => {
  const { link } = values;
  return (
    <Link
      href={link}
      className="text-[var(--tertiary)] font-bold"
    >
      View All
    </Link>
  );
};

export default CategoryViewAll;
