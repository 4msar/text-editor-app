import { onMounted, onUnmounted } from "vue";

type Keys = "ctrl" | "meta" | "cmd" | "shift" | "alt";
type ShortcutKeyFormat = `${Keys}+${string}`;

/**
 * Composable for handling keyboard shortcuts in Vue.js applications.
 *
 * @param shortcut - A keyboard shortcut string or an array of strings representing the keys to listen for, e.g., "ctrl+s" or ["ctrl", "s"].
 * @param callback - A function to call when the shortcut is pressed. The function receives the KeyboardEvent as an argument.
 */
export const useKeyboardShortcut = (
    shortcut: ShortcutKeyFormat | ShortcutKeyFormat[],
    callback: (event: KeyboardEvent) => void
) => {
    const handleKeydown = (event: KeyboardEvent) => {
        const pressedKeys = [
            event.ctrlKey ? "ctrl" : "",
            event.ctrlKey ? "ctrl" : "",
            event.metaKey ? "meta" : "",
            event.metaKey ? "cmd" : "",
            event.shiftKey ? "shift" : "",
            event.altKey ? "alt" : "",
            event.key.toLowerCase(),
        ].filter(Boolean);

        const shortcutKeys = Array.isArray(shortcut)
            ? shortcut.map((s) =>
                  s.split("+").map((key) => key.trim().toLowerCase())
              )
            : [shortcut.split("+").map((key) => key.trim().toLowerCase())];

        const shortcutPressed = shortcutKeys.some((keys) =>
            keys.every((key) => pressedKeys.includes(key))
        );

        if (shortcutPressed) {
            event.preventDefault();
            callback(event);
        }
    };

    onMounted(() => {
        window.addEventListener("keydown", handleKeydown);
    });

    onUnmounted(() => {
        window.removeEventListener("keydown", handleKeydown);
    });
};
