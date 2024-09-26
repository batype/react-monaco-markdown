/**
 * @author shaosong
 * @description
 */
import clsx from 'clsx';
import React, { useEffect } from 'react';
import NextMarkdownPreview from '../NextMarkdown';
import Editor from './Editor';
import NavigationBar from './components/NavigationBar';
import { MonacoMarkdownEditorConText } from './context';
import { IndexProps } from './index';
import { Image } from './plugins/Image/index';
import { BlockCodeBlock } from './plugins/block/code-block';
import { BlockCodeInline } from './plugins/block/code-inline';
import { BlockQuote } from './plugins/block/quote';
import { BlockWrap } from './plugins/block/wrap';
import { Clear } from './plugins/clear';
import { FontBold } from './plugins/font/bold';
import { FontItalic } from './plugins/font/italic';
import { FontStrikethrough } from './plugins/font/strikethrough';
import { FontUnderline } from './plugins/font/underline';
import { FullScreen } from './plugins/fullScreen';
import { Header } from './plugins/header';
import { Link } from './plugins/link';
import { ListOrdered } from './plugins/list/ordered';
import { ListUnordered } from './plugins/list/unordered';
import { Logger } from './plugins/logger';
import { Mail } from './plugins/mail';
import { ModeToggle } from './plugins/modeToggle';
import { Operate } from './plugins/operate';
import { Table } from './plugins/table';
import './style.css';

const MonacoMarkdownEditorMain: React.FC<IndexProps> = (props) => {
  const {
    markdown,
    view,
    isFullScreen,
    registerLeftOperate,
    leftOperate,
    editorConfig,
  } = MonacoMarkdownEditorConText.useContainer();

  useEffect(() => {
    registerLeftOperate([
      Header,
      FontBold,
      FontItalic,
      FontUnderline,
      FontStrikethrough,
      ListUnordered,
      ListOrdered,
      BlockQuote,
      BlockWrap,
      BlockCodeInline,
      BlockCodeBlock,
      Table,
      Image,
      Link,
      Mail,
      Clear,
      Logger,
      Operate,
    ]);
  }, []);

  return React.useMemo(
    () => (
      <div
        className={clsx(
          'monaco-markdown-editor',
          props?.className,
          editorConfig?.theme === 'vs-dark' && 'dark',
          isFullScreen && 'full',
        )}
        style={props?.style}
      >
        {(editorConfig?.view?.menu !== undefined
          ? editorConfig?.view?.menu
          : true) && (
          <div
            className={clsx(
              'header-tooltip',
              editorConfig?.theme === 'vs-dark' && 'dark',
            )}
          >
            <NavigationBar
              visible={true}
              left={leftOperate?.map((Item, index) => (
                <Item key={String(index)} />
              ))}
              right={[
                <ModeToggle key={'ModeToggle'} />,
                <FullScreen key={'FullScreen'} />,
              ]}
            />
          </div>
        )}
        <div className="editor-content">
          <div
            className={clsx(
              'editor-content-left',
              editorConfig?.theme === 'vs-dark' && 'dark',
              !view?.md && 'hidden',
              view?.md && !view?.html && 'w-full',
            )}
          >
            <Editor
              width={props?.width}
              height={props?.height}
              theme={editorConfig?.theme}
              isReadOnly={editorConfig?.isReadOnly}
              options={props?.options}
            />
          </div>
          <div
            className={clsx(
              'editor-content-right',
              editorConfig?.theme === 'vs-dark' && 'dark',
              editorConfig?.htmlClass,
              !view?.html && 'hidden',
              !view?.md && view?.html && 'w-full',
            )}
          >
            {props?.renderHtml ? (
              props?.renderHtml?.({ text: markdown })
            ) : (
              <NextMarkdownPreview
                theme={editorConfig?.theme}
                code={markdown}
              />
            )}
          </div>
        </div>
      </div>
    ),
    [markdown, props, view, isFullScreen, leftOperate, editorConfig],
  );
};

export default MonacoMarkdownEditorMain;
