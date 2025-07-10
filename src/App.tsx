import { useState } from 'react';
export default function App() {
  const [count, setCount] = useState(0);
  const unusedVariable = 'esto no se usa';

  console.log(nonExistentVariable);

  function increment() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Hello world!</h1>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
