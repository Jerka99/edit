import React from 'react'
import { useContextComp } from './MyContext';
import capitalize from './capitalize';

const DonationsTable = ({donations, kategorija}) => {

  const {authUser} = useContextComp().auth;
  const {postInBase, deleteFromBase, changeInfo} = useContextComp().base;



  return (
    <div id='tables'>
        <h3>{capitalize(kategorija)}</h3>
       {donations.map((donation)=>{
        if(donation.kategorija == kategorija)
        return <table key={donation.id}>
          <thead>
          <tr>
            <th>Tip</th>
            <th>Vrijednost</th>
            <th>Opis</th>
          </tr>
          </thead>
          <tbody>
          <tr>
          <td>{donation.tip}</td>
          <td>{donation.vrijednost}</td>
          <td>{donation.opis}</td>
          {(authUser.email == "admin@gmail.com" && kategorija == "trazimo") && <td><button onClick={()=>deleteFromBase(donation.id, "donations")}>Izbriši</button></td>}
          {(authUser.email == "admin@gmail.com" && kategorija == "trazimo") && <td><button onClick={()=>changeInfo(donation.id,{kategorija:"donirano"},"donations")}>Donirano</button></td>}
          {(authUser.email !== "admin@gmail.com" && kategorija == "trazimo") && <td><button onClick={()=>{ authUser ? changeInfo(donation.id,{kategorija:"donirano"},"donations") : alert("Niste prijavljeni!")}}>Doniraj</button></td>}
          {(authUser.email == "admin@gmail.com" && kategorija == "nudi se") && <td><button onClick={()=>changeInfo(donation.id,{kategorija:"donirano"},"donations")}>Prihvati</button></td>}
          {(authUser.email == "admin@gmail.com" && kategorija == "donirano") && <td><button onClick={()=>postInBase({tip:donation.tip, vrijednost:donation.vrijednost, opis:donation.opis, kategorija:"trazimo"}, "donationsCollectionRef")}>Ponovi</button></td>}
          {(authUser.email == "admin@gmail.com" && kategorija == "donirano") && <td><button onClick={()=>deleteFromBase(donation.id, "donations")}>Izbriši</button></td>}


          </tr>
          </tbody>
        </table>
      })}
    </div>
  )
}

export default DonationsTable
