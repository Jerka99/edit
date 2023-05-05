import { useState } from "react";
import { useContextComp } from "../MyContext";
import PrikazPopisa from "./PrikazPopisa";
import PrikazJednogBloka from "./PrikazJednogBloka";
import PrikazJednogBlokaAdmin from "./PrikazJednogBlokaAdmin";
import Filter from "./Filter";

const Popis = () => {
  const { animalsList } = useContextComp().base;
  const [toggleAnimalInfo, setToggleAnimalInfo] = useState(false);
  const [newIndex, setNewIndex] = useState(0);
  const [change, setChange] = useState(false)
  const [filter, setFilter] = useState({"vrsta":"", "udomljen":"", "text":""})

  var regexPattern = new RegExp("true");

  const toggleFunction = (x) => {
    indexChanger(x);
    setToggleAnimalInfo((prev) => !prev);
  };

  const indexChanger = (x) => {
    if (x < 0) {
      setNewIndex(filteredArray(animalsList).length - 1);
    } else if (x > filteredArray(animalsList).length - 1) {
      setNewIndex(0);
    } else {
      setNewIndex(x);
    }
  };

  const filterFun = (e) =>{
    const {name, value} = e.target;
    setFilter(prev=>({...prev, [name]:value}))
  }

  const filteredArray = (arr) =>{
    const newArr = arr.filter((animal)=>{return filter.vrsta ? filter.vrsta == animal.vrsta : true })
    .filter((animal)=>{return filter.udomljen !== "" ? regexPattern.test(filter.udomljen) == animal.udomljen : true})
    .filter((el)=>{return el.ime.toLowerCase().includes(filter.text.toLowerCase().trim())})
    return newArr
  }


  return (
    <div>
      <h2 className="title">Popis životinja</h2>
      <div id="filtri">
      <label><h3>Tražilica</h3><input type="text" name="text" value={filter.text} onChange={filterFun} /></label>
      <div id="filters-holder">
      <Filter animalsList={animalsList} info={"vrsta"} filterFun={filterFun} filter={filter}/>
      <Filter animalsList={animalsList} info={"udomljen"} filterFun={filterFun} filter={filter}/>
      </div>
      </div>
      <div className="popis">
        {filteredArray(animalsList).map((animal, index) => {
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
      {filteredArray(animalsList).map((animal, index) => {
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
                cip={animal.cip}
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
