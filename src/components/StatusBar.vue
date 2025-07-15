<script setup lang="ts">
import Time from './Time.vue';
import ThemeToggle from './ThemeToggle.vue';
import GithubButtonVue from './GithubButton.vue';
import SettingsButton from './SettingsButton.vue';

const { value } = defineProps<{
    value: string;
}>();

defineEmits<{
    (e: 'open-setting'): void;
}>();
</script>

<template>
    <div class="absolute bottom-0 left-0 w-full max-h-7">
        <div
            class="flex items-center justify-start md:justify-between w-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-2 py-1 border-t border-slate-300 dark:border-slate-700 text-xs">
            <div
                class="hidden md:flex justify-start items-center *:not-[:last-child]:after:content-['|'] *:not-[:last-child]:after:px-1">
                <span>Chars: {{ value.length }}</span>
                <span>Words: {{ value.trim().split(/\s+/).filter(Boolean).length
                    }}</span>
                <span>Lines: {{ value.split('\n').length }}</span>
            </div>

            <div class="flex flex-1 md:justify-end justify-between items-center gap-3">
                <div class="flex items-center gap-2">
                    <SettingsButton @click="$emit('open-setting')" />
                    <ThemeToggle />
                    <GithubButtonVue />
                </div>
                <div class="flex items-center gap-2">
                    <span class="hidden md:flex">Time:</span>
                    <Time />
                </div>
            </div>
        </div>
    </div>
</template>
