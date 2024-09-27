/**
 * @author shaosong
 * @description
 */
import clsx from 'clsx';
import React, { useState } from 'react';
import NextIcon from '../NextIcon';

export class CopyButtonProps {
  code = '' as string;
  className?: string;
}

const CopyButton: React.FC<CopyButtonProps> = (props) => {
  const [isSave, changeIsSave] = useState(false);

  const copyTextToClipboard = async () => {
    try {
      await navigator?.clipboard?.writeText(props?.code);
      console.log('文本已复制到剪贴板');
      changeIsSave(true);
      const time = setTimeout(() => {
        changeIsSave(false);
        clearTimeout(time);
      }, 2000);
    } catch (err) {
      console.error('复制操作失败:', err);
    }
  };

  return React.useMemo(
    () =>
      isSave ? (
        <span
          className={props?.className}
          style={{ color: '#52c41a', fontSize: 12 }}
        >
          <NextIcon type="check" size={12} color="#52c41a" /> 复制成功
        </span>
      ) : (
        <span
          className={clsx('button', props?.className)}
          onClick={copyTextToClipboard}
        >
          <NextIcon type="copy" size={16} />
        </span>
      ),
    [props?.code, isSave],
  );
};

export default CopyButton;
