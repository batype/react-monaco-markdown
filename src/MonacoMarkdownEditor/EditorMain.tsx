/**
 * @author shaosong
 * @description
 */
import React, { useEffect } from "react";
import "./style.less";
import Editor from "./Editor";
import { IndexProps } from "./index";
import { MonacoMarkdownEditorConText } from "./context";
import NavigationBar from "./components/NavigationBar";
import { Header } from "./plugins/header";
import { FontBold } from "./plugins/font/bold";
import { FontItalic } from "./plugins/font/italic";
import { FontStrikethrough } from "./plugins/font/strikethrough";
import { ListOrdered } from "./plugins/list/ordered";
import { ListUnordered } from "./plugins/list/unordered";
import { BlockQuote } from "./plugins/block/quote";
import { BlockWrap } from "./plugins/block/wrap";
import { BlockCodeInline } from "./plugins/block/code-inline";
import { BlockCodeBlock } from "./plugins/block/code-block";
import { Table } from "./plugins/table";
import { Image } from "./plugins/Image/index";
import { FontUnderline } from "./plugins/font/underline";
import { Link } from "./plugins/link";
import { Clear } from "./plugins/clear";
import { Logger } from "./plugins/logger";
import { Operate } from "./plugins/operate";
import { ModeToggle } from "./plugins/modeToggle";
import clsx from "clsx";
import { FullScreen } from "./plugins/fullScreen";
import NextMarkdown from "../NextMarkdown";

const MonacoMarkdownEditorMain: React.FC<IndexProps> = (props) => {
  const { markdown, view, isFullScreen, registerLeftOperate, leftOperate } =
    MonacoMarkdownEditorConText.useContainer();

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
      Clear,
      Logger,
      Operate,
    ]);
  }, []);

  return React.useMemo(
    () => (
      <div className={clsx("monaco-markdown-editor", isFullScreen && "full")}>
        <div className='header-tooltip'>
          <NavigationBar
            visible={true}
            left={leftOperate?.map((Item, index) => (
              <Item key={String(index)} />
            ))}
            right={[
              <ModeToggle key={"ModeToggle"} />,
              <FullScreen key={"FullScreen"} />,
            ]}
          />
        </div>
        <div className='editor-content'>
          <div
            className={clsx(
              "editor-content-left",
              !view?.md && "hidden",
              view?.md && !view?.html && "w-full"
            )}>
            <Editor />
          </div>
          <div
            className={clsx(
              "editor-content-right",
              !view?.html && "hidden",
              !view?.md && view?.html && "w-full"
            )}>
            {props?.renderHtml ? (
              props?.renderHtml?.({ text: markdown })
            ) : (
              <NextMarkdown id={""} code={markdown} />
            )}
          </div>
        </div>
      </div>
    ),
    [markdown, props, view, isFullScreen, leftOperate]
  );
};

export default MonacoMarkdownEditorMain;
