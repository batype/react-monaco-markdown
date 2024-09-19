import Icon from "../../components/Icon";
import i18n from "../../i18n";
import { MonacoMarkdownEditorConText } from "../../context";

export const BlockWrap = () => {
  const pluginName = "block-wrap";

  const { insertMarkdown } = MonacoMarkdownEditorConText.useContainer();

  return (
    <span
      className='button button-type-wrap'
      title={i18n.get("btnLineBreak")}
      onClick={() => insertMarkdown("hr")}>
      <Icon type='wrap' />
    </span>
  );
};
