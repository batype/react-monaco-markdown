/**
 * @author shaosong
 * @description
 */
import React, { useState } from 'react';
import MonacoMarkdownEditor from '../src/index';

export class MrakdownProps {}

const Mrakdown: React.FC<MrakdownProps> = () => {
  const [value, changeValue] = useState<string | undefined>(
    '# React Monaco markdown \n\nHello, React engineer, welcome to use React Monaco markdown!!!',
  );
  return React.useMemo(
    () => (
      <div>
        <MonacoMarkdownEditor
          config={{
            view: {
              menu: true,
            },
            theme: 'vs-light',
            table: {
              maxCol: 4,
              maxRow: 5,
            },
            linkUrl: 'https://next.batype.com',
            // onImageUpload: async (file) => {
            //   console.log('file', file);
            // },
            // onCustomImageUpload: async (_pre) => {
            //   return {
            //     url: 'https://imgage.batype.com/image/12hajsdkashd.png',
            //     text: 'ssss',
            //   };
            // },
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

export default Mrakdown;
