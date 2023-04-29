import { useContextFun } from './MyContext'

const Child = () => {
    const {count, setCount} = useContextFun()

    return (
    <div>
       <p>{count}</p> 
       <p>Child</p>
      <button onClick={()=>setCount(prev => prev + 1)}>btn</button>
    </div>
  )
}

export default Child
