import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type ThemeContextType = "light" | "dark";

interface IAppContext {
    theme: ThemeContextType;
    setTheme: (v: ThemeContextType) => void;
}

const AppContext = createContext<IAppContext | null>(null);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<ThemeContextType>(() => {
        const initialTheme = localStorage.getItem("theme") as ThemeContextType || "light";
        return initialTheme;
    });

    useEffect(() => {
        const mode = localStorage.getItem("theme") as ThemeContextType;
        if (mode) {
            setTheme(mode);
            document.documentElement.setAttribute('data-bs-theme', mode);
        }
    }, [])

    return (
        <AppContext.Provider value={{
            theme, setTheme
        }}>
            {children}
        </AppContext.Provider>
    );
}

export const useCurrentApp = (): AppContextType => {
    const currentAppContext = useContext(AppContext);

    if (!currentAppContext) {
        throw new Error(
            "useCurrentApp has to be used within <AppContext.Provider>"
        );
    }

    return currentAppContext;
};



