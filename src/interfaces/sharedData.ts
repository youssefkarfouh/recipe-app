import { Dispatch, SetStateAction } from "react";

export interface I_SharedData {
    savedRecipes : any[],
    setSavedRecipes :Dispatch<SetStateAction<any>> ,
    isOpened: boolean,
    setIsOpened: Dispatch<SetStateAction<boolean>>;
}