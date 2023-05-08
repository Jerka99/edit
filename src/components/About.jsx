import { useState } from "react";
import { useContextComp } from "./MyContext";

const About = () => {

  const { authUser} = useContextComp().auth
  const {postInBase} = useContextComp().base;

  const [kontakt, setKontakt] = useState({email:"", poruka:""})

  const contactFun = (e) =>{
    const {name, value} = e.target
    setKontakt(prev=>({...prev,[name]:value}))
  }

  console.log(kontakt)

  const handleSubmit = (e) =>{
    e.preventDefault()
    postInBase(kontakt, "contactCollectionRef")
    setKontakt({email:"",poruka:""})
  }

  return (
    <div id='about'>
       <h1>About</h1>
       <img src="building.jpg" alt="" />
       <div id='lorem1'>
        <h3>Lorem Ipsum</h3>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus iste magni eum! Quae ipsam corrupti excepturi possimus quis
           quia at eaque soluta exercitationem, et maxime incidunt in eligendi iste necessitatibus.</p>
       </div>

      <div id='location'>
      <h3>Gdje se nalazimo</h3>
      <a href="https://goo.gl/maps/wK2xKyCKhZFtucpr8" target='_blank'><img src="location.png"/></a>
      <a href="https://goo.gl/maps/wK2xKyCKhZFtucpr8" target='_blank'>Prikaži na mapi</a>
      </div>

      <div id='form'>
      <h3>Kontakt</h3>

      <form onSubmit={handleSubmit}>
        <label>Email</label><input type="text" name="email" value={kontakt.email} onChange={contactFun}/>
        <label>Poruka</label><textarea required type="text" name="poruka" value={kontakt.poruka} onChange={contactFun}/>

        <button type='submit'>Pošalji</button>
      </form>
      </div>

      <footer>
          <h2>Azil Za Životinje</h2>
        <div>
        <div>
        <p>Lorem</p>
        <p>Lorem ipsum</p>
        <p>Lorem dolor</p>
        <p>Lorem amet</p>
        <p>Lorem</p>
        <p>Lorem</p>
        </div>
        <div>
        <p>Lorem consectetur</p>
        <p>Lorem</p>
        <p>Lorem</p>
        </div>
        </div>
      </footer>

    </div>
  )
}

export default About
