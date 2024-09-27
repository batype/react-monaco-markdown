/**
 * @author shaosong
 * @description
 */
import React, { useState } from 'react';
import MonacoMarkdownEditor from '../src/index';

export class MrakdownProps {}

const MrakdownDark: React.FC<MrakdownProps> = () => {
  const [value, changeValue] = useState<string | undefined>('');
  return React.useMemo(
    () => (
      <div>
        <MonacoMarkdownEditor
          config={{
            view: {
              menu: true,
            },
            theme: 'vs-dark',
            table: {
              maxCol: 4,
              maxRow: 5,
            },
          }}
          value={value}
          onChange={(pre) => {
            changeValue(pre?.text);
            console.log(pre?.text);
          }}
        />
      </div>
    ),
    [],
  );
};

export default MrakdownDark;
