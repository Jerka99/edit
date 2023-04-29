import React, { createContext, useContext, useState } from 'react'

const MyContext = createContext()

export function useContextFun(){
    return useContext(MyContext)
}


const MyContextFun = ({children}) => {

    const [count, setCount] = useState(10)

    return (
    <MyContext.Provider value={{count, setCount}}>
        {children}
    </MyContext.Provider>
      
  )
}
export default MyContextFun

