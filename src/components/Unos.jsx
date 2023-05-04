import { useState } from "react"
import { useContextComp } from "./MyContext"

const Unos = ({setChange, prop, vrsta, ime, slika, godine, cip, opis, pregled, udomljen, id}) => {
const {PostInBase, deleteAnimal, changeAnimalInfo} = useContextComp().base;
const [UnosState, setUnosState] = useState({ime:ime ?? "", vrsta:vrsta ?? "", cip:cip ?? "" ,slika:slika ?? "", pregled:pregled ?? "", godine:godine ?? "", opis:opis ?? "", udomljen:udomljen ?? ""})

const unosFun = (e) =>{
const {name, value} = e.target
setUnosState(prev=>({...prev,[name]:value}))

if(e.target.name == "cip" || e.target.name == "udomljen"){
setUnosState(prev=>({...prev,[e.target.name]:!UnosState[e.target.name]}))
}
}

const handleSubmit = (e) =>{
  e.preventDefault();
  if(prop == "post"){
  PostInBase(UnosState)
  }
  else {
  changeAnimalInfo(id,{...UnosState})
}
setUnosState({ime:"", vrsta:"", cip:"" ,slika:"", pregled:"", godine:"", opis:"", udomljen:false})

}
  return (
    <div id={prop}>
      {prop == "post" && <h2 className='title'>Unos</h2> }
      <form onSubmit={handleSubmit} id='unos' >
        { prop == "put" && <img src={UnosState.slika || `${UnosState.vrsta}.jpg`}  onError={({currentTarget})=>{
        currentTarget.onerror = null;
        currentTarget.src=`${vrsta}.jpg`
      }} alt="" />}
        <label >Ime<input required={prop == "post" ? true : false} value={UnosState.ime } onChange={unosFun} type="text" name="ime"/></label>

        <label >Vrsta 
        <div>
          <label >Pas
        <input required={prop == "post" ? true : false} onChange={unosFun} value={"pas"} checked={"pas" == UnosState.vrsta} type="radio" name="vrsta"/></label>
        <label>Mačka
        <input required={prop == "post" ? true : false} onChange={unosFun} value={"macka"} checked={"macka" == UnosState.vrsta} type="radio" name="vrsta"/></label>
        <label >Papiga
        <input required={prop == "post" ? true : false} onChange={unosFun} value={"papiga"} checked={"papiga" == UnosState.vrsta} type="radio" name="vrsta"/></label>
        </div>
        </label>

        <label >Čipiran<input onChange={unosFun} value={UnosState.cip} checked={UnosState.cip} type="checkbox" name='cip' /></label>

        <label >Pregled:<input onChange={unosFun} value={UnosState.pregled} type="date" name='pregled' /></label>

        <label >Godine<input required={prop == "post" ? true : false} min={0} onChange={unosFun} value={UnosState.godine} type="number" name="godine"/></label>

        <label >Opis<textarea onChange={unosFun} value={UnosState.opis} name="opis" id="" cols="30" rows="10"></textarea></label>

        <label >Slika:<input placeholder="URL" onChange={unosFun} value={UnosState.slika} type="text" name='slika' /></label>
        
        {prop == "put" &&<label >Udomljen<input onChange={unosFun} value={UnosState.udomljen} checked={UnosState.udomljen} type="checkbox" name='udomljen' /></label>}

        <button type='submit'>Spremi</button>
        {prop == "put" && <button id="delete-animal" onClick={()=>deleteAnimal(id)}>Izbriši</button>}
        {prop == "put" &&<button id="change-animal-info-button" onClick={()=>setChange(prev=>!prev)}>Provjera</button>}

      </form>
    </div>
  )
}

export default Unos
