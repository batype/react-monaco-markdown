import React from 'react';
import Icon from '../../components/Icon';
import { MonacoMarkdownEditorConText } from '../../context';
import i18n from '../../i18n';

export const FontStrikethrough = () => {
  // const pluginName = "font-strikethrough";

  const { insertMarkdown } = MonacoMarkdownEditorConText.useContainer();

  // const handleKeyboard = {
  //   key: "d",
  //   keyCode: 68,
  //   aliasCommand: true,
  //   withKey: ["ctrlKey"],
  //   callback: () => insertMarkdown("strikethrough"),
  // };

  return (
    <span
      className="button button-type-strikethrough"
      title={i18n.get('btnStrikethrough')}
      onClick={() => insertMarkdown('strikethrough')}
    >
      <Icon type="strikethrough" />
    </span>
  );
};
