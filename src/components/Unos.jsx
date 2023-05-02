import { useState } from "react"
import { useBaseContextComp } from "./MyContext"

const Unos = () => {

const {PostInBase} = useBaseContextComp();
const [UnosState, setUnosState] = useState({ime:"", vrsta:"", cip:"",slika:"", pregled:"", godine:"", opis:"", udomljen:false})

const unosFun = (e) =>{
const {name, value} = e.target
setUnosState(prev=>({...prev,[name]:value}))
}

const handleSubmit = (e) =>{
  e.preventDefault();
  PostInBase(UnosState)
}
  return (
    <div>
      <h2 className='title'>Unos</h2> 
      <form onSubmit={handleSubmit} id='unos' >
        <label >Ime<input required onChange={unosFun} type="text" name="ime"/></label>

        <label >Vrsta<input required onChange={unosFun} type="radio" name="vrsta"/></label>

        <label >Čipiran<input onChange={unosFun} type="checkbox" name='cip' /></label>

        <label >Pregled:<input onChange={unosFun} type="date" name='pregled' /></label>

        <label >Godine<input required min={0} onChange={unosFun} type="number" name="godine"/></label>

        <label >Opis<textarea onChange={unosFun} name="opis" id="" cols="30" rows="10"></textarea></label>

        <label >Slika:<input placeholder="URL" onChange={unosFun} type="text" name='slika' /></label>

        <button type='submit'>Spremi</button>

      </form>
    </div>
  )
}

export default Unos
