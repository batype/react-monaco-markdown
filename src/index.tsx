import MonacoMarkdownEditor from "./MonacoMarkdownEditor/index";
import { BlockCodeBlock } from "./MonacoMarkdownEditor/plugins/block/code-block";
import { BlockCodeInline } from "./MonacoMarkdownEditor/plugins/block/code-inline";
import { BlockQuote } from "./MonacoMarkdownEditor/plugins/block/quote";
import { BlockWrap } from "./MonacoMarkdownEditor/plugins/block/wrap";
import { FontBold } from "./MonacoMarkdownEditor/plugins/font/bold";
import { FontItalic } from "./MonacoMarkdownEditor/plugins/font/italic";
import { FontStrikethrough } from "./MonacoMarkdownEditor/plugins/font/strikethrough";
import { FontUnderline } from "./MonacoMarkdownEditor/plugins/font/underline";
import { Header } from "./MonacoMarkdownEditor/plugins/header";
import { ListOrdered } from "./MonacoMarkdownEditor/plugins/list/ordered";
import { ListUnordered } from "./MonacoMarkdownEditor/plugins/list/unordered";
import { Table } from "./MonacoMarkdownEditor/plugins/table";
import { Image } from "./MonacoMarkdownEditor/plugins/Image/index";
import { Link } from "./MonacoMarkdownEditor/plugins/link";
import { Clear } from "./MonacoMarkdownEditor/plugins/clear";
import { Logger } from "./MonacoMarkdownEditor/plugins/logger";
import { ModeToggle } from "./MonacoMarkdownEditor/plugins/modeToggle";
import { FullScreen } from "./MonacoMarkdownEditor/plugins/fullScreen";

// 导出声明
// 导出工具组件
export { default as DropList } from "./MonacoMarkdownEditor/components/DropList/index";
// 导出实用工具
export { default as getDecorated } from "./MonacoMarkdownEditor/utils/decorate";
// 导出内置插件
export const Plugins = {
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
  ModeToggle,
  FullScreen,
};

// 导出编辑器
export default MonacoMarkdownEditor;
