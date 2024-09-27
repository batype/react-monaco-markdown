/* eslint-disable @typescript-eslint/no-explicit-any */
import { Monaco, useMonaco } from '@monaco-editor/react';
import _ from 'lodash';
import { IRange, Selection, editor } from 'monaco-editor';
import React, { useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';
import { IndexProps } from './index';
import emitter from './share/emitter';
import {
  EditorConfig,
  EditorEvent,
  KeyboardEventListener,
  View,
} from './share/var';
import getDecorated, { Decorated, SelectionType } from './utils/decorate';

const initMarkdown =
  "# React Monaco markdown 基本使用 \n\n<8@batype.com> \n\nHello, React engineer, welcome to use React Monaco markdown!!!  \n\n```shell \npnpm install react-monaco-markdown\n``` \n\n# h1\n\n## h2\n\n### h3\n\n#### h4\n\n##### h5\n\n###### h6\n\n**加粗**\n\n*斜体*\n\n__下划线__\n\n~~删除线~~\n\n## 有序列表\n\n1. 有序列表1\n2. 有序列表2\n3. 有序列表3\n4. 有序列表4\n5. \n\n## 无序列表\n\n- 无序列表1\n- 无序列表2\n- 无序列表3\n- 无序列表4\n\n> 这是引用，这是引用，这是引用\n\n这是分割线\n\n---\n\n`console.log('这是一行代码！')`\n\n```ts\nfunction demo() {\n    const log = '这是代码块';\n    console.log(log)\n}\n\ndemo()\n```\n\n## 这是表格\n\n| Head | Head | Head |\n| --- | --- | --- |\n| Data | Data | Data |\n| Data | Data | Data |\n\n![这是一张图片](https://pic.imgdb.cn/item/66cc2a65d9c307b7e93f76a0.png)\n\n[batype 的网站链接](https://next.batype.com)\n";

const useMonacoMarkdownEditorConText = (props?: IndexProps) => {
  const [markdown, changeMarkdown] = useState<string | undefined>(initMarkdown);
  const [html, changeHtml] = useState<string | undefined>('');
  const [editorConfig, changeEditorConfig] = useState<EditorConfig>();
  const [isFullScreen, changeIsFullScreen] = useState(false);
  const [leftOperate, ChangeLeftOperate] = useState<(() => JSX.Element)[]>([]);
  const [view, changeView] = useState<View>({
    md: true,
    html: false,
  });

  const monaco = useMonaco();

  /**
   * Listen keyboard events
   */
  const keyboardListeners: KeyboardEventListener[] = [];

  const monacoRef = React.useRef<any>();

  useEffect(() => {
    if (props?.value && !_.isEqual(markdown, props?.value)) {
      changeMarkdown(props?.value);
      return;
    }
    if (props?.value === undefined) {
      changeMarkdown(initMarkdown);
      return;
    }

    if (!props?.value) {
      changeMarkdown(props?.value);
      return;
    }
    if (props?.value !== undefined) {
      changeMarkdown('');
    }
  }, [props?.value]);

  useEffect(() => {
    if (props?.config && !_.isEqual(editorConfig, props?.config)) {
      changeEditorConfig(props?.config);
    }
  }, [props?.config, editorConfig]);

  const getHtmlValue = (): string | '' => {
    if (html) {
      return html;
    }
    if (monaco) {
      return monaco.editor.getEditors()[0].getValue();
    }
    return '';
  };

  /**
   * Listen keyboard events
   * @param {KeyboardEventListener} data
   */
  const onKeyboard = (
    data: KeyboardEventListener | KeyboardEventListener[],
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
      case 'change':
        return emitter.EVENT_CHANGE;
      case 'fullscreen':
        return emitter.EVENT_FULL_SCREEN;
      case 'viewchange':
        return emitter.EVENT_VIEW_CHANGE;
      case 'keydown':
        return emitter.EVENT_KEY_DOWN;
      case 'blur':
        return emitter.EVENT_BLUR;
      case 'focus':
        return emitter.EVENT_FOCUS;
      case 'scroll':
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
    // console.log('value', value);
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
   * Set selected
   * @param {editor.ICodeEditor | null} editor
   * @param {IRange} position
   */
  const setSelection = (
    editor: editor.ICodeEditor | null,
    position: IRange,
  ) => {
    if (editor) {
      const selection: IRange = {
        startColumn: position.startColumn,
        startLineNumber: position.startLineNumber,
        endColumn: position.endColumn,
        endLineNumber: position.endLineNumber,
      };
      editor.setSelection(selection);
      // editor?.setPosition(position);
      editor?.focus();
    }
  };

  const pushEditOperations = (
    type: string,
    model: editor.ITextModel | null,
    editor: editor.ICodeEditor | null,
    selection: Selection,
    formattedText: string,
    newSelection?: SelectionType,
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
      () => null,
    );

    // 保持光标位置
    const newPosition = model?.getPositionAt(
      (selection?.getSelectionStart().column || 0) + formattedText?.length,
    );

    const column = (): number => {
      switch (type) {
        case 'table':
          return 3;
        case 'image':
          return (newPosition?.column || 0) - 2;
        case 'mail':
        case 'link':
        case 'inlinecode':
          return 2;
        default:
          return newPosition?.column || 0;
      }
    };

    setSelection(editor, {
      startColumn: column(),
      startLineNumber: selection?.startLineNumber + (newSelection?.line || 0),
      endColumn: type === 'table' ? 7 : column(),
      endLineNumber: selection?.startLineNumber + (newSelection?.line || 0),
    });
  };

  /**
   * Insert text
   * @param {string} value The text will be insert
   * @param {boolean} _replaceSelected Replace selected text
   * @param {Selection} newSelection New selection
   */
  const insertText = (
    value: string = '',
    _replaceSelected: boolean,
    type: string,
    newSelection?: SelectionType,
  ) => {
    const { model, selection, editor } = getSelection();
    if (selection) {
      pushEditOperations(type, model, editor, selection, value, newSelection);
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

  const clearMonacoMarkdown = () => {
    if (monaco) {
      const { model, editor } = getSelection();
      model?.setValue('');
      clearSelection();
      editor?.focus();
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
    if (type === 'image') {
      decorateOption = {
        ...decorateOption,
        target: option.target || selection?.text || '',
        imageUrl: option.imageUrl || editorConfig?.imageUrl,
      };
    }
    if (type === 'link') {
      decorateOption = {
        ...decorateOption,
        linkUrl: editorConfig?.linkUrl,
      };
    }
    const decorate: Decorated = getDecorated(
      selection?.text as string,
      type,
      decorateOption,
    );
    insertText(decorate.text, true, type, decorate?.selection);
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
      const headerPrefix = Array(level).fill('#').join('');
      const formattedText = `${headerPrefix} ${text}`;
      if (selection) {
        pushEditOperations(
          'h' + level,
          model,
          editor,
          selection,
          formattedText,
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

  const handleEditorDidMount = (
    editor: editor.IStandaloneCodeEditor,
    monaco: Monaco,
  ) => {
    // 编辑器加载完成后，添加自定义按键监听
    editor.addCommand(monaco.KeyCode.Enter, () => {
      const model = editor.getModel();
      const currentPosition = editor.getPosition();
      const lines = editor.getValue()?.split('\n');
      const lineNumber: number = currentPosition?.lineNumber || 0;
      const currentLineContent = model?.getLineContent(lineNumber);
      const listMarkerRegex = /^(\s*)([*+-]|\d+\.)\s/;
      const match = currentLineContent?.match(listMarkerRegex);

      const addLine = (line: number) => {
        // 如果当前行为空，则删除该行
        model?.setValue(lines?.join('\n') as string);

        const position = new monaco.Position(
          lineNumber + line,
          (lineNumber - 1 ? model?.getLineMaxColumn(lineNumber - 1) : 1) || 1,
        );

        editor.setPosition(position);
      };

      if (match) {
        const [fullMatch, indent, marker] = match;
        // 检查当前行是否为空
        if (currentLineContent?.trim() === fullMatch?.trim()) {
          lines[lineNumber - 1] = '';
          addLine(0);
        } else {
          // Otherwise, add a new list item
          let newMarker = marker;

          // If it's a numbered list, increment the number
          if (/^\d+$/.test(marker.slice(0, -1))) {
            const currentNumber = parseInt(marker.slice(0, -1));
            newMarker = `${currentNumber + 1}.`;
          }

          const newLinePrefix = `${indent}${newMarker} `;
          lines.splice(lineNumber, 0, newLinePrefix);

          // Update subsequent numbered list items
          if (/^\d+$/.test(marker.slice(0, -1))) {
            for (let i = lineNumber + 1; i < lines.length; i++) {
              const nextMatch = lines[i].match(listMarkerRegex);
              if (nextMatch && /^\d+$/.test(nextMatch[2].slice(0, -1))) {
                const nextNumber = parseInt(nextMatch[2].slice(0, -1));
                lines[i] = lines[i].replace(
                  listMarkerRegex,
                  `\$1${nextNumber + 1}. `,
                );
              } else {
                break;
              }
            }
          }
          // 如果当前行有内容，可以在列表末尾追加新行（这里仅做示例，实际应用中可能需要根据具体逻辑调整）
          model?.setValue(lines?.join('\n') as string);
          editor.setPosition(
            new monaco.Position(lineNumber + 1, newLinePrefix?.length + 1),
          );
        }
      } else {
        // lines.splice(lineNumber, 0, "");
        // addLine(1);
        editor.trigger('keyboard', 'type', { text: '\n' });
      }
    });
  };

  const registerLeftOperate = (plugins: (() => JSX.Element)[]) => {
    let leftPlugin = _.cloneDeep(leftOperate);
    leftPlugin = [...leftPlugin, ...plugins];
    ChangeLeftOperate(leftPlugin);
  };

  const insertPlaceholder = (placeholder: string, wait: Promise<string>) => {
    insertText(placeholder, true, 'image');
    wait.then((str) => {
      const text = markdown?.replace(placeholder, str);
      setText(text as string);
    });
  };

  return {
    view,
    leftOperate,
    isFullScreen,
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
    insertPlaceholder,
    handleEditorDidMount,
    setSelection,
    getSelection,
    clearSelection,
    insertMarkdown,
    insertMarkdownHText,
    changeMarkdown: changeValue,
    changeView,
    changeIsFullScreen,
    registerLeftOperate,
  };
};

export const MonacoMarkdownEditorConText = createContainer(
  useMonacoMarkdownEditorConText,
);
