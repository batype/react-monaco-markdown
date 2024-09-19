/**
 * @author shaosong
 * @description
 */
import React from "react";
import { MonacoMarkdownEditorConText } from "./context";
import MonacoMarkdownEditorMain from "./EditorMain";
import { EditorConfig } from "./share/var";

export type ReturnValue = {
  text?: string | undefined;
  html?: string | undefined;
};

export class IndexProps {
  value?: string;
  onChange?: (pre: ReturnValue) => void;
  renderHtml?: (pre: ReturnValue) => React.ReactNode;
  config?: EditorConfig;
}

const Index: React.FC<IndexProps> = (props) => {
  return React.useMemo(
    () => (
      <MonacoMarkdownEditorConText.Provider initialState={props}>
        <MonacoMarkdownEditorMain {...props} />
      </MonacoMarkdownEditorConText.Provider>
    ),
    [props]
  );
};

export default Index;
