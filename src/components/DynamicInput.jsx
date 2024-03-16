import React, { useEffect } from "react";

function DynamicInput({
  inputValue,
  setValue,
  isRequired,
  inputRef,
  ...restprops
}) {



  return (
    <input
      value={inputValue}
      onChange={(e)=>setValue(e.target.value)}
      {...restprops}
      ref={inputRef}
      required={isRequired}
      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-main focus:outline-none"
    />
  );
}

export default DynamicInput;
