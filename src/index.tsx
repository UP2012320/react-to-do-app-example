import React, {useRef, useState} from 'react';
import ReactDom from 'react-dom';

interface ListItemProps {
  value: string
}

export function ListItem(props: ListItemProps) {
  return (
    <li>{props.value}</li>
  );
}

export default function App() {
  const [list, setList] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = () => {
    if (inputRef.current) {
      setList((prevState) => [...prevState, inputRef.current?.value ?? '']);
    }
  };

  return (
    <>
      <h1>To-Do List</h1>
      <ul>
        {list.map((value, index) => (
          <ListItem key={index} value={value}/>
        ))}
      </ul>
      <input ref={inputRef} placeholder='Enter a new item'/>
      <button onClick={() => onSubmit()}>Submit</button>
    </>
  );
}

ReactDom.render(<App />, document.getElementById('root'));
