import { createContext } from "react";

export type ThemeContextParamas = {
    theme: string,
    setTheme: (name: string)=> void;
    saveTheme?: (name: string) => void;
}


export const ThemeContext = createContext<ThemeContextParamas>({} as ThemeContextParamas)