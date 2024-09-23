import React from 'react';
import { MonacoMarkdownEditorConText } from '../context';

export default function Count() {
  const { markdown } = MonacoMarkdownEditorConText.useContainer();
  return (
    <>
      <span>Characters: {markdown?.length}</span>|
      <span>Lines: {markdown?.split('\n')?.length}</span>
    </>
  );
}
