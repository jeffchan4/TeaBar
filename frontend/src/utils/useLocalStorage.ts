import { useState, useEffect } from "react";

function getStorageValue(key: string, defaultValue: any) {
    const saved = localStorage.getItem(key);
    if (saved === null) {
        return defaultValue;
    }

    const initial = JSON.parse(saved);
    return initial
}

// export const useLocalStorage = (key: string, defaultValue: any) => {
export function useLocalStorage<S = undefined> (key: string, defaultValue: any){

    const [value, setValue] = useState<S>(() => {
        return getStorageValue(key, defaultValue);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as const
};
