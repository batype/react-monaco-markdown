import React from 'react';
import Icon from '../../components/Icon';
import { MonacoMarkdownEditorConText } from '../../context';
import i18n from '../../i18n';

export const ListUnordered = () => {
  // const pluginName = "list-unordered";

  const { insertMarkdown } = MonacoMarkdownEditorConText.useContainer();

  // const handleKeyboard = {
  //   key: "8",
  //   keyCode: 56,
  //   withKey: ["ctrlKey", "shiftKey"],
  //   aliasCommand: true,
  //   callback: () => insertMarkdown("unordered"),
  // };

  return (
    <span
      className="button button-type-unordered"
      title={i18n.get('btnUnordered')}
      onClick={() => insertMarkdown('unordered')}
    >
      <Icon type="list-unordered" />
    </span>
  );
};
