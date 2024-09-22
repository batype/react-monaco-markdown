/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import DropList from "../../components/DropList";
import Icon from "../../components/Icon";
import i18n from "../../i18n";
import TableList from "./table";
import { MonacoMarkdownEditorConText } from "../../context";

export const Table = () => {
  // const pluginName = "table";
  const { insertMarkdown, editorConfig } =
    MonacoMarkdownEditorConText.useContainer();

  const [show, changeShow] = React.useState(false);

  const showFun = () => {
    changeShow(true);
  };
  const hideFun = () => {
    changeShow(false);
  };

  const config = editorConfig?.table;
  return (
    <span
      className='button button-type-table'
      title={i18n.get("btnTable")}
      onMouseEnter={showFun}
      onMouseLeave={hideFun}>
      <Icon type='grid' />
      <DropList show={show} onClose={hideFun}>
        <TableList
          visiblity={show}
          maxRow={config?.maxRow}
          maxCol={config?.maxCol}
          onSetTable={(option: any) => insertMarkdown("table", option)}
        />
      </DropList>
    </span>
  );
};
