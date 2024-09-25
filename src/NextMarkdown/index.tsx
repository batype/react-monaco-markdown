import React from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  materialLight,
  vscDarkPlus,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import clsx from 'clsx';
import 'highlight.js/styles/github.css';
import 'katex/dist/katex.min.css';
import './github-markdown.css';
import './index.css';

class ReactMarkdownProps {
  code? = '' as any;
  theme?: 'vs-light' | 'vs-dark';
}

const NextMarkdownPreview: React.FC<ReactMarkdownProps> = ({ code, theme }) => {
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
      const match = /language-(\w+)/.exec(className || '');
      return match?.length ? (
        <>
          {/* {header(match, children)} */}

          <SyntaxHighlighter
            showLineNumbers={true}
            startingLineNumber={1}
            language={match[1]}
            style={theme === 'vs-dark' ? vscDarkPlus : materialLight}
            lineNumberStyle={{ color: '#ddd', fontSize: 16 }}
            wrapLines={false}
          >
            {children ? String(children).replace(/\n$/, '') : ''}
          </SyntaxHighlighter>
        </>
      ) : (
        <code className={className}>{children}</code>
      );
    },
  };

  return (
    <div className="flex">
      <div className="w-[100%]">
        <ReactMarkdown
          className={clsx(
            'markdown-body',
            theme === 'vs-dark' ? 'dark' : 'light',
          )}
          remarkPlugins={[remarkMath, remarkGfm]}
          rehypePlugins={[rehypeKatex]}
          components={components}
        >
          {code}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default NextMarkdownPreview;
