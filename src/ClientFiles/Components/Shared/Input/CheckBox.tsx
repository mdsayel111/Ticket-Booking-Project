import React, { useState } from "react";

const CheckBox = ({
  values,
}: {
  values: { title: string; name: string; cheked?: boolean };
}) => {
  const [value, setValue] = useState(false);
  const { title, name, cheked } = values;
  return (
    <div className="flex items-center ps-3">
      <input
        defaultChecked={cheked}
        name={name}
        id="vue-checkbox"
        type="checkbox"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
      />
      <label
        htmlFor="vue-checkbox"
        className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {title}
      </label>
    </div>
  );
};

export default CheckBox;
