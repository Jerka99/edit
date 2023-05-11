import { useState } from "react"
import { useContextComp } from "./MyContext"
import capitalize from "./capitalize"

const Unos = ({setChange, prop, vrsta, ime, slika, godine, cip, opis, pregled, udomljen, id}) => {
const {postInBase, deleteFromBase, changeInfo} = useContextComp().base;
const [UnosState, setUnosState] = useState({ime:ime ?? "", vrsta:vrsta ?? "", cip:cip ?? "" ,slika:slika ?? "", pregled:pregled ?? "", godine:godine ?? "", opis:opis ?? "", udomljen:udomljen ?? false})

const unosFun = (e) =>{
  let {name, value} = e.target

  if(e.target.name == "cip" || e.target.name == "udomljen"){
    value = !UnosState[e.target.name]
    }
  setUnosState(prev=>({...prev,[name]:value}))
}

const handleSubmit = (e) =>{
    e.preventDefault();
    if(UnosState.godine > 0){
    if(prop == "post"){
      postInBase(UnosState, "animalsCollectionRef")
      setUnosState({ime:"", vrsta:"", cip:"" ,slika:"", pregled:"", godine:"", opis:"", udomljen:false})
      }
    else {
      changeInfo(id,{...UnosState},"animals")
      setTimeout(()=>setChange(prev=>!prev) ,200); 
      }}
    } 

    const inputs = [
      {
      id:1,
      type:"text",
      name:"ime",
      required:true,
      value:UnosState.ime,
      },
      {id:2,
        pas:{
      type:"radio",
      name:"vrsta",
      value:"pas",
      checked:"pas" == UnosState.vrsta ? true : false,       
        },
        macka:{
      type:"radio",
      name:"vrsta",
      value:"macka",
      checked:"macka" == UnosState.vrsta ? true : false,
        },
        papiga:{
      type:"radio",
      name:"vrsta",
      value:"papiga",
      checked:"papiga" == UnosState.vrsta ? true : false,
        }
      },
     {
      id:3,
      type:"checkbox",
      name:'cip',
      value:UnosState.cip,
      checked:UnosState.cip,
     },
     {
      id:4,
      type:"date",
      name:'pregled',
      value:UnosState.pregled,
     },
     {
      id:5,
      type:"number",
      name:"godine",
      value:UnosState.godine,
      required:prop == "post" ? true : false,
      min:0
     },
     {
      id:6,
      value:UnosState.opis,
      name:"opis",
      cols:"30",
      rows:"10",
      maxLength:"30"
     },
     {
      id:7,
      type:"text",
      name:'slika',
      placeholder:"URL",
      value:UnosState.slika
     }

    ]

    
console.log(UnosState)



  return (
    <div id={prop}>
      {prop == "post" && <h2 className='title'>Unos</h2> }
      
      <form onSubmit={handleSubmit} id='unos' >
        { prop == "put" && <img src={UnosState.slika || `${UnosState.vrsta}.jpg`}  onError={({currentTarget})=>{
        currentTarget.onerror = null;
        currentTarget.src=`${UnosState.vrsta}.jpg`
      }} alt="" />}

      {inputs.map(el=>{
              if(el.id > 1 && el.id <3){
                return <label key={el.id}>Vrsta<div> {Object.entries(inputs[1]).map((el ,index)=>{if(index > 0){return <label key={index}>{capitalize(el[0])}<input {...el[1]} onChange={unosFun}/></label>}})}</div></label>
              }
              else if(el.id == 6){
                return <label key={el.id}>{capitalize(el.name)} <textarea {...el} onChange={unosFun}></textarea> </label>
              }
              return <label key={el.id}>{capitalize(el.name)} <input {...el} onChange={unosFun}/> </label>
      })}

        {prop == "post" && <label >
        <img src={UnosState.slika || `${UnosState.vrsta}.jpg`}  onError={({currentTarget})=>{
        currentTarget.onerror = null;
        currentTarget.src=`${UnosState.vrsta}.jpg` || ""
      }} alt="" /></label>}

        {prop == "put" &&<label >Udomljen<input onChange={unosFun} value={UnosState.udomljen} checked={UnosState.udomljen} type="checkbox" name='udomljen' /></label>}

        {prop == "post" && <button type='submit'>Spremi</button>}
        {prop == "put" && <button id="delete-animal" onClick={()=>deleteFromBase(id, "animals")}>Izbriši</button>}
        {prop == "put" &&<button id="change-animal-info-button" type="submit" >Spremi</button>}

      </form>
    </div>
  )
}

export default Unos
