
const PrikazPopisa = ({vrsta, ime, slika, toggleFunction, index}) => {



  return (
        <div className='element-popisa' onClick={(e)=>{toggleFunction(index)}}>
        <img src={slika || vrsta} onError={({currentTarget})=>{
        currentTarget.onerror = null;
        currentTarget.src=`${vrsta}.jpg`
      }} alt="" />
        <p>{vrsta} {ime}</p>

        
      </div>
    
  )
}

export default PrikazPopisa
