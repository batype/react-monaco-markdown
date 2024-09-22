import React from "react";
import ReactMarkdown, { Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  materialDark,
  materialLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";

import "highlight.js/styles/github.css";
import "katex/dist/katex.min.css";
import "github-markdown-css";
import "./index.css";

class ReactMarkdownProps {
  code? = "" as any;
  isToc? = false as boolean;
  id!: string;
}
// materialDark,
// materialLight
const styleMd = {
  dark: materialDark,
  light: materialLight,
};

const NextMarkdown: React.FC<ReactMarkdownProps> = ({ code, id }) => {
  // const header = (match, children) => (
  //   <div className="flex justify-between leading-8">
  //     <div className="pl-4 dark:text-white">
  //       <NextIcon type="code" size={16} className="mr-4" />
  //       {match[1]}
  //     </div>
  //     <div className="text-right">
  //       <CopyButton text={String(children).replace(/\n$/, '')} />
  //     </div>
  //   </div>
  // )

  const components: Components | null | undefined = {
    code({ className, children }) {
      const match = /language-(\w+)/.exec(className || "");
      return match?.length ? (
        <>
          {/* {header(match, children)} */}

          <SyntaxHighlighter
            showLineNumbers={true}
            startingLineNumber={1}
            language={match[1]}
            style={styleMd.dark}
            lineNumberStyle={{ color: "#ddd", fontSize: 16 }}
            wrapLines={false}>
            {children ? String(children).replace(/\n$/, "") : ""}
          </SyntaxHighlighter>
        </>
      ) : (
        <code className={className}>{children}</code>
      );
    },
  };

  return (
    <div className='flex'>
      <div id={id} className='w-[100%]'>
        <ReactMarkdown
          className='markdown-body dark:text-white font-color dark:bg-[#1A1A1A]'
          remarkPlugins={[remarkMath, remarkGfm]}
          rehypePlugins={[rehypeKatex]}
          components={components}>
          {code}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default NextMarkdown;
