import { ref, onMounted, onUnmounted } from "vue";

export type Theme = "dark" | "light" | "system";

/**
 * Composable for handling dark mode detection and switching
 */
export function useDarkMode() {
    const isDark = ref(false);

    // Check system preference
    const checkSystemPreference = () => {
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    };

    // Check stored preference
    const getStoredPreference = (): boolean | null => {
        const stored = localStorage.getItem("theme-preference");
        if (stored === "dark") return true;
        if (stored === "light") return false;
        return null;
    };

    // Store preference
    const setStoredPreference = (theme: Theme) => {
        localStorage.setItem("theme-preference", theme);
    };

    // Apply theme to document
    const applyTheme = (dark: boolean) => {
        if (dark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        isDark.value = dark;
    };

    // Initialize theme
    const initializeTheme = () => {
        const stored = getStoredPreference();
        if (stored !== null) {
            applyTheme(stored);
        } else {
            applyTheme(checkSystemPreference());
        }
    };

    // Toggle theme
    const toggleTheme = () => {
        const newTheme = !isDark.value;
        applyTheme(newTheme);
        setStoredPreference(newTheme ? "dark" : "light");
    };

    // Set theme explicitly
    const setTheme = (theme: Theme) => {
        if (theme === "system") {
            const systemDark = checkSystemPreference();
            applyTheme(systemDark);
            setStoredPreference("system");
        } else {
            applyTheme(theme === "dark");
            setStoredPreference(theme);
        }
    };

    // Media query listener
    let mediaQuery: MediaQueryList;
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        const stored = getStoredPreference();
        // Only apply system theme if no explicit preference is stored or system is preferred
        if (
            stored === null ||
            localStorage.getItem("theme-preference") === "system"
        ) {
            applyTheme(e.matches);
        }
    };

    onMounted(() => {
        initializeTheme();

        // Listen for system theme changes
        mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        mediaQuery.addEventListener("change", handleSystemThemeChange);
    });

    onUnmounted(() => {
        if (mediaQuery) {
            mediaQuery.removeEventListener("change", handleSystemThemeChange);
        }
    });

    return {
        isDark,
        theme: localStorage.getItem("theme-preference") ?? "system",
        toggleTheme,
        setTheme,
        initializeTheme,
    };
}
