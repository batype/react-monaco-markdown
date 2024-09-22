import React from 'react';
import Icon from '../components/Icon';
import { MonacoMarkdownEditorConText } from '../context';
import i18n from '../i18n';

export const Link = () => {
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
      title={i18n.get('btnLink')}
      onClick={() => insertMarkdown('link')}
    >
      <Icon type="link" />
    </span>
  );
};
