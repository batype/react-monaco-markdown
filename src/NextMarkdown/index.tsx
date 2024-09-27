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
import { Options } from 'react-markdown/lib';
import CopyButton from '../MonacoMarkdownEditor/components/CopyButton';
import {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
} from '../MonacoMarkdownEditor/components/HText';
import NextIcon from '../MonacoMarkdownEditor/components/NextIcon';
import './github-markdown.css';
import './index.css';

export type NextMarkdownPreviewOptions = {
  code: string;
  theme?: 'vs-light' | 'vs-dark';
  className?: string;
} & Options;

const NextMarkdownPreview: React.FC<NextMarkdownPreviewOptions> = ({
  code,
  theme,
  ...props
}) => {
  const header = (match: string[], children: any) => (
    <div className="flex justify-between leading-8 h-8">
      <div className="flex pl-4 dark:text-white align-center">
        <NextIcon type="code" size={16} className="mr-2" />
        <span>{match[1]}</span>
      </div>
      <div className="flex text-right align-center">
        <CopyButton
          className="mr-2"
          code={String(children).replace(/\n$/, '')}
        />
      </div>
    </div>
  );

  const components: Components | null | undefined = {
    code({ className, children }) {
      const match = /language-(\w+)/.exec(className || '');
      return match?.length ? (
        <>
          {header(match, children)}

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
    h1: (pre) => <H1>{pre?.children as string}</H1>,
    h2: (pre) => <H2>{pre?.children as string}</H2>,
    h3: (pre) => <H3>{pre?.children as string}</H3>,
    h4: (pre) => <H4>{pre?.children as string}</H4>,
    h5: (pre) => <H5>{pre?.children as string}</H5>,
    h6: (pre) => <H6>{pre?.children as string}</H6>,
  };

  return (
    <div className={clsx('next-markdown-previewer', props?.className)}>
      <div className="flex">
        <div className="w-[100%]">
          <ReactMarkdown
            className={clsx(
              'markdown-body',
              theme === 'vs-dark' ? 'dark' : 'light',
            )}
            remarkPlugins={props?.remarkPlugins || [remarkMath, remarkGfm]}
            rehypePlugins={props?.rehypePlugins || [rehypeKatex]}
            components={props?.components || components}
            urlTransform={props?.urlTransform}
            unwrapDisallowed={props?.unwrapDisallowed}
            allowElement={props?.allowElement}
            allowedElements={props?.allowedElements}
            disallowedElements={props?.disallowedElements}
            remarkRehypeOptions={props?.remarkRehypeOptions}
            skipHtml={props?.skipHtml}
          >
            {code}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default NextMarkdownPreview;
