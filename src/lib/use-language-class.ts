import { computed } from "vue";
import { detectLanguage, getLanguageClass } from "./language-detection";

export const useLanguageClass = (text: string): string => {
    const language = computed(() => detectLanguage(text));
    const className = computed(() =>
        getLanguageClass(language.value ?? "plaintext")
    );

    return className.value;
};
