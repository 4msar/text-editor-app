# Texty

A modern text editor built with Tauri, Vue 3, and TypeScript.

## Features

-   Cross-platform desktop application
-   Modern Vue 3 + TypeScript frontend
-   Native performance with Tauri
-   Dark/Light theme support
-   File system integration

## Development

This project uses Vue 3 and TypeScript in Vite with Tauri for the desktop application. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

-   [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).

## Building and Releasing

### Local Development

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Build desktop application
yarn tauri build
```

### Automated Builds and Releases

This project includes GitHub Actions workflows for automated building and releasing:

#### CI Workflow (`.github/workflows/ci.yml`)

-   Runs on pull requests and pushes to main/master
-   Tests builds on Linux, Windows, and macOS
-   Ensures code quality and build compatibility

#### Release Workflow (`.github/workflows/build-desktop.yml`)

-   Triggers on version tags (e.g., `v1.0.0`) or manual dispatch
-   Builds desktop applications for all platforms:
    -   **macOS**: `.app` bundle
    -   **Linux**: `.AppImage` file
    -   **Windows**: `.msi` installer
-   Creates draft releases with all platform builds

### Creating a Release

1. **Create a version tag:**

    ```bash
    git tag v1.0.0
    git push origin v1.0.0
    ```

2. **Or manually trigger the workflow:**

    - Go to Actions tab in GitHub
    - Select "Build Desktop Applications"
    - Click "Run workflow"

3. **Review and publish the draft release:**
    - Go to Releases tab in GitHub
    - Edit the draft release
    - Add release notes and publish

### Build Artifacts

The release workflow creates the following artifacts:

-   `texty-macos-x64`: macOS application bundle
-   `texty-linux-x64`: Linux AppImage
-   `texty-windows-x64`: Windows MSI installer

All artifacts are automatically attached to the draft release for easy distribution.
