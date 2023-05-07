import React from 'react'

const DonationsTable = ({donations, kategorija}) => {
  return (
    <div>
        <h3>{kategorija}</h3>
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
          </tr>
          </tbody>
        </table>
      })}
    </div>
  )
}

export default DonationsTable
