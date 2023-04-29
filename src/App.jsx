import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>Uvod u git</h1>
      <p>Praćenje promjena u repozitoriju</p>
    </div>
  )
}
export default App
