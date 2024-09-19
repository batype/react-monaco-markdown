import Icon from "../../components/Icon";
import i18n from "../../i18n";
import { MonacoMarkdownEditorConText } from "../../context";

export const BlockCodeBlock = () => {
  const pluginName = "block-code-block";
  const { insertMarkdown } = MonacoMarkdownEditorConText.useContainer();
  return (
    <span
      className='button button-type-code-block'
      title={i18n.get("btnCode")}
      onClick={() => insertMarkdown("code")}>
      <Icon type='code-block' />
    </span>
  );
};
