import React, { useEffect, useState } from 'react'
import fallBackImage from "../assets/images/fallbackImg.png";

function ImageFallback({ src, ...rest }) {

    const [imageSrc, setImageSrc] = useState(src);

    useEffect(() => {        
        setImageSrc(src);
      }, [src]);

    const handleImageError = () => {
        console.error("error falback image")
        setImageSrc(fallBackImage);
    };

    return (
        <>
            <img
                {...rest}
                src={imageSrc}
                onError={handleImageError}
            />
        </>
    )
}

export default ImageFallback