import React from 'react';
import Icon from '../../components/Icon';
import { MonacoMarkdownEditorConText } from '../../context';
import i18n from '../../i18n';

export const BlockQuote = () => {
  // const pluginName = "block-quote";

  const { insertMarkdown } = MonacoMarkdownEditorConText.useContainer();

  return (
    <span
      className="button button-type-quote"
      title={i18n.get('btnQuote')}
      onClick={() => insertMarkdown('quote')}
    >
      <Icon type="quote" />
    </span>
  );
};
