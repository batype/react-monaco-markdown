import * as React from 'react';
import './index.css';

interface ToolBarProps {
  style?: React.CSSProperties;
  children: any;
}

export default function ToolBar(props: ToolBarProps) {
  return (
    <div className="tool-bar" style={props.style}>
      {props.children}
    </div>
  );
}
