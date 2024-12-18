import React from 'react';
import Icon from '../../components/Icon';
import { MonacoMarkdownEditorConText } from '../../context';
import i18n from '../../i18n';

export const BlockCodeInline = () => {
  // const pluginName = "block-code-inline";

  const { insertMarkdown } = MonacoMarkdownEditorConText.useContainer();

  return (
    <span
      className="button button-type-code-inline"
      title={i18n.get('btnInlineCode')}
      onClick={() => insertMarkdown('inlinecode')}
    >
      <Icon type="code" />
    </span>
  );
};
