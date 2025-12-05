import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AppContextType {
    theme: string;
    setTheme: (theme: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

interface AppContextProviderProps {
    children: ReactNode;
}

export const AppContextProvider = (props: AppContextProviderProps) => {
    const [theme, setTheme] = useState<string>(() => {
        const initialTheme = localStorage.getItem("theme") || "light";
        return initialTheme;
    });

    useEffect(() => {
        const mode = localStorage.getItem("theme");
        if (mode) {
            setTheme(mode);
            document.documentElement.setAttribute('data-bs-theme', mode);
        }
    }, [])

    return (
        <AppContext.Provider value={{
            theme, setTheme
        }}>
            {props.children}
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

