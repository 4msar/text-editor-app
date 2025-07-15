<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useLanguageClass } from "../lib/use-language-class";
import { useStorage } from "@vueuse/core";
import { cn, inputShortcutHandler } from "../lib/utils";
import type { Settings } from "../type";
import Logo from "./Logo.vue";

const inputRef = ref<HTMLTextAreaElement | null>(null);

const value = defineModel<string>({
    default: "",
    type: String,
    required: true,
});

const classes = ref<string>(useLanguageClass(value.value));

watch(value, (newValue) => {
    classes.value = useLanguageClass(newValue);
});

onMounted(() => {
    if (inputRef.value) {
        inputRef.value.addEventListener(
            "keydown",
            inputShortcutHandler(inputRef)
        );
    }
});

// Clean up event listener on unmount
onUnmounted(() => {
    if (inputRef.value) {
        inputRef.value.removeEventListener(
            "keydown",
            inputShortcutHandler(inputRef)
        );
    }
});

const settings = useStorage<Settings>("settings", {
    fontSize: "16",
    ui: "auto",
});

const uiClass = computed(() => {
    if (settings.value.ui === "box") {
        return "w-full md:w-2/3 mx-auto shadow-md aspect-16/9 h-full md:h-2/3 border border-slate-300 dark:border-slate-700 rounded-md";
    }
    if (settings.value.ui === "fluid") {
        return "w-full h-full border-none";
    }

    return "w-full h-full border-none";
});

const placeholder =
    "Start writing...\n\nPress `cmd + o` to open file.\nPress `cmd + s` to save file.\nPress `cmd + shift + s` to save as.\nPress `cmd + ,` to open settings dialog.\n\nYou can also drag and drop files here.\n\nPress `cmd + b` for bold, `cmd + i` for italic, `cmd + u` for underline, and `cmd + k` for link.";
</script>

<template>
    <Logo
        class="text-black dark:text-white size-12 md:size-16 m-2 md:m-4"
        v-if="settings.ui === 'box'"
    />
    <textarea
        ref="inputRef"
        v-model="value"
        id="editor"
        autofocus
        class="editor bg-editor p-4 pb-7 text-base min-h-1/2 min-w-1/2 text-black dark:text-white outline-none resize-none font-mono placeholder:text-slate-400 dark:placeholder:text-slate-600"
        :class="cn(classes, uiClass)"
        :placeholder="placeholder"
        :style="{ fontSize: `${settings.fontSize}px` }"
    />
</template>
