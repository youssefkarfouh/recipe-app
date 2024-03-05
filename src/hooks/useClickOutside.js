import { useEffect, useRef } from 'react'

const useClickOutside = (handler) => {
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            handler();
        }
    };

    useEffect(() => {

        document.addEventListener('click', handleClickOutside, true);
        
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [ref, handler]);

    return ref;
}

export default useClickOutside