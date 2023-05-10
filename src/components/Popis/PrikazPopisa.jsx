import capitalize from "../capitalize";

const PrikazPopisa = ({vrsta, ime, slika, toggleFunction, index}) => {



  return (
        <div className='element-popisa' onClick={(e)=>{toggleFunction(index)}}>
        <img src={slika || vrsta} onError={({currentTarget})=>{
        currentTarget.onerror = null;
        currentTarget.src=`${vrsta}.jpg`
      }} alt="" />
        <b>{vrsta} {capitalize(ime)}</b>

        
      </div>
    
  )
}

export default PrikazPopisa
