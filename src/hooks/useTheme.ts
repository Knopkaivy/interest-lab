import { useState, useEffect } from "react";

type Theme = 'dark' | 'light';

const STORAGE_THEME = 'interest-lab-theme' as const;

export function useTheme(){
    const [theme, setTheme] = useState<Theme>((): Theme =>{
        return localStorage.getItem(STORAGE_THEME) === 'light' ? 'light' : 'dark'});

    useEffect(()=>{
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_THEME, theme)

    }, [theme]);

    const toggleTheme = () =>{
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    }

    return {theme, toggleTheme};
}