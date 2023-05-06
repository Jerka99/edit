const Filter = ({ animalsList, info, filterFun, filter }) => {
  //prikaz samo onoga što postoji ako su svi udomljeni false filtra nece biti
  return (
    <div id="filter">
      <h3>
        {info.substring(0, 1).toUpperCase() + info.substring(1).toLowerCase()}
      </h3>
      <label>
        Svi
        <input
          type="radio"
          name={info}
          value={""}
          onChange={filterFun}
          checked={filter[info] == ""}
        />
      </label>
      {Object.keys(
        animalsList
          .map((animal) => {
            return animal[info];
          })
          .reduce((a, v) => ({ ...a, [v]: v }), {})
      ).map((el) => (
        <label key={el}>
          {el}
          <input
            type="radio"
            name={info}
            value={el}
            onChange={filterFun}
            checked={filter[info] == el}
          />
        </label>
      ))}
    </div>
  );
};

export default Filter;
