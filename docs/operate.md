# react-monaco-markdown

[![NPM version](https://img.shields.io/npm/v/react-monaco-markdown.svg?style=flat)](https://npmjs.org/package/react-monaco-markdown)
[![NPM downloads](http://img.shields.io/npm/dm/react-monaco-markdown.svg?style=flat)](https://npmjs.org/package/react-monaco-markdown)

## 安装

### npm

```sh
npm i react-monaco-markdown
```

### pnpm

```sh
pnpm i react-monaco-markdown
```

### yarn

```sh
yarn add react-monaco-markdown
```
## 使用

```ts
import ReactMonacoMarkdown from 'react-monaco-markdown'

<ReactMonacoMarkdown
    value={'**Hello react-monaco-markdown!!!**'}
    onChange={pre => changeData(pre.text)}
/>
```

## Options

| 参数 | 说明 | 类型 | 默认值 | 是否必填 | 版本 |
| --- | --- | --- | --- | --- | --- |
| className | 类 | string | - | false | >= 1.0.6 |
| style | style样式 | React.CSSProperties | - | false | >= 1.0.6 |
| value | 属性值 | string | - | false |  |
| onChange | 修改数据方法 | (pre: ReturnValue) => void | - | false |  |
| renderHtml | 渲染html 方法 | (pre: ReturnValue) => React.ReactNode |- | false |  |
| config | 额外配置 | [EditorConfig](#EditorConfig) |- | false | >= 1.0.6 |
| width | 宽度 | number/string | 100% | false | >= 1.0.7 |
| height | 高度 | number/string | 100% | false | >= 1.0.7 |
| options | monaco-editor 的 options 配置 | [editor.IStandaloneEditorConstructionOptions](https://microsoft.github.io/monaco-editor/docs.html#interfaces/editor.IStandaloneEditorConstructionOptions.html) | - | false | >= 1.0.7 |

### EditorConfig

| 参数 | 说明 | 类型 | 默认值 | 是否必填 | 版本 |
| --- | --- | --- | --- | --- | --- |
| theme | 主题 | 'light' / 'dark' | 'light' | false | >= 1.0.7 |
| isReadOnly | 是否只读 | Boolean | false | false | >= 1.0.7 |
| view | 切换展示视图 | [View](#View) | - | false | >= 1.0.7 |
| htmlClass | 展示区域class | string | - | false | >= 1.0.7 |
| markdownClass | 编写区域class | string | - | false | >= 1.0.7 |
| table | 表格配置 | [Table](#Table) | - | false | >= 1.0.7 |
| imageUrl | 预设 图片 URL | string | - | false | >= 1.0.7 |
| imageAccept | 图片accept | string | - | false | >= 1.0.7 |
| linkUrl | 预设 link Url | string | - | false | >= 1.0.7 |
| onCustomImageUpload | 自定义图片上传 | (event: any) => Promise<{ url: string; text?: string }> | - | false | >= 1.0.7 |
| onImageUpload | 本地图片上传 | [UploadFunc](#UploadFunc) | - | false | >= 1.0.7 |

### Table

```ts
export interface Table {
  maxRow: number;
  maxCol: number;
}
```

### View

```ts
export interface View {
  menu?: boolean;
  both?: boolean;
  md?: boolean;
  html?: boolean;
}
```

### UploadFunc

```ts
export type UploadFunc =
  | ((file: File) => Promise<string>)
  | ((file: File, callback: (url: string) => void) => void);
```

## LICENSE

MIT
