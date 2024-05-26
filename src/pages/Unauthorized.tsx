import React from "react";
import { useNavigate } from "react-router-dom";

function Unauthorized() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <div>
      Unauthorized
      <button onClick={goBack}>Go back</button>
    </div>
  );
}

export default Unauthorized;
