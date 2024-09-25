import clsx from 'clsx';
import React, { CSSProperties, MouseEventHandler } from 'react';
import './iconfont.css';

type NextIconType = {
  type: string;
  size?: number;
  color?: string;
  disable?: boolean;
  className?: string;
  spin?: boolean;
  onClick?: MouseEventHandler<HTMLElement> | undefined;
  title?: string;
};

const NextIcon = ({
  type,
  size,
  color,
  disable,
  className,
  onClick,
  title,
}: NextIconType) => {
  // 直接基于传入的属性计算样式
  const calculatedStyle: CSSProperties = {
    fontSize: size || 12,
    color: disable ? 'rgba(0, 0, 0, 0.25)' : color,
  };

  return (
    <i
      title={title}
      onClick={onClick}
      className={clsx('iconfont', 'nb-icon-' + type, {
        [className || '']: !!className,
      })}
      style={calculatedStyle}
    ></i>
  );
};

export default NextIcon;
