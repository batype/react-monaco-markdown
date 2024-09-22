# react-monaco-markdown

[![NPM version](https://img.shields.io/npm/v/react-monaco-markdown.svg?style=flat)](https://npmjs.org/package/react-monaco-markdown)
[![NPM downloads](http://img.shields.io/npm/dm/react-monaco-markdown.svg?style=flat)](https://npmjs.org/package/react-monaco-markdown)

react-monaco-markdown

## Usage

```sh
pnpm i react-monaco-markdown
```

## Options

```ts
import ReactMonacoMarkdown from 'react-monaco-markdown'

<ReactMonacoMarkdown
    value={'**Hello react-monaco-markdown!!!**'}
    onChange={pre => changeData(pre.text)}
/>
```

## Development

```bash
# install dependencies
$ pnpm install 

# develop library by docs demo
$ pnpm start

# build library source code
$ pnpm run build

# build library source code in watch mode
$ pnpm run build:watch

# build docs
$ pnpm run docs:build

# Locally preview the production build.
$ pnpm run docs:preview

# check your project for potential problems
$ pnpm run doctor
```

## LICENSE

MIT
