import React, { useState } from 'react'

const PrikazPopisa = ({vrsta, ime, slika, toggleFunction, index}) => {



  return (
        <div className='element-popisa' onClick={(e)=>{toggleFunction(index)}}>
        <img src={slika} alt="" />
        <p>{vrsta} {ime}</p>

        
      </div>
    
  )
}

export default PrikazPopisa
