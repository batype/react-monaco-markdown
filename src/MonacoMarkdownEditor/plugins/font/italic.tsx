import React from 'react';
import Icon from '../../components/Icon';
import { MonacoMarkdownEditorConText } from '../../context';
import i18n from '../../i18n';

export const FontItalic = () => {
  // const pluginName = "font-italic";

  const { insertMarkdown } = MonacoMarkdownEditorConText.useContainer();

  // const handleKeyboard = {
  //   key: "i",
  //   keyCode: 73,
  //   aliasCommand: true,
  //   withKey: ["ctrlKey"],
  //   callback: () => insertMarkdown("italic"),
  // };

  return (
    <span
      className="button button-type-italic"
      title={i18n.get('btnItalic')}
      onClick={() => insertMarkdown('italic')}
    >
      <Icon type="italic" />
    </span>
  );
};
