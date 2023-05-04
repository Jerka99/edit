import { useState } from "react";
import { useContextComp } from "../MyContext";
import PrikazPopisa from "./PrikazPopisa";
import PrikazJednogBloka from "./PrikazJednogBloka";
import PrikazJednogBlokaAdmin from "./PrikazJednogBlokaAdmin";

const Popis = () => {
  const { animalsList } = useContextComp().base;
  const [toggleAnimalInfo, setToggleAnimalInfo] = useState(false);
  const [newIndex, setNewIndex] = useState(0);
  const [change, setChange] = useState(false)

  const toggleFunction = (x) => {
    indexChanger(x);
    setToggleAnimalInfo((prev) => !prev);
  };

  const indexChanger = (x) => {
    if (x < 0) {
      setNewIndex(animalsList.length - 1);
    } else if (x > animalsList.length - 1) {
      setNewIndex(0);
    } else {
      setNewIndex(x);
    }
  };

  return (
    <div>
      <h2 className="title">Popis životinja</h2>
      <div className="popis">
        {animalsList.map((animal, index) => {
          return (
            <PrikazPopisa
              index={index}
              key={animal.id}
              vrsta={animal.vrsta}
              slika={animal.slika}
              ime={animal.ime}
              toggleFunction={toggleFunction}
            />
          );
        })}
      </div>
      {animalsList.map((animal, index) => {
        if (newIndex == index) {
          return (
            <PrikazJednogBlokaAdmin
              setChange={setChange}
              change={change}
              vrsta={animal.vrsta}
              slika={animal.slika}
              ime={animal.ime}
              godine={animal.godine}
              udomljen={animal.udomljen}
              opis={animal.opis}
              cip={animal.cip}
              pregled={animal.pregled}
              key={animal.id}
              id={animal.id}
              setToggleAnimalInfo={setToggleAnimalInfo}
              toggleAnimalInfo={toggleAnimalInfo}
              indexChanger={indexChanger}
              newIndex={newIndex}
            >
              <PrikazJednogBloka
                id={animal.id}
                setChange={setChange}
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
              />
            </PrikazJednogBlokaAdmin>
          );
        }
      })}
    </div>
  );
};

export default Popis;
