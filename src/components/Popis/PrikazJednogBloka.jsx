import React from 'react'
import { useContextComp } from '../MyContext';


const PrikazJednogBloka = ({vrsta, ime, slika, godine, udomljen, cip, opis, setToggleAnimalInfo, toggleAnimalInfo, indexChanger, newIndex }) => {

    const {authUser} = useContextComp();

    
  return (
    <div className={`prikaz-zivotinje ${toggleAnimalInfo ? "active" : ""}`}>
    <button onClick={()=>indexChanger(newIndex-1)} id='left-arrow'></button>
    <div id='zivotinja'>
      <button id='close' onClick={()=>setToggleAnimalInfo(false)}>X</button>
  
  <img src={slika} alt="" />
  <div>
  <p>Vrsta: {vrsta}</p>
  <p>Ime: {ime}</p>
  <p>Godine: {godine}</p>
  <p>{cip ? "Ćipiran" :"Nije Ćipiran"}</p>
  <p>Status: {udomljen ? "Udomljen" : "Nije udomljen"}</p>
  <p>Opis:{opis}</p>
  </div>
  <div>
      {authUser.displayName == "admin" && <button>Uredi</button>}
      <button>Udomi</button>
    </div>
    </div>
    
    <button onClick={()=>indexChanger(newIndex+1)} id='right-arrow' ></button>
  </div>
  )
}

export default PrikazJednogBloka
