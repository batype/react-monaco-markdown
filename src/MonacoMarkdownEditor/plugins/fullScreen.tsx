import React from 'react';
import Icon from '../components/Icon';
import { MonacoMarkdownEditorConText } from '../context';
import i18n from '../i18n';

export const FullScreen = () => {
  // const pluginName = "full-screen";

  const { isFullScreen, editorConfig, changeIsFullScreen } =
    MonacoMarkdownEditorConText.useContainer();

  const handleClick = () => {
    changeIsFullScreen(!isFullScreen);
  };

  if (editorConfig?.canView && editorConfig?.canView?.fullScreen) {
    return (
      <span
        className="button button-type-fullscreen"
        title={i18n.get(isFullScreen ? 'btnExitFullScreen' : 'btnFullScreen')}
        onClick={handleClick}
      >
        <Icon type={isFullScreen ? 'fullscreen-exit' : 'fullscreen'} />
      </span>
    );
  } else {
    return null;
  }
};
