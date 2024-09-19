/* eslint-disable react-hooks/rules-of-hooks */
import Editor from "./editor";
import AutoResize from "./plugins/autoResize";
import BlockCodeBlock from "./plugins/block/code-block";
import BlockCodeInline from "./plugins/block/code-inline";
import BlockQuote from "./plugins/block/quote";
import BlockWrap from "./plugins/block/wrap";
import Clear from "./plugins/clear";
import Enter from "./plugins/enter";
import FontBold from "./plugins/font/bold";
import FontItalic from "./plugins/font/italic";
import FontStrikethrough from "./plugins/font/strikethrough";
import FontUnderline from "./plugins/font/underline";
import FullScreen from "./plugins/fullScreen";
import Header from "./plugins/header";
import Image from "./plugins/Image";
import Link from "./plugins/link";
import ListOrdered from "./plugins/list/ordered";
import ListUnordered from "./plugins/list/unordered";
import Logger from "./plugins/logger";
import ModeToggle from "./plugins/modeToggle";
import Tab from "./plugins/tab";
import Table from "./plugins/table";

// 注册默认插件
Editor.use(Header);
Editor.use(FontBold);
Editor.use(FontItalic);
Editor.use(FontUnderline);
Editor.use(FontStrikethrough);
Editor.use(ListUnordered);
Editor.use(ListOrdered);
Editor.use(BlockQuote);
Editor.use(BlockWrap);
Editor.use(BlockCodeInline);
Editor.use(BlockCodeBlock);
Editor.use(Table);
Editor.use(Image);
Editor.use(Link);
Editor.use(Clear);
Editor.use(Logger);
Editor.use(ModeToggle);
Editor.use(FullScreen);
Editor.use(Tab);
Editor.use(Enter);

// 导出声明
// 导出工具组件
export { default as DropList } from "./components/DropList/index";
export { PluginComponent } from "./plugins/Plugin";
export type { PluginProps } from "./plugins/Plugin";
// 导出实用工具
export { default as getDecorated } from "./utils/decorate";
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
  Tab,
  AutoResize,
  Enter,
};

// 导出编辑器
export default Editor;
