// HeaderList
import "./HeaderList.less";

interface HeaderListProps {
  onSelectHeader?: (header: number) => void;
}

const HeaderList = (props: HeaderListProps) => {
  const handleHeader = (header: number) => {
    const { onSelectHeader } = props;
    if (typeof onSelectHeader === "function") {
      onSelectHeader(header);
    }
  };

  return (
    <ul className='header-list'>
      <li className='list-item'>
        <h1 onClick={() => handleHeader(1)}>H1</h1>
      </li>
      <li className='list-item'>
        <h2 onClick={() => handleHeader(2)}>H2</h2>
      </li>
      <li className='list-item'>
        <h3 onClick={() => handleHeader(3)}>H3</h3>
      </li>
      <li className='list-item'>
        <h4 onClick={() => handleHeader(4)}>H4</h4>
      </li>
      <li className='list-item'>
        <h5 onClick={() => handleHeader(5)}>H5</h5>
      </li>
      <li className='list-item'>
        <h6 onClick={() => handleHeader(6)}>H6</h6>
      </li>
    </ul>
  );
};
export default HeaderList;
