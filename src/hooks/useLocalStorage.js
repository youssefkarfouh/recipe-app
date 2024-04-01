import { useState } from 'react';

// Custom hook to handle state with localStorage persistence
function useLocalStorage(key, initialValue) {

    const getStoredValue = () => localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : initialValue;

    const [value, setValue] = useState(getStoredValue);

    function updateValue(newValue) {
        localStorage.setItem(key, JSON.stringify(newValue))
        setValue(newValue)
    }

    return [value, updateValue]

}

export default useLocalStorage;
