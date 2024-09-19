/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContainer } from "unstated-next";
import { IndexProps } from "./index";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { EditorConfig, KeyboardEventListener, EditorEvent } from "./share/var";
import { useMonaco } from "@monaco-editor/react";
import { editor, IPosition, IRange, Selection } from "monaco-editor";
import getDecorated, { Decorated, SelectionType } from "./utils/decorate";
import emitter from "./share/emitter";

const useMonacoMarkdownEditorConText = (props?: IndexProps) => {
  const [markdown, changeMarkdown] = useState<string | undefined>("");
  const [html, changeHtml] = useState<string | undefined>("");
  const [editorConfig, changeEditorConfig] = useState<EditorConfig>();

  const monaco = useMonaco();

  /**
   * Listen keyboard events
   */
  const keyboardListeners: KeyboardEventListener[] = [];

  const monacoRef = React.useRef<any>();

  useEffect(() => {
    if (props?.value && !_.isEqual(markdown, props?.value)) {
      changeMarkdown(props?.value);
    }
  }, [markdown, props?.value]);

  useEffect(() => {
    if (props?.config && !_.isEqual(editorConfig, props?.config)) {
      changeEditorConfig(props?.config);
    }
  }, [props?.config, editorConfig]);

  const getHtmlValue = (): string | "" => {
    if (html) {
      return html;
    }
    if (monaco) {
      return monaco.editor.getEditors()[0].getValue();
    }
    return "";
  };

  /**
   * Listen keyboard events
   * @param {KeyboardEventListener} data
   */
  const onKeyboard = (
    data: KeyboardEventListener | KeyboardEventListener[]
  ) => {
    if (Array.isArray(data)) {
      data.forEach((it) => onKeyboard(it));
      return;
    }
    if (!keyboardListeners.includes(data)) {
      keyboardListeners.push(data);
    }
  };

  const getEventType = (event: EditorEvent) => {
    switch (event) {
      case "change":
        return emitter.EVENT_CHANGE;
      case "fullscreen":
        return emitter.EVENT_FULL_SCREEN;
      case "viewchange":
        return emitter.EVENT_VIEW_CHANGE;
      case "keydown":
        return emitter.EVENT_KEY_DOWN;
      case "blur":
        return emitter.EVENT_BLUR;
      case "focus":
        return emitter.EVENT_FOCUS;
      case "scroll":
        return emitter.EVENT_SCROLL;
    }
  };

  /**
   * Listen events
   * @param {EditorEvent} event Event type
   * @param {any} cb Callback
   */
  const on = (event: EditorEvent, cb: any) => {
    const eventType = getEventType(event);
    if (eventType) {
      emitter.on(eventType, cb);
    }
  };

  const changeValue = (value: string | undefined) => {
    changeMarkdown(value);
    props?.onChange?.({ text: value, html: getHtmlValue() });
  };

  const getSelection = () => {
    if (monaco) {
      const editor = monaco?.editor?.getEditors()[0];
      const model = editor.getModel();
      const selection = editor?.getSelection();
      const text = model?.getValueInRange(selection as IRange);
      const column = selection?.getStartPosition().column;
      const lineNumber = selection?.getStartPosition().lineNumber;
      const endColumn = selection?.getEndPosition().column;
      const endLineNumber = selection?.getEndPosition().lineNumber;

      return {
        editor,
        model,
        selection,
        column,
        lineNumber,
        endColumn,
        endLineNumber,
        text,
      };
    }
    return {
      editor: null,
      model: null,
      selection: null,
      column: null,
      lineNumber: null,
      endColumn: null,
      endLineNumber: null,
      text: null,
    }; // 或者返回一个表示未找到编辑器实例的默认值
  };

  /**
   * Insert text
   * @param {string} value The text will be insert
   * @param {boolean} _replaceSelected Replace selected text
   * @param {Selection} newSelection New selection
   */
  const insertText = (
    value: string = "",
    _replaceSelected: boolean,
    type: string,
    newSelection?: SelectionType
  ) => {
    const { model, selection, editor } = getSelection();
    if (selection) {
      pushEditOperations(type, model, editor, selection, value, newSelection);
    }
  };

  /**
   * Set selected
   * @param {editor.ICodeEditor | null} editor
   * @param {IPosition} position
   */
  const setSelection = (
    editor: editor.ICodeEditor | null,
    position: IPosition
  ) => {
    if (editor) {
      editor?.setPosition(position);
      editor?.focus();
    }
  };

  const clearMonacoMarkdown = () => {
    if (monaco) {
      const { model, editor } = getSelection();
      model?.setValue("");
      clearSelection();
      editor?.focus();
    }
  };

  /**
   * Clear selected
   */
  const clearSelection = () => {
    if (monaco) {
      monaco.editor.getEditors()[0].setSelection({
        startColumn: 0,
        startLineNumber: 0,
        endColumn: 0,
        endLineNumber: 0,
      });
    }
  };

  /**
   * Insert markdown text
   * @param type
   * @param option
   */
  const insertMarkdown = (type: string, option: any = {}) => {
    const selection = getSelection();
    let decorateOption = option ? { ...option } : {};
    if (type === "image") {
      decorateOption = {
        ...decorateOption,
        target: option.target || selection?.text || "",
        imageUrl: option.imageUrl || editorConfig?.imageUrl,
      };
    }
    if (type === "link") {
      decorateOption = {
        ...decorateOption,
        linkUrl: editorConfig?.linkUrl,
      };
    }
    const decorate: Decorated = getDecorated(
      selection?.text as string,
      type,
      decorateOption
    );
    insertText(decorate.text, true, type, decorate?.selection);
  };

  const pushEditOperations = (
    type: string,
    model: editor.ITextModel | null,
    editor: editor.ICodeEditor | null,
    selection: Selection,
    formattedText: string,
    newSelection?: SelectionType
  ) => {
    // 替换选中的文本
    model?.pushEditOperations(
      [],
      [
        {
          range: selection as IRange,
          text: formattedText,
        },
      ],
      () => null
    );

    // 保持光标位置
    const newPosition = model?.getPositionAt(
      (selection?.getSelectionStart().column || 0) + formattedText?.length
    );

    const column = (): number => {
      switch (type) {
        case "table":
          return 7;
        case "image":
          return (newPosition?.column || 0) - 2;
        case "link":
          return 2;
        default:
          return newPosition?.column || 0;
      }
    };

    setSelection(editor, {
      ...newPosition,
      column: column(),
      lineNumber: selection?.startLineNumber + (newSelection?.line || 0),
    } as IPosition);
  };

  /**
   * Insert markdown text
   * @param type
   * @param option
   */
  const insertMarkdownHText = (level: number) => {
    if (monaco) {
      const { text, editor, model, selection } = getSelection();

      // 根据不同的标题级别设置大纲级别
      const headerPrefix = Array(level).fill("#").join("");
      const formattedText = `${headerPrefix} ${text}`;
      if (selection) {
        pushEditOperations(
          "h" + level,
          model,
          editor,
          selection,
          formattedText
        );
      }
    }
  };

  const setText = (value: string) => {
    if (monaco) {
      const { model, editor } = getSelection();
      model?.setValue(value);
      // clearSelection();
      editor?.focus();
    }
  };

  return {
    editorConfig,
    markdown,
    monacoRef,
    html,
    on,
    setText,
    onKeyboard,
    changeHtml,
    clearMonacoMarkdown,
    changeEditorConfig,
    insertText,
    setSelection,
    getSelection,
    clearSelection,
    insertMarkdown,
    insertMarkdownHText,
    changeMarkdown: changeValue,
  };
};

export const MonacoMarkdownEditorConText = createContainer(
  useMonacoMarkdownEditorConText
);
