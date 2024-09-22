import React from 'react';
import Icon from '../../components/Icon';
import { MonacoMarkdownEditorConText } from '../../context';
import i18n from '../../i18n';

export const BlockWrap = () => {
  // const pluginName = "block-wrap";

  const { insertMarkdown } = MonacoMarkdownEditorConText.useContainer();

  return (
    <span
      className="button button-type-wrap"
      title={i18n.get('btnLineBreak')}
      onClick={() => insertMarkdown('hr')}
    >
      <Icon type="wrap" />
    </span>
  );
};
