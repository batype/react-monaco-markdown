/**
 * @author shaosong
 * @description
 */
import React from "react";
import "./style.less";
import Editor from "./Editor";
import { IndexProps } from "./index";
import { MonacoMarkdownEditorConText } from "./context";
import NavigationBar from "./components/NavigationBar";
import { Header } from "./plugins/header";
import NextIcon from "./components/NextIcon";
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

const MonacoMarkdownEditorMain: React.FC<IndexProps> = (props) => {
  const { markdown } = MonacoMarkdownEditorConText.useContainer();
  return React.useMemo(
    () => (
      <div className="monaco-markdown-editor">
        <div className="header-tooltip">
          <NavigationBar
            visible={true}
            left={[
              <Header key={"Header"} />,
              <FontBold key={"FontBold"} />,
              <FontItalic key={"FontItalic"} />,
              <FontUnderline key={"FontUnderline"} />,
              <FontStrikethrough key={"FontStrikethrough"} />,
              <ListUnordered key={"ListUnordered"} />,
              <ListOrdered key={"ListOrdered"} />,
              <BlockQuote key={"BlockQuote"} />,
              <BlockWrap key={"BlockWrap"} />,
              <BlockCodeInline key={"BlockCodeInline"} />,
              <BlockCodeBlock key={"BlockCodeBlock"} />,
              <Table key={"Table"} />,
              <Image key={"Image"} />,
              <Link key={"Link"} />,
              <Clear key={"Clear"} />,
              <Logger key={"Logger"} />,
            ]}
            right={<NextIcon type="font-size" />}
          />
        </div>
        <div className="editor-content">
          <div className="editor-content-left">
            <Editor />
          </div>
          <div className="editor-content-right">
            {props?.renderHtml?.({ text: markdown })}
          </div>
        </div>
      </div>
    ),
    [markdown, props]
  );
};

export default MonacoMarkdownEditorMain;
