import {
    Menu,
    PredefinedMenuItem,
    MenuItem,
    Submenu,
} from "@tauri-apps/api/menu";

export async function createMenu() {
    // File Menu Items
    const newFile = await MenuItem.new({
        text: "New",
        accelerator: "CmdOrCtrl+N",
        id: "new_file",
        action: () => {
            window.dispatchEvent(
                new CustomEvent("menu-action", { detail: "new_file" })
            );
        },
    });

    const openFile = await MenuItem.new({
        text: "Open...",
        accelerator: "CmdOrCtrl+O",
        id: "open_file",
        action: () => {
            window.dispatchEvent(
                new CustomEvent("menu-action", { detail: "open_file" })
            );
        },
    });

    const saveFile = await MenuItem.new({
        text: "Save",
        accelerator: "CmdOrCtrl+S",
        id: "save_file",
        action: () => {
            window.dispatchEvent(
                new CustomEvent("menu-action", { detail: "save_file" })
            );
        },
    });

    const saveAsFile = await MenuItem.new({
        text: "Save As...",
        accelerator: "CmdOrCtrl+Shift+S",
        id: "save_as_file",
        action: () => {
            window.dispatchEvent(
                new CustomEvent("menu-action", { detail: "save_as_file" })
            );
        },
    });

    // Edit Menu Items
    const undo = await PredefinedMenuItem.new({
        text: "Undo",
        item: "Undo",
    });

    const redo = await PredefinedMenuItem.new({
        text: "Redo",
        item: "Redo",
    });

    const cut = await PredefinedMenuItem.new({
        text: "Cut",
        item: "Cut",
    });

    const copy = await PredefinedMenuItem.new({
        text: "Copy",
        item: "Copy",
    });

    const paste = await PredefinedMenuItem.new({
        text: "Paste",
        item: "Paste",
    });

    const selectAll = await PredefinedMenuItem.new({
        text: "Select All",
        item: "SelectAll",
    });

    // View Menu Items
    const toggleSettings = await MenuItem.new({
        text: "Settings...",
        accelerator: "CmdOrCtrl+,",
        id: "toggle_settings",
        action: () => {
            window.dispatchEvent(
                new CustomEvent("menu-action", { detail: "toggle_settings" })
            );
        },
    });

    const toggleFullscreen = await MenuItem.new({
        text: "Toggle Fullscreen",
        accelerator: "F11",
        id: "toggle_fullscreen",
        action: () => {
            window.dispatchEvent(
                new CustomEvent("menu-action", { detail: "toggle_fullscreen" })
            );
        },
    });

    // Separators
    const separator1 = await PredefinedMenuItem.new({
        text: "",
        item: "Separator",
    });

    const separator2 = await PredefinedMenuItem.new({
        text: "",
        item: "Separator",
    });

    const separator3 = await PredefinedMenuItem.new({
        text: "",
        item: "Separator",
    });

    // Create submenus
    const fileMenu = await Submenu.new({
        text: "File",
        items: [
            newFile,
            separator1,
            openFile,
            separator2,
            saveFile,
            saveAsFile,
        ],
    });

    const editMenu = await Submenu.new({
        text: "Edit",
        items: [undo, redo, separator3, cut, copy, paste, selectAll],
    });

    const viewMenu = await Submenu.new({
        text: "View",
        items: [toggleSettings, toggleFullscreen],
    });

    return await Menu.new({
        items: [fileMenu, editMenu, viewMenu],
    });
}
