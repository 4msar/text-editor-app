import type { Ref } from "vue";

export const cn = (...classes: (string | undefined)[]) =>
    classes.filter(Boolean).join(" ");

export const formatDate = (date: Date): string => {
    // expected format: "Wed, 03 Jul, 12:00 AM"
    const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    };
    return date.toLocaleDateString("en-US", options);
};

export const inputShortcutHandler =
    (inputRef: Ref<HTMLTextAreaElement | null>) => (event: KeyboardEvent) => {
        if (!inputRef.value) return;

        // Tab key for indentation
        if (event.key === "Tab") {
            event.preventDefault();
            const start = inputRef.value?.selectionStart || 0;
            const end = inputRef.value?.selectionEnd || 0;
            const value = inputRef.value?.value || "";
            inputRef.value!.value =
                value.substring(0, start) + "\t" + value.substring(end);
            inputRef.value!.selectionStart = inputRef.value!.selectionEnd =
                start + 1;
        }
        // Ctrl + B for bold
        if ((event.metaKey || event.ctrlKey) && event.key === "b") {
            event.preventDefault();
            const start = inputRef.value?.selectionStart || 0;
            const end = inputRef.value?.selectionEnd || 0;
            const value = inputRef.value?.value || "";
            inputRef.value!.value =
                value.substring(0, start) + "**" + value.substring(end);
            inputRef.value!.selectionStart = inputRef.value!.selectionEnd =
                start + 2;
        }
        // Ctrl + I for italic
        if ((event.metaKey || event.ctrlKey) && event.key === "i") {
            event.preventDefault();
            const start = inputRef.value?.selectionStart || 0;
            const end = inputRef.value?.selectionEnd || 0;
            const value = inputRef.value?.value || "";
            inputRef.value!.value =
                value.substring(0, start) + "*" + value.substring(end);
            inputRef.value!.selectionStart = inputRef.value!.selectionEnd =
                start + 1;
        }
        // Ctrl + K for link
        if ((event.metaKey || event.ctrlKey) && event.key === "k") {
            event.preventDefault();
            const start = inputRef.value?.selectionStart || 0;
            const end = inputRef.value?.selectionEnd || 0;
            const value = inputRef.value?.value || "";
            inputRef.value!.value =
                value.substring(0, start) +
                "[Text](http://)" +
                value.substring(end);
            inputRef.value!.selectionStart = inputRef.value!.selectionEnd =
                start + 14; // Adjust for "Link Text" length
        }
        // Ctrl + U for underline
        if ((event.metaKey || event.ctrlKey) && event.key === "u") {
            event.preventDefault();
            const start = inputRef.value?.selectionStart || 0;
            const end = inputRef.value?.selectionEnd || 0;
            const value = inputRef.value?.value || "";
            inputRef.value!.value =
                value.substring(0, start) + "__" + value.substring(end);
            inputRef.value!.selectionStart = inputRef.value!.selectionEnd =
                start + 2;
        }
    };
