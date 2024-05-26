import React, { useEffect, useState } from 'react'
import useLocalStorage from './useLocalStorage';

function useModeToglle() {

  const [currentTheme, setStoredValue] = useLocalStorage("mode", "light")

  const previousTheme = currentTheme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(previousTheme)
    root.classList.add(currentTheme)
  }, [currentTheme])


  return [currentTheme, setStoredValue]
}

export default useModeToglle