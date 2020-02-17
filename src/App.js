import React, { useState, useMemo } from 'react';
import { Switch } from 'antd'
import 'antd/dist/antd.css'
import { getDefaultNormalizer } from '@testing-library/react';

function App() {
  const [length, setLength] = useState(3)
  const [name, setName] = useState('John Doe')
  const [memo, setMemo] = useState(false)

  return (
    <>
      <div style={{ display: 'flex'}}>
        <Switch onChange={() => setMemo(!memo)}/>
        <p style={{ marginLeft: '1rem' }}>useMemo</p>
      </div>
      <div>
        <input 
          value={name} 
          onChange={e => setName(e.target.value)}
        />
        {memo
          ? <MemoHook.NameDisplay name={name} />
          : <NormalState.NameDisplay name={name} />
        }
        <input 
          value={length} 
          onChange={e => setLength(e.target.value)}
        />
        {memo
          ? <MemoHook.FibDisplay length={length} />
          : <NormalState.FibDisplay length={length} />
        }
      </div>
      <p style={{ color: 'red' }}>HINT: See it how to render, just open dev console.</p>
    </>
  );
}

const MemoHook = {
  NameDisplay: React.memo(function ({ name }) {
    console.log('Rerendering name...')
    return <p>Your name is {name}</p>
  }),
  FibDisplay({ length }) {
    const numbers = useMemo(() => {
      console.log('Calculating numbers & rerendering...')
      const result = [1, 1]
      for (let i = 2; i < length; i++) {
        result[i] = result[i - 1] + result[i - 2]
      }
      return result
    }, [length])
    return <p>{length} numbers of the fibonacci sequence: {numbers.join(', ')}</p>
  }
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
