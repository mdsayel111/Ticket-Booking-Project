import React, { ReactNode } from "react";

const Input = ({
  values,
  required,
}: {
  values: {
    title: string;
    type: string;
    name: string;
    icon?: ReactNode;
    placeholder?: string;
    className?: string;
  };
  required: boolean;
}) => {
  const { title, type, name, icon, placeholder, className } = values;
  return (
    <div className={className}>
      <label
        htmlFor="website-admin"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#B4B9C3]"
      >
        {title}
      </label>
      <div className="flex">
        {icon && (
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            {icon}
          </span>
        )}
        <input
          required={required}
          type={type}
          name={name}
          id="website-admin"
          className="rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-[#4C5884] dark:text-[#B4B9C3] dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
          style={{
            borderStartStartRadius: `${icon || "0.5rem"}`,
            borderEndStartRadius: `${icon || "0.5rem"}`,
          }}
        />
      </div>
    </div>
  );
};

export default Input;
