<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import StatusBar from "./components/StatusBar.vue";
import Editor from "./components/Editor.vue";
import { useKeyboardShortcut } from "./lib/use-keyboard-shortcut";
import SettingDialog from "./components/SettingDialog.vue";
import { useStorage } from "@vueuse/core";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { save } from "@tauri-apps/plugin-dialog";
import { writeTextFile } from "@tauri-apps/plugin-fs";

const inputRef = ref<HTMLTextAreaElement | null>(null);
const settingDialogOpen = ref(false);
const value = useStorage("text-editor-content", "");
const currentFilePath = ref<string | null>(null);

// add event listener `cmd + o` or `ctrl + o` to open file
useKeyboardShortcut(["cmd+o", "ctrl+o"], () => {
    inputRef.value?.click();
});

// add event listener `cmd + ,` or `ctrl + ,` to open settings dialog
useKeyboardShortcut(["cmd+,", "ctrl+,"], () => {
    settingDialogOpen.value = true;
});

// add event listener `cmd + s` or `ctrl + s` to save file
useKeyboardShortcut(["cmd+s", "ctrl+s"], () => {
    handleSave();
});

// add event listener `cmd + shift + s` or `ctrl + shift + s` to save as file
useKeyboardShortcut(["cmd+shift+s", "ctrl+shift+s"], () => {
    handleSaveAs();
});

// add drag and drop event listener to the main element
const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
        const file = event.dataTransfer.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            value.value = e.target?.result as string;
            currentFilePath.value = null; // Reset current file path when loading new content
        };
        reader.readAsText(file);
    }
};

const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
};
const handleDragLeave = (event: DragEvent) => {
    event.preventDefault();
};
// Add drag and drop event listeners to the main element
document.addEventListener("dragover", handleDragOver);
document.addEventListener("dragleave", handleDragLeave);
document.addEventListener("drop", handleDrop);

// Handle file open event
const handleFileOpen = (event: Event) => {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
        try {
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                value.value = e.target?.result as string;
                currentFilePath.value = null; // Reset current file path when loading new content
            };
            reader.readAsText(file);
        } catch (error) {
            alert("Error reading file: " + error);
        }
    }
};

// Supported file type for opening files, all text files
const supportedFileType =
    ".txt,.md,.json,.js,.ts,.html,.css,.vue,.xml,.yaml,.yml,.csv,.log,.py,.java,.cpp,.c,.h,.php,.rb,.go,.rs,.swift,.kt,.scala,.sh,.bat,.ps1,.sql,.r,.m,.pl,.lua,.dart,.jsx,.tsx,.scss,.sass,.less,.styl,.ini,.cfg,.conf,.env,.gitignore,.dockerfile,.makefile,.cmake,.toml,.lock,.properties,.gradle,.maven,.ant,.sbt,.clj,.cljs,.edn,.elm,.ex,.exs,.erl,.hrl,.fs,.fsx,.fsi,.ml,.mli,.hs,.lhs,.nim,.pas,.pp,.dpr,.asm,.s,.f,.f90,.f95,.f03,.f08,.for,.ftn,.cob,.cbl,.ada,.adb,.ads,.tcl,.vb,.vbs,.wsf,.wsh,.au3,.ahk,.nsi,.nsh,.iss,.tex,.bib,.cls,.sty,.dtx,.ins,.lof,.lot,.toc,.aux,.idx,.ind,.ilg,.glo,.gls,.fdb_latexmk,.fls,.synctex.gz,.bbl,.blg,.run.xml,.bcf,.xdv";

// Handle save functionality
const handleSave = async () => {
    try {
        if (currentFilePath.value) {
            // Save to existing file
            await writeTextFile(currentFilePath.value, value.value);
        } else {
            // No current file, use save as
            await handleSaveAs();
        }
    } catch (error) {
        console.error("Error saving file:", error);
        alert("Error saving file: " + error);
    }
};

