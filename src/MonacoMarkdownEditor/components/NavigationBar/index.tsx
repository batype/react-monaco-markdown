import clsx from 'clsx';
import * as React from 'react';
import { MonacoMarkdownEditorConText } from '../../context';
import './index.css';

interface NavigationBarProps {
  left?: React.ReactElement[];
  right?: React.ReactNode;
  visible: boolean;
}

export default function NavigationBar(props: NavigationBarProps) {
  const { editorConfig } = MonacoMarkdownEditorConText.useContainer();
  return (
    <div
      className={clsx(
        'rc-md-navigation',
        props.visible ? 'visible' : 'in-visible',
        editorConfig?.theme === 'vs-dark' && 'dark',
      )}
    >
      <div className="navigation-nav left">
        <div className="button-wrap">{props.left}</div>
      </div>
      <div className="navigation-nav right">
        <div className="button-wrap">{props.right}</div>
      </div>
    </div>
  );
}
