import React from "react";

const TextArea = ({
  values,
  required,
}: {
  values: { title: string; name: string };
  required: boolean;
}) => {
  const { name, title } = values;
  return (
    <div className="w-full">
      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {title}
      </label>
      <textarea
        required={required}
        name={name}
        rows={4}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Write your thoughts here..."
      ></textarea>
    </div>
  );
};

export default TextArea;
