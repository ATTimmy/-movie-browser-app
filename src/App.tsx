import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Hello world!</h1>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={() => setCount(count + 1)} disabled>
        Increment 2
      </button>
    </div>
  );
}
