"use client";

import { useTheme } from "next-themes";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 mb-1 rounded-full text-foreground"
        >
            {theme === "dark" ? (
                <IconSun className="w-5 h-5" />
            ) : (
                <IconMoon className="w-5 h-5" />
            )}
        </button>
    );
}
