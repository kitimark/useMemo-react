import React, { useState } from 'react';

function App() {
  const [length, setLength] = useState(3)
  const [name, setName] = useState('John Doe')

  return (
    <>
      <h2>normal useState</h2>
      <input 
        value={name} 
        onChange={e => setName(e.target.value)}
      />
      <NormalState.NameDisplay name={name} />
      <input 
        value={length} 
        onChange={e => setLength(e.target.value)}
      />
      <NormalState.FibDisplay length={length} />
      <p style={{ color: 'red' }}>HINT: See it how to render, just open dev console.</p>
    </>
  );
}

const NormalState = {
  NameDisplay({ name }) {
    console.log('Rerendering name...')
    return <p>Your name is {name}</p>
  },
  FibDisplay({ length }) {
    console.log('Calculating numbers & rerendering...')
    const numbers = [1, 1]
    for (let i = 2; i < length; i++) {
      numbers[i] = numbers[i - 1] + numbers[i - 2]
    }
    return <p>{length} numbers of the fibonacci sequence: {numbers.join(', ')}</p>
  }
}
export default App;
