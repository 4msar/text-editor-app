<script setup lang="ts">
import { useDarkMode, type Theme } from '../lib/use-dark-mode';
import { useStorage } from '@vueuse/core';

defineProps<{
    open: boolean;
}>();

defineEmits<{
    (e: 'close'): void;
}>();

const { theme, setTheme } = useDarkMode();

import type { Settings } from '../type';

const settings = useStorage<Settings>("settings", {
    fontSize: "16",
    ui: "auto"
});


const handleThemeChange = (event: Event) => {
    const selectElement = event.target as HTMLSelectElement;
    const selectedTheme = selectElement.value as Theme;
    setTheme(selectedTheme);
};

</script>
<template>
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center dark:bg-slate-900/50 bg-slate-200/50"
        @click.self="$emit('close')" style="backdrop-filter: blur(2px);">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md space-y-6">
            <h2 class="text-xl text-black dark:text-white font-semibold mb-4">Settings</h2>
            <div class="text-gray-600 dark:text-gray-400 mb-4 space-y-4 ">
                <fieldset>
                    <legend class="text-lg font-medium">Theme</legend>
                    <p class="text-sm">Choose your preferred theme:</p>
                    <select @change="handleThemeChange" v-model="theme"
                        class="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-black dark:text-white">
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="system">System Default</option>
                    </select>
                </fieldset>
                <fieldset>
                    <legend class="text-lg font-medium">UI</legend>
                    <p class="text-sm">Choose your preferred UI:</p>
                    <select v-model="settings.ui"
                        class="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-black dark:text-white">
                        <option value="auto">Auto</option>
                        <option value="box">Box</option>
                        <option value="fluid">Full Width</option>
                    </select>
                </fieldset>
                <fieldset>
                    <legend class="text-lg font-medium">Font Size</legend>
                    <p class="text-sm">Choose your preferred font size:</p>
                    <div class="flex items-center gap-2">
                        <input type="range" min="12" max="32" step="1" v-model="settings.fontSize"
                            class="flex-1 w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer" />
                        <span class="text-sm text-gray-600 dark:text-gray-400">{{ settings.fontSize }}px</span>
                    </div>
                </fieldset>
            </div>
            <button @click="$emit('close')"
                class="mt-4 px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                Close
            </button>
        </div>
    </div>
</template>