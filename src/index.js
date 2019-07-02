import React from 'react';
import ReactDOM from 'react-dom';

function HelloWorld() {
  return (
    <div>
      <h1>Hello world!</h1>
    </div>
  );
}

ReactDOM.render(<HelloWorld />, document.getElementById('root'));
