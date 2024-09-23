import * as React from 'react';
import './table.less';

interface TableListProps {
  maxRow?: number;
  maxCol?: number;
  visiblity: boolean;
  onSetTable?: (table: { row: number; col: number }) => void;
}

const TableList: React.FC<TableListProps> = (props) => {
  const config = {
    padding: 3,
    width: 20,
    height: 20,
  };

  const formatTableModel = (maxRow = 0, maxCol = 0) => {
    const result = new Array(maxRow).fill(undefined);
    return result.map(() => {
      return new Array(maxCol).fill(0);
    });
  };

  const [list, changeList] = React.useState(formatTableModel(5, 6));
  const [maxRow, changeMaxRow] = React.useState<number>(5);
  const [maxCol, changeMaxCol] = React.useState<number>(6);

  const calcWrapStyle = () => {
    const { width, height, padding } = config;
    const wrapWidth = (width + padding) * maxCol - padding;
    const wrapHeight = (height + padding) * maxRow - padding;
    return {
      width: `${wrapWidth}px`,
      height: `${wrapHeight}px`,
    };
  };

  React.useEffect(() => {
    if (props?.maxCol) {
      changeMaxCol(props?.maxCol);
    }
    if (props?.maxRow) {
      changeMaxRow(props?.maxRow);
    }
    changeList(formatTableModel(props?.maxRow || 5, props?.maxCol || 6));
  }, [props?.maxCol, props?.maxRow]);

  const calcItemStyle = (row = 0, col = 0) => {
    const { width, height, padding } = config;
    const top = (height + padding) * row;
    const left = (width + padding) * col;
    return {
      top: `${top}px`,
      left: `${left}px`,
    };
  };

  const getList = (i: number, j: number) => {
    return list.map((v, row) => {
      return v.map((_, col) => {
        return row <= i && col <= j ? 1 : 0;
      });
    });
  };

  const handleHover = (i: number, j: number) => {
    changeList(getList(i, j));
  };

  const handleSetTable = (i: number, j: number) => {
    const { onSetTable } = props;
    if (typeof onSetTable === 'function') {
      onSetTable({
        row: i + 1,
        col: j + 1,
      });
    }
  };

  return (
    <ul className="table-list wrap" style={calcWrapStyle()}>
      {list.map((row, i) => {
        return row.map((col, j) => {
          return (
            <li
              className={`list-item ${col === 1 ? 'active' : ''}`}
              key={`${i}-${j}`}
              style={calcItemStyle(i, j)}
              onMouseOver={() => handleHover(i, j)}
              onClick={() => handleSetTable(i, j)}
            />
          );
        });
      })}
    </ul>
  );
};
export default TableList;
