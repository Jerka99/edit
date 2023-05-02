import React, { useState } from "react";
import { useBaseContextComp } from "../MyContext";
import PrikazPopisa from "./PrikazPopisa";
import PrikazJednogBloka from "./PrikazJednogBloka";
import PrikazJednogBlokaAdmin from "./PrikazJednogBlokaAdmin";

const Popis = () => {
  const { animalsList } = useBaseContextComp();
  const [toggleAnimalInfo, setToggleAnimalInfo] = useState(false)
  const [newIndex, setNewIndex] = useState(0)


  const toggleFunction = (x) =>{
    indexChanger(x)
    setToggleAnimalInfo(prev=>!prev)
  }
  
  const indexChanger = (x) =>{

    if(x<0){
      setNewIndex(animalsList.length-1)
    }
    else if(x>animalsList.length-1){
      setNewIndex(0)
    }
    else{
      setNewIndex(x)
    }

  }


  return (
    <div>
      <h2 className="title">Popis životinja</h2>
      <div className="popis">
        {animalsList.map((animal, index) => {
          return <PrikazPopisa
            index={index}
            key={animal.id}
            vrsta={animal.vrsta}
            slika={animal.slika}
            ime={animal.ime}
            toggleFunction={toggleFunction}
          />;
        })}
      </div>
      <div>
      {animalsList.map((animal, index) => {
      if(newIndex == index){
          return <PrikazJednogBlokaAdmin><PrikazJednogBloka
            key={animal.id}
            vrsta={animal.vrsta}
            slika={animal.slika}
            ime={animal.ime}
            godine={animal.godine}
            udomljen={animal.udomljen}
            opis={animal.opis}
            setToggleAnimalInfo={setToggleAnimalInfo}
            toggleAnimalInfo={toggleAnimalInfo}
            indexChanger={indexChanger}
            newIndex={newIndex}
          /></PrikazJednogBlokaAdmin>}
        })}
      </div>
    </div>
  );
};

export default Popis;