// Handle save as functionality
const handleSaveAs = async () => {
    try {
        const filePath = await save({
            title: "Save File",
            filters: [
                {
                    name: "Text Files",
                    extensions: [
                        "txt",
                        "md",
                        "json",
                        "js",
                        "ts",
                        "html",
                        "css",
                        "vue",
                        "xml",
                        "yaml",
                        "yml",
                        "csv",
                        "log",
                        "py",
                        "java",
                        "cpp",
                        "c",
                        "h",
                        "php",
                        "rb",
                        "go",
                        "rs",
                        "swift",
                        "kt",
                        "scala",
                        "sh",
                        "bat",
                        "ps1",
                        "sql",
                        "r",
                        "m",
                        "pl",
                        "lua",
                        "dart",
                        "jsx",
                        "tsx",
                        "scss",
                        "sass",
                        "less",
                        "styl",
                        "ini",
                        "cfg",
                        "conf",
                        "env",
                        "gitignore",
                        "dockerfile",
                        "makefile",
                        "cmake",
                        "toml",
                        "lock",
                        "properties",
                        "gradle",
                        "maven",
                        "ant",
                        "sbt",
                        "clj",
                        "cljs",
                        "edn",
                        "elm",
                        "ex",
                        "exs",
                        "erl",
                        "hrl",
                        "fs",
                        "fsx",
                        "fsi",
                        "ml",
                        "mli",
                        "hs",
                        "lhs",
                        "nim",
                        "pas",
                        "pp",
                        "dpr",
                        "asm",
                        "s",
                        "f",
                        "f90",
                        "f95",
                        "f03",
                        "f08",
                        "for",
                        "ftn",
                        "cob",
                        "cbl",
                        "ada",
                        "adb",
                        "ads",
                        "tcl",
                        "vb",
                        "vbs",
                        "wsf",
                        "wsh",
                        "au3",
                        "ahk",
                        "nsi",
                        "nsh",
                        "iss",
                        "tex",
                        "bib",
                        "cls",
                        "sty",
                        "dtx",
                        "ins",
                        "lof",
                        "lot",
                        "toc",
                        "aux",
                        "idx",
                        "ind",
                        "ilg",
                        "glo",
                        "gls",
                        "fdb_latexmk",
                        "fls",
                        "synctex.gz",
                        "bbl",
                        "blg",
                        "run.xml",
                        "bcf",
                        "xdv",
                    ],
                },
                {
                    name: "All Files",
                    extensions: ["*"],
                },
            ],
        });

        if (filePath) {
            await writeTextFile(filePath, value.value);
            currentFilePath.value = filePath;
        }
    } catch (error) {
        console.error("Error saving file as:", error);
        alert("Error saving file: " + error);
    }
};

// Handle menu actions
const handleMenuAction = (event: CustomEvent) => {
    const menuId = event.detail;
    console.log("Handling menu action:", menuId);

    switch (menuId) {
        case "new_file":
            value.value = "";
            currentFilePath.value = null;
            break;
        case "open_file":
            inputRef.value?.click();
            break;
        case "save_file":
            handleSave();
            break;
        case "save_as_file":
            handleSaveAs();
            break;
        case "toggle_settings":
            settingDialogOpen.value = true;
            break;
        case "toggle_fullscreen":
            getCurrentWindow()
                .isFullscreen()
                .then((isFullscreen) => {
                    getCurrentWindow().setFullscreen(!isFullscreen);
                });
            break;
    }
};

// Set up menu event listeners
onMounted(() => {
    window.addEventListener("menu-action", handleMenuAction as EventListener);
});

onUnmounted(() => {
    window.removeEventListener(
        "menu-action",
        handleMenuAction as EventListener
    );
});
</script>

<template>
    <main
        class="relative h-svh md:h-screen w-screen flex flex-col items-center justify-center"
    >
        <Editor v-model="value" />
        <input
            ref="inputRef"
            type="file"
            id="fileInput"
            class="hidden"
            :accept="supportedFileType"
            @change="handleFileOpen"
        />
        <StatusBar :value="value" @open-setting="settingDialogOpen = true" />
        <SettingDialog
            :open="settingDialogOpen"
            @close="settingDialogOpen = false"
        />
    </main>
</template>
