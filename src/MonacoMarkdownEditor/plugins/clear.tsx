import Icon from "../components/Icon";
import { MonacoMarkdownEditorConText } from "../context";
import i18n from "../i18n";

export const Clear = () => {
  const pluginName = "clear";

  const { clearMonacoMarkdown, markdown } =
    MonacoMarkdownEditorConText.useContainer();

  const handleClick = () => {
    if (markdown === "") {
      return;
    }
    clearMonacoMarkdown();
  };

  return (
    <span
      className='button button-type-clear'
      title={i18n.get("btnClear")}
      onClick={handleClick}>
      <Icon type='delete' />
    </span>
  );
};
