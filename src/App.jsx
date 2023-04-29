import { useState } from 'react'
import Child from './components/Child'
import MyContextFun from './components/MyContext'
 import './App.css'


function App() {


  return (
    <div className="App">
      <h1>prvi</h1>
      <MyContextFun>
      <Child />
      </MyContextFun>
    </div>
  )
}
export default App
