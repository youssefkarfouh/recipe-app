import React from "react";

function DynamicInput({value ,  ...restprops }) {
  return (
    <input
    value={value}
      {...restprops}
    />
  );
}

export default DynamicInput;
