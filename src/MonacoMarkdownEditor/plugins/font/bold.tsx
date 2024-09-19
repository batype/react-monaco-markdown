import Icon from "../../components/Icon";
import { MonacoMarkdownEditorConText } from "../../context";
import i18n from "../../i18n";

export const FontBold = () => {
  const { insertMarkdown } = MonacoMarkdownEditorConText.useContainer();

  const handleKeyboard = {
    key: "b",
    keyCode: 66,
    aliasCommand: true,
    withKey: ["ctrlKey"],
    callback: () => insertMarkdown("bold"),
  };

  return (
    <span
      className='button button-type-bold'
      title={i18n.get("btnBold")}
      onClick={() => insertMarkdown("bold")}>
      <Icon type='bold' />
    </span>
  );
};
