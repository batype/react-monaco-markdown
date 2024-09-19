import * as monaco from "monaco-editor";
import { loader } from "@monaco-editor/react";
import MonacoEditor from "@monaco-editor/react";
import { MonacoMarkdownEditorConText } from "./context";

type Props = {
  value?: string | undefined;
  changeValue?: (val: string | undefined) => void;
  height?: number;
  isREadOnly?: boolean;
  language?: string;
  theme?: string;
};

function Editor({ height, isREadOnly, language, theme }: Props) {
  const { markdown, changeMarkdown } =
    MonacoMarkdownEditorConText.useContainer();

  loader.config({
    monaco: monaco,
  });

  return (
    <MonacoEditor
      // beforeMount={(editor) => {
      //   // 当编辑器挂载后，将编辑器实例赋值给 ref
      //   if (monacoRef) {
      //     monacoRef.current = editor;
      //   }
      // }}
      language={language || "markdown"}
      width="100%"
      value={markdown}
      height={height || "100%"}
      defaultValue='const aaa="bbbbxxx"'
      onChange={(value: string | undefined) => {
        if (changeMarkdown) changeMarkdown?.(value);
      }}
      options={{
        theme: theme || "light", // 编辑器主题颜色
        folding: true, // 是否折叠
        foldingHighlight: true, // 折叠等高线
        foldingStrategy: "indentation", // 折叠方式  auto | indentation
        showFoldingControls: "always", // 是否一直显示折叠 always | mouseover
        disableLayerHinting: true, // 等宽优化
        emptySelectionClipboard: false, // 空选择剪切板
        selectionClipboard: false, // 选择剪切板
        automaticLayout: true, // 自动布局
        codeLens: false, // 代码镜头
        scrollBeyondLastLine: false, // 滚动完最后一行后再滚动一屏幕
        colorDecorators: true, // 颜色装饰器
        accessibilitySupport: "off", // 辅助功能支持  "auto" | "off" | "on"
        lineNumbers: "on", // 行号 取值： "on" | "off" | "relative" | "interval" | function
        lineNumbersMinChars: 5, // 行号最小字符   number
        readOnly: isREadOnly, //是否只读  取值 true | false
      }}
    />
  );
}

export default Editor;
