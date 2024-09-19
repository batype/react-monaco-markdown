import * as React from "react";
import HeaderList from "./HeaderList";
import { MonacoMarkdownEditorConText } from "../../context";
import i18n from "../../i18n";
import DropList from "../../components/DropList";
import Icon from "../../components/Icon";

export const Header = () => {
  // const pluginName = "header";
  const [show, changeShow] = React.useState(false);
  const { insertMarkdownHText } = MonacoMarkdownEditorConText.useContainer();

  const showFun = () => {
    changeShow(true);
  };

  const hideFun = () => {
    changeShow(false);
  };

  return (
    <span
      className='button button-type-header'
      title={i18n.get("btnHeader")}
      onMouseEnter={showFun}
      onMouseLeave={hideFun}>
      {/* <NextIcon type='font-size' /> */}
      <Icon type='font-size' />
      <DropList show={show} onClose={hideFun}>
        <HeaderList
          onSelectHeader={(header: number) => insertMarkdownHText(header)}
        />
      </DropList>
    </span>
  );
};
