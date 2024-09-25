import { repeat } from './tool';

export interface SelectionType {
  start?: number;
  end?: number;
  line?: number;
}

export interface Decorated {
  text: string;
  selection?: SelectionType;
}

// 最简单的Decorator，即在现有文字的基础上加上前缀、后缀即可
const SIMPLE_DECORATOR: { [x: string]: [string, string] } = {
  bold: ['**', '**'],
  italic: ['*', '*'],
  underline: ['__', '__'],
  strikethrough: ['~~', '~~'],
  quote: ['\n> ', '\n'],
  inlinecode: ['`', '`'],
  code: ['\n```\n', '\n```\n'],
};
// 插入H1-H6
for (let i = 1; i <= 6; i++) {
  SIMPLE_DECORATOR[`h${i}`] = [`\n${repeat('#', i)} `, '\n'];
}

const lineCheck: {
  [x: string]: {
    line: number;
  };
} = {
  quote: {
    line: 1,
  },
  unordered: {
    line: 1,
  },
  order: {
    line: 1,
  },
  hr: {
    line: 2,
  },
  code: {
    line: 1,
  },
  table: {
    line: 1,
  },
};

function decorateTableText(option: any) {
  const { row = 2, col = 2 } = option;
  const rowHeader = ['|'];
  const rowData = ['|'];
  const rowDivision = ['|'];
  let colStr = '';
  for (let i = 1; i <= col; i++) {
    rowHeader.push(' Head |');
    rowDivision.push(' --- |');
    rowData.push(' Data |');
  }
  for (let j = 1; j <= row; j++) {
    colStr += '\n' + rowData.join('');
  }
  return `\n${rowHeader.join('')}\n${rowDivision.join('')}${colStr}\n`;
}

function decorateList(type: 'order' | 'unordered', target: string) {
  let text = target;
  if (text.indexOf('\n') !== 0) {
    text = '\n' + text;
  }
  if (type === 'unordered') {
    return text.replace(/\n/g, '\n- ');
  } else {
    let count = 1;
    return text.replace(/\n/g, () => {
      return `\n${count++}. `;
    });
  }
}

/**
 * 获取装饰后的Markdown文本
 * @param target 原文字
 * @param type 装饰类型
 * @param option 附加参数
 * @returns {Decorated}
 */
function getDecorated(target: string, type: string, option?: any): Decorated {
  if (typeof SIMPLE_DECORATOR[type] !== 'undefined') {
    return {
      text: `${SIMPLE_DECORATOR[type][0]}${target}${SIMPLE_DECORATOR[type][1]}`,
      selection: {
        start: SIMPLE_DECORATOR[type][0].length,
        end: SIMPLE_DECORATOR[type][0].length + target.length,
        line: lineCheck[type]?.line || 0,
      },
    };
  }
  switch (type) {
    case 'unordered':
      return {
        text: decorateList('unordered', target),
        selection: {
          line: lineCheck[type]?.line || 0,
        },
      };
    case 'order':
      return {
        text: decorateList('order', target),
        selection: {
          line: lineCheck[type]?.line || 0,
        },
      };
    case 'hr':
      return {
        text: '\n---\n',
        selection: {
          line: lineCheck[type]?.line || 0,
        },
      };
    case 'table':
      return {
        text: decorateTableText(option),
        selection: {
          line: lineCheck[type]?.line || 0,
        },
      };
    case 'image':
      return {
        text: `![${target || option.target}](${option.imageUrl || ''})`,
        selection: {
          start: 2,
          end: target.length + 2,
        },
      };
    case 'link':
      return {
        text: `[${target}](${option.linkUrl || ''})`,
        selection: {
          start: 1,
          end: target.length + 1,
        },
      };
  }
  return {
    text: target,
    selection: {
      start: 0,
      end: target.length,
    },
  };
}

export default getDecorated;
