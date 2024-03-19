import React from "react";

function DynamicInput({
  inputValue,
  isRequired,
  inputRef,
  change,
  ...restprops
}) {
  return (
    <input
      value={inputValue}
      onChange={change}
      {...restprops}
      ref={inputRef}
      required={isRequired}
      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-main focus:outline-none"
    />
  );
}

export default DynamicInput;
