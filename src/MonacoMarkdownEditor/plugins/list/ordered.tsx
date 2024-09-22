import React from 'react';
import Icon from '../../components/Icon';
import { MonacoMarkdownEditorConText } from '../../context';
import i18n from '../../i18n';

export const ListOrdered = () => {
  // const pluginName = "list-ordered";

  const { insertMarkdown } = MonacoMarkdownEditorConText.useContainer();

  // const handleKeyboard = {
  //   key: "7",
  //   keyCode: 55,
  //   withKey: ["ctrlKey", "shiftKey"],
  //   aliasCommand: true,
  //   callback: () => insertMarkdown("order"),
  // };

  return (
    <span
      className="button button-type-ordered"
      title={i18n.get('btnOrdered')}
      onClick={() => insertMarkdown('order')}
    >
      <Icon type="list-ordered" />
    </span>
  );
};
