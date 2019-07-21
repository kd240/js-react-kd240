import React from 'react';
import { observer } from 'mobx-react';

function SelectElementComponent({
  start,
  size,
  name,
  value,
  onChange,
  append,
  className,
}) {

  return (
    <select className={className} name={name} value={value} onChange={onChange} >
      {append && append
        .map((el, i) => (
          <option key={i}>{el}</option> // eslint-disable-line
        ))}
      {Array
        .from({ length: size })
        .map((el, i) => i + start)
        .map((el) => (
          <option key={el}>{el}</option>
        ))}
    </select>
  );
}

export const SelectElement = observer(SelectElementComponent);
