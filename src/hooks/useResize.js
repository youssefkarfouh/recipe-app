import React, { useEffect, useState } from 'react'

function useResize() {

    const [windowSize, setWindowSize] = useState(undefined)


    useEffect(() => {

        const resize = () => {
            console.log("window.innerWidth" , window.innerWidth)
            setWindowSize(window.innerWidth)
        }

        resize();

        window.addEventListener("resize", resize);

        return () => window.removeEventListener("resize", resize)
    }, [])

    return windowSize
}

export default useResize