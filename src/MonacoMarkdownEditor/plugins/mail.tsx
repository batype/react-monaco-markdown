import React from 'react';
import NextIcon from '../components/NextIcon';
import { MonacoMarkdownEditorConText } from '../context';
import i18n from '../i18n';

export const Mail = () => {
  // const pluginName = "link";

  const { insertMarkdown } = MonacoMarkdownEditorConText.useContainer();

  // const handleKeyboard = {
  //   key: "k",
  //   keyCode: 75,
  //   aliasCommand: true,
  //   withKey: ["ctrlKey"],
  //   callback: () => insertMarkdown("link"),
  // };

  return (
    <span
      className="button button-type-link"
      title={i18n.get('btnMail')}
      onClick={() => insertMarkdown('mail')}
    >
      <NextIcon type="email" size={16} />
    </span>
  );
};
