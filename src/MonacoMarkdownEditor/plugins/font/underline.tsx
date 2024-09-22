import React from 'react';
import Icon from '../../components/Icon';
import { MonacoMarkdownEditorConText } from '../../context';
import i18n from '../../i18n';

export const FontUnderline = () => {
  // const pluginName = "font-underline";

  const { insertMarkdown } = MonacoMarkdownEditorConText.useContainer();

  // const handleKeyboard = {
  //   key: "u",
  //   keyCode: 85,
  //   withKey: ["ctrlKey"],
  //   callback: () => insertMarkdown("underline"),
  // };

  return (
    <span
      className="button button-type-underline"
      title={i18n.get('btnUnderline')}
      onClick={() => insertMarkdown('underline')}
    >
      <Icon type="underline" />
    </span>
  );
};
