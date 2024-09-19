import React, { useState } from "react";
import MonacoMarkdownEditor from "./MonacoMarkdownEditor";
import NextMarkdown from "./NextMarkdown";

function MarkdownEditorApp() {
  const [markdown, setMarkdown] = useState<string | undefined>(
    "# Hello, Markdown!"
  );

  return (
    <div className='markdown-editor-app'>
      <div className='editor-pane'>
        <MonacoMarkdownEditor
          value={markdown}
          onChange={(value: string) => setMarkdown(value)}
        />
      </div>
      <div className='preview-pane'>
        <NextMarkdown code={markdown} id='posts-next-mark-down-editor' />
      </div>
    </div>
  );
}

export default MarkdownEditorApp;
