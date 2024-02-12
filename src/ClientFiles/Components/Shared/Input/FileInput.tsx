import React from "react";

const FileInput = ({
  values,
  required,
  className,
}: {
  values: { multiple: boolean; title: string; name: string };
  required: boolean;
  className?: string;
}) => {
  const { multiple, title, name } = values;
  return (
    <div className={className}>
      <label
        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="file_input"
      >
        {title}
      </label>
      <input
        required={required}
        name={name}
        multiple={multiple}
        className="block mb-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="file_input"
        type="file"
      />
    </div>
  );
};

export default FileInput;
