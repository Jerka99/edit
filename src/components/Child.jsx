import { useContextComp } from './MyContext'

const Child = () => {
    const {count, setCount} = useContextComp()

    return (
    <div>
       <p>{count}</p> 
       <p>Child</p>
      <button onClick={()=>setCount(prev => prev + 1)}>btn</button>
    </div>
  )
}

export default Child
