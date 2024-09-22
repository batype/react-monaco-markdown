import React from 'react';
import Icon from '../components/Icon';
import { MonacoMarkdownEditorConText } from '../context';
import i18n from '../i18n';

// interface ModeToggleState {
//   view: {
//     html: boolean;
//     md: boolean;
//   };
// }

enum NEXT_ACTION {
  SHOW_ALL,
  SHOW_MD,
  SHOW_HTML,
}

export const ModeToggle = () => {
  // const pluginName = "mode-toggle";

  const { editorConfig, view, changeView } =
    MonacoMarkdownEditorConText.useContainer();

  /**
   * 显示标准：
   * 两个都显示的时候，点击显示MD，隐藏HTML
   * 只显示HTML的时候，点击全部显示
   * 只显示MD的时候，点击显示HTML，隐藏MD
   * 如果当前标准因canView不可用，则顺延至下一个
   * 如果都不可用，则返回当前状态
   */
  const next = (): NEXT_ACTION => {
    const canView = editorConfig?.canView;

    const actions = [
      NEXT_ACTION.SHOW_ALL,
      NEXT_ACTION.SHOW_MD,
      NEXT_ACTION.SHOW_HTML,
    ];

    if (!canView?.both) {
      actions.splice(actions.indexOf(NEXT_ACTION.SHOW_ALL), 1);
    }
    if (!canView?.md) {
      actions.splice(actions.indexOf(NEXT_ACTION.SHOW_MD), 1);
    }
    if (!canView?.html) {
      actions.splice(actions.indexOf(NEXT_ACTION.SHOW_HTML), 1);
    }

    let current = NEXT_ACTION.SHOW_MD;
    if (view?.html) {
      current = NEXT_ACTION.SHOW_HTML;
    }
    if (view?.html && view?.md) {
      current = NEXT_ACTION.SHOW_ALL;
    }

    if (actions.length === 0) return current;
    if (actions.length === 1) return actions[0];

    const index = actions.indexOf(current);
    return index < actions.length - 1 ? actions[index + 1] : actions[0];
  };

  const handleClick = () => {
    switch (next()) {
      case NEXT_ACTION.SHOW_ALL:
        changeView({
          html: true,
          md: true,
        });
        break;
      case NEXT_ACTION.SHOW_HTML:
        changeView({
          html: true,
          md: false,
        });
        break;
      case NEXT_ACTION.SHOW_MD:
        changeView({
          html: false,
          md: true,
        });
        break;
    }
  };

  const getDisplayInfo = () => {
    switch (next()) {
      case NEXT_ACTION.SHOW_ALL:
        return {
          icon: 'view-split',
          title: 'All',
        };
      case NEXT_ACTION.SHOW_HTML:
        return {
          icon: 'visibility',
          title: 'Preview',
        };
      default:
        return {
          icon: 'keyboard',
          title: 'Editor',
        };
    }
  };

  const display = getDisplayInfo();
  return (
    <span
      className="button button-type-mode"
      title={i18n.get('btnMode' + display.title)}
      onClick={handleClick}
    >
      <Icon type={display.icon} />
    </span>
  );
};
