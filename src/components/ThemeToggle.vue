<script setup lang="ts">
import { useDarkMode } from '../lib/use-dark-mode';

const { isDark, toggleTheme } = useDarkMode();

</script>

<template>
    <div class="flex items-center gap-2">
        <!-- Quick toggle button -->
        <button @click="toggleTheme"
            class="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors"
            :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
            <!-- Sun icon for light mode -->
            <svg v-if="!isDark" class="size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z">
                </path>
            </svg>
            <!-- Moon icon for dark mode -->
            <svg v-else class="size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
        </button>
    </div>
</template>
