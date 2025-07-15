// Types for language names used in detection and styling
export type LanguageName =
    | "javascript"
    | "typescript"
    | "python"
    | "java"
    | "c"
    | "c++"
    | "c#"
    | "ruby"
    | "php"
    | "go"
    | "rust"
    | "swift"
    | "kotlin"
    | "dart"
    | "shell"
    | "html"
    | "css"
    | "scss"
    | "json"
    | "markdown"
    | "sql"
    | "plaintext"; // Default for unrecognized languages

// Tailwind CSS color mapping for each language (light + dark in one string)
export const languageColorClasses: Record<LanguageName, string> = {
    javascript: "text-yellow-600 dark:text-yellow-400",
    typescript: "text-blue-600 dark:text-blue-400",
    python: "text-blue-700 dark:text-yellow-300",
    java: "text-red-700 dark:text-red-400",
    c: "text-blue-800 dark:text-blue-300",
    "c++": "text-blue-800 dark:text-blue-300",
    "c#": "text-purple-700 dark:text-purple-400",
    ruby: "text-red-600 dark:text-red-400",
    php: "text-indigo-700 dark:text-indigo-300",
    go: "text-cyan-700 dark:text-cyan-400",
    rust: "text-orange-800 dark:text-orange-400",
    swift: "text-orange-600 dark:text-orange-400",
    kotlin: "text-purple-600 dark:text-purple-300",
    dart: "text-sky-700 dark:text-sky-400",
    shell: "text-green-700 dark:text-green-400",
    html: "text-orange-700 dark:text-orange-400",
    css: "text-blue-500 dark:text-blue-300",
    scss: "text-pink-700 dark:text-pink-400",
    json: "text-gray-700 dark:text-gray-300",
    markdown: "text-gray-600 dark:text-gray-400",
    sql: "text-indigo-600 dark:text-indigo-400",
    plaintext: "text-slate-900 dark:text-slate-200", // Default for unrecognized languages
};

// Language detection match
export const languages: { name: LanguageName; match: RegExp }[] = [
    {
        name: "typescript",
        match: /```(ts|typescript|tsx)/i,
    },
    {
        name: "python",
        match: /```(py|python)/i,
    },
    {
        name: "java",
        match: /```java/i,
    },
    {
        name: "c",
        match: /```c(?!\+|#)/i,
    },
    {
        name: "c++",
        match: /```(c\+\+|cpp)/i,
    },
    {
        name: "c#",
        match: /```(c#|csharp)/i,
    },
    {
        name: "ruby",
        match: /```(rb|ruby)/i,
    },
    {
        name: "php",
        match: /```php/i,
    },
    {
        name: "go",
        match: /```(go|golang)/i,
    },
    {
        name: "rust",
        match: /```(rs|rust)/i,
    },
    {
        name: "swift",
        match: /```swift/i,
    },
    {
        name: "javascript",
        match: /```(js|javascript|jsx)/i,
    },
    {
        name: "kotlin",
        match: /```(kt|kotlin)/i,
    },
    {
        name: "dart",
        match: /```dart/i,
    },
    {
        name: "html",
        match: /```html/i,
    },
    {
        name: "css",
        match: /```css/i,
    },
    {
        name: "scss",
        match: /```(scss|sass)/i,
    },
    {
        name: "json",
        match: /```json/i,
    },
    {
        name: "markdown",
        match: /```(md|markdown)/i,
    },
    {
        name: "sql",
        match: /```sql/i,
    },
    {
        name: "shell",
        match: /```(sh|shell|bash|zsh)/i,
    },
];

// Utility: detect language from code snippet
export function detectLanguage(code: string): LanguageName | undefined {
    return languages.find((lang) => lang.match.test(code))?.name;
}

// Utility: get Tailwind CSS classes for a detected language
export function getLanguageClass(language: LanguageName): string {
    return `${languageColorClasses[language] || languageColorClasses.plaintext
        } ${language}`;
}
