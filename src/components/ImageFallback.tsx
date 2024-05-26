import React, { useEffect, useState } from "react";
import fallBackImage from "../assets/images/fallbackImg.png";

function ImageFallback({ src, ...rest }) {
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    !Boolean(src) && handleImageError();
  }, []);

  const handleImageError = () => {
    setImageSrc(fallBackImage);
  };

  return (
    <>
      <img {...rest} src={imageSrc} onError={handleImageError} />
    </>
  );
}

export default ImageFallback;
