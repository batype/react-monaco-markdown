/**
 * @author shaosong
 * @description
 */
import { editor } from 'monaco-editor';
import React from 'react';
import MonacoMarkdownEditorMain from './EditorMain';
import { MonacoMarkdownEditorConText } from './context';
import { EditorConfig } from './share/var';

export type ReturnValue = {
  text?: string | undefined;
  html?: string | undefined;
};

export class IndexProps {
  className?: string;
  style?: React.CSSProperties;
  value?: string;
  onChange?: (pre: ReturnValue) => void;
  renderHtml?: (pre: ReturnValue) => React.ReactNode;
  config?: EditorConfig;
  options?: editor.IStandaloneEditorConstructionOptions | undefined;
  width?: number | string;
  height?: number | string;
}

const Index: React.FC<IndexProps> = (props) => {
  return React.useMemo(
    () => (
      <MonacoMarkdownEditorConText.Provider initialState={props}>
        <MonacoMarkdownEditorMain {...props} />
      </MonacoMarkdownEditorConText.Provider>
    ),
    [props],
  );
};

export default Index;
