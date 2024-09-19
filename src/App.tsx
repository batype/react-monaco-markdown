import "./App.less";
import NextMarkdown from "./NextMarkdown";
import React from "react";
import MonacoMarkdownEditor from "./MonacoMarkdownEditor";
// import Editor from "./ReactNextMdEditor";

function App() {
  const [value, setValue] = React.useState<string | undefined>(
    "**Hello world!!!**"
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MonacoMarkdownEditor
        value={value}
        onChange={(values) => setValue(values.text)}
        config={{
          table: {
            maxRow: 8,
            maxCol: 9,
          },
        }}
        renderHtml={({ text }) => (
          <NextMarkdown code={text} id='posts-next-mark-down-editor' />
        )}
      />
    </div>
  );
}

export default App;
