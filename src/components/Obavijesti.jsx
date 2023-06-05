import { useState } from "react";
import { useContextComp} from "./MyContext"

const Obavijesti = () => {

  const {authUser} = useContextComp().auth;
  const {notifications} = useContextComp().notifications;
  const {postInBase, deleteFromBase} = useContextComp().base;
  const [notificationState, setNotificationState] = useState({naslov:"", tekst:"", datum:"", vazno:false})
  const [noti, newNoti] = useState(false)
  const date = new Date().getTime()


  const handleSubmit = (e) =>{
    e.preventDefault();
    postInBase(notificationState, "notificationsCollectionRef")
    setNotificationState({naslov:"", tekst:"", datum:"", vazno:false})
  }

  const createNotification = (e) =>{
    let {name, value} = e.target
    if(name == "vazno"){
      value = !notificationState.vazno
    }
    setNotificationState(prev=>({...prev,[name]:value,datum:new Date().getTime()}))
  }

  const dateFun = (x) =>{
    const date = new Date(x)
    return(date.toString().substring(0,24))
  }

  const sortNoti = (arr) =>{
    const newArr = arr;

    for(let j=0; j<newArr.length; j++){
      for(let i=0; i<newArr.length-1; i++){

        if(newArr[i]?.datum < newArr[i+1]?.datum){
        let temp = newArr[i+1]
        newArr[i+1] = newArr[i]
        newArr[i] = temp
        }
      }
    }
      return (newArr)
   
  }

  return (
    <div>
      {authUser.email == "admin@gmail.com" && <div id="obavijest-admin" className={noti ? "active" : ""}>
      <button id="show-noti" onClick={()=>newNoti(prev=>!prev)}>Nova obavijest</button> 
      <form className={noti ? "active" : ""} onSubmit={handleSubmit}>
      <label><h4>Naslov</h4><input required type="text" maxLength="20" name="naslov" value={notificationState.naslov} onChange={createNotification}/></label>
      <label><h4>Tekst</h4><textarea required cols="30" rows="10" maxLength="200" name="tekst" value={notificationState.tekst} onChange={createNotification}></textarea></label>
      <label>Važno <input type="checkbox" name="vazno" value={notificationState.vazno} checked={notificationState.vazno} onChange={createNotification}/></label>
      <button type="submit">Spremi</button>
    </form></div>}

        <h2 className='title'>Obavijesti</h2> 

        {  sortNoti(notifications).map((notification)=>{
          return <div id="notification-block" key={notification.id}>
            <div id={notification.vazno ? "important" : "not-important"}><h4>{notification.naslov}</h4> <h4>{dateFun(notification.datum)}</h4></div>
            <p>{notification.tekst}</p>
            {authUser.email == "admin@gmail.com" && <button onClick={()=>deleteFromBase(notification.id, "notifications")}>Izbriši</button>}
           </div>
        })}
    </div>
  )
}

export default Obavijesti
