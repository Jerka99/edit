import React, { useState } from 'react'
import { useContextComp } from './MyContext';
import DonationsTable from './DonationsTable';

const Donacije = () => {

    const {authUser} = useContextComp().auth;
    const {postInBase, deleteFromBase} = useContextComp().base;
    const {donations} = useContextComp().donations;
    const [donationState, setDonationState] = useState({tip:"", vrijednost:"", opis:"", kategorija:""})
    const [block, toggleBlock] = useState(false)

    console.log(donations)

    const tip =["hrana", "lijekovi", "igračke", "vet. troškovi"]
      
      
     

console.log(tip)


  const donateForm = (e) =>{
    const {name, value} = e.target
    setDonationState(prev=>({...prev, [name]:value, "kategorija":authUser.displayName == "admin" ? "trazimo" : "nudi se"}))
  }

  const sendInBase = (e) =>{
    e.preventDefault();
    if(donationState.vrijednost > 1){
      postInBase(donationState, "donationsCollectionReef")
    }

  }

  console.log(donationState)

  return (
    <div id='donacije'>
      <div>
      <button onClick={()=>toggleBlock(prev=>!prev)}>Nova donacija</button>
      {block && <form onSubmit={sendInBase}>
      <h4>{authUser.displayName == "admin" ? "Tražimo" : "Nudi se"}</h4>
      <label>Tip <select required name='tip' onChange={donateForm}><option value="">Izaberi</option>
        {tip.map((element)=>{return<option key={element} value={element}>{element}</option>})}</select> </label>
      <label>Iznos<input name="vrijednost" value={donationState.vrijednost} onChange={donateForm} required type="number" min={1} /></label>
      <label>Opis<input name="opis" value={donationState.opis} onChange={donateForm} type="text" /></label>
      <button type='submit'>Pošalji</button>
      </form>
      }
      </div>

      <DonationsTable donations={donations} kategorija={"trazimo"}/>
      <DonationsTable donations={donations} kategorija={"nudi se"}/>
      <DonationsTable donations={donations} kategorija={"donirano"}/>

     
    </div>
  )
}

export default Donacije
