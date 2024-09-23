import MonacoEditor, { loader, useMonaco } from '@monaco-editor/react';
import { isEqual } from 'lodash';
import * as monaco from 'monaco-editor';
import React, { useEffect } from 'react';
import { MonacoMarkdownEditorConText } from './context';

type Props = {
  value?: string | undefined;
  changeValue?: (val: string | undefined) => void;
  width?: number | string;
  height?: number | string;
  isReadOnly?: boolean;
  language?: string;
  theme?: string;
  options?: monaco.editor.IStandaloneEditorConstructionOptions | undefined;
};

function Editor({ width, height, isReadOnly, theme, options }: Props) {
  const monacoDom = useMonaco();
  const { markdown, changeMarkdown, handleEditorDidMount, editorConfig } =
    MonacoMarkdownEditorConText.useContainer();

  loader.config({
    monaco: monaco,
  });

  useEffect(() => {
    if (monacoDom) {
      monacoDom.editor.setTheme(theme || 'vs-light');
    }
  }, [monacoDom, theme]);

  return (
    <MonacoEditor
      className={editorConfig?.markdownClass}
      language={'markdown'}
      width={width || '100%'}
      value={markdown}
      height={height || '100%'}
      defaultValue='const aaa="bbbbxxx"'
      onChange={(value: string | undefined) => {
        if (changeMarkdown && !isEqual(markdown, value))
          changeMarkdown?.(value);
      }}
      onMount={handleEditorDidMount}
      options={{
        theme: theme || 'vs-light', // 编辑器主题颜色
        folding: true, // 是否折叠
        foldingHighlight: true, // 折叠等高线
        foldingStrategy: 'indentation', // 折叠方式  auto | indentation
        showFoldingControls: 'always', // 是否一直显示折叠 always | mouseover
        disableLayerHinting: true, // 等宽优化
        emptySelectionClipboard: false, // 空选择剪切板
        selectionClipboard: false, // 选择剪切板
        automaticLayout: true, // 自动布局
        codeLens: false, // 代码镜头
        scrollBeyondLastLine: true, // 滚动完最后一行后再滚动一屏幕
        colorDecorators: true, // 颜色装饰器
        accessibilitySupport: 'auto', // 辅助功能支持  "auto" | "off" | "on"
        lineNumbers: 'on', // 行号 取值： "on" | "off" | "relative" | "interval" | function
        lineNumbersMinChars: 5, // 行号最小字符  number
        readOnly: isReadOnly, //是否只读  取值 true | false
        ...options,
        language: 'markdown',
      }}
    />
  );
}

export default Editor;
