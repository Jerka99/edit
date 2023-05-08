import React, { useState } from 'react'
import { useContextComp } from './MyContext';
import DonationsTable from './DonationsTable';
import capitalize from './capitalize';

const Donacije = () => {

    const {authUser} = useContextComp().auth;
    const {postInBase} = useContextComp().base;
    const {donations} = useContextComp().donations;
    const [donationState, setDonationState] = useState({tip:"", vrijednost:"", opis:"", kategorija:""})
    const [block, toggleBlock] = useState(false)

    console.log(donations)

    const tip =["hrana", "lijekovi", "igračke", "vet.troškovi"]
    const kategorija = ["trazimo", "nudi se", "donirano"]
    
      
     

console.log(tip)


  const donateForm = (e) =>{
    const {name, value} = e.target
    setDonationState(prev=>({...prev, [name]:value, "kategorija":authUser.displayName == "admin" ? "trazimo" : "nudi se"}))
  }

  const sendInBase = (e) =>{
    console.log("eeee")
    e.preventDefault();
    if(donationState.vrijednost >= 1 ){
      postInBase(donationState, "donationsCollectionRef")
      setDonationState({tip:"", vrijednost:"", opis:"", kategorija:""})
    }

  }


  console.log(donationState)

  return (
    <div id='donacije'>
      <div>
      <button onClick={()=>toggleBlock(prev=>!prev)}>Nova donacija</button>
      <h4>{authUser.displayName == "admin" ? "Tražimo" : "Nudi se"}</h4>
      {block && <form onSubmit={sendInBase}>
      
      <label>Tip  <select required name='tip' value={donationState.tip} onChange={donateForm}><option value="">Izaberi</option>
        {tip.map((element)=>{return<option key={element} value={element}>{element}</option>})}</select> </label>
      <label>Iznos <input name="vrijednost" value={donationState.vrijednost} onChange={donateForm} required type="number" min={1} /></label>
      <label>Opis <input name="opis" value={donationState.opis} onChange={donateForm} type="text" /></label>
      <button type='submit'>Pošalji</button>
      </form>
      }
      </div>
      
      {kategorija.map((el)=>{console.log(el)
        return <DonationsTable key={el} donations={donations} kategorija={el} />
      })}
     
    </div>
  )
}

export default Donacije
