import React from 'react'
import { useContextComp } from '../MyContext';


const PrikazJednogBloka = ({id, vrsta ,setChange, ime, slika, godine, udomljen, cip, opis, setToggleAnimalInfo, toggleAnimalInfo, indexChanger, newIndex }) => {

    const {authUser} = useContextComp().auth;
    const {changeAnimalInfo} = useContextComp().base;

    
  return (
    <div className={`prikaz-zivotinje ${toggleAnimalInfo ? "active" : ""}`}>
      <div id='staticblock'>
    <button onClick={()=>indexChanger(newIndex-1)} id='left-arrow'></button>
    <div id='zivotinja'>
      <button id='close' onClick={()=>setToggleAnimalInfo(false)}>X</button>
  
  <img src={slika} onError={({currentTarget})=>{
  currentTarget.onerror = null;
  currentTarget.src=`${vrsta}.jpg`
  }} alt="" />  <div>
  <p>Vrsta: {vrsta}</p>
  <p>Ime: {ime}</p>
  <p>Godine: {godine}</p>
  <p>{cip ? "Čipiran" :"Nije Čipiran"}</p>
  <p>Status: {udomljen ? "Udomljen" : "Nije udomljen"}</p>
  <p>Opis:{opis}</p>
  </div>
  <div>
      <button disabled={udomljen ? true : false} onClick={()=>changeAnimalInfo(id, {udomljen:true})}>{udomljen ? "Udomljen" : "Udomi"}</button>
      {authUser.displayName == "admin" && <button onClick={()=>setChange(prev=>!prev)}>Uredi</button>}
    </div>
    </div>
    
    <button onClick={()=>indexChanger(newIndex+1)} id='right-arrow' ></button>
  </div>
  </div>
  )
}

export default PrikazJednogBloka
