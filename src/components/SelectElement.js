import React from 'react';
import { observer } from 'mobx-react';

function SelectElementComponent({
  start, size, register, append, ...rest
}) {
  return (
    <select ref={register} {...rest}>
      {append && (
        <option value="0" disabled>
          {append}
        </option> // eslint-disable-line
      )}
      {Array.from({ length: size }).map((el, i) => (
        <option key={i} value={i + start}>
          {i + start}
        </option>
      ))}
    </select>
  );
}

export const SelectElement = observer(SelectElementComponent);
