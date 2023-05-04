import { useContextComp } from "../MyContext";
import Unos from "../Unos";

const PrikazJednogBlokaAdmin = ({ children, setChange, change, setToggleAnimalInfo, toggleAnimalInfo, indexChanger, newIndex, vrsta, ime, slika, godine, udomljen, cip, opis, pregled, id}) => {

    const {authUser} = useContextComp().auth;

    if(authUser.displayName !== "admin" || !change){
        return children
    }

    console.log("vrsta",vrsta)
  return (
    <div className={`prikaz-zivotinje ${toggleAnimalInfo ? "active" : ""}`}>
        <div id='staticblock'>
    <button onClick={()=>indexChanger(newIndex-1)} id='left-arrow'></button>
    <div id='zivotinja'>
      <button id='close' onClick={()=>setToggleAnimalInfo(false)}>X</button>
      <Unos prop={"put"}
       setChange={setChange}
       vrsta={vrsta}
       slika={slika}
       ime={ime}
       godine={godine}
       udomljen={udomljen}
       opis={opis}
       cip={cip}
       pregled={pregled}
       id={id}/>
      </div>
      <button onClick={()=>indexChanger(newIndex+1)} id='right-arrow' ></button>
      </div>
    </div>
  )
}

export default PrikazJednogBlokaAdmin
