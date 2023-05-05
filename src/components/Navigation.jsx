import { Link } from "react-router-dom";
import Bars from "../button/buttonbars";
import { useContextComp } from "./MyContext";
import { useState } from "react";

export default function Navigation({sidebar, setSidebar, setDisplaySign}) {
 
const {authUser, name, signOutFun, logInUser} = useContextComp().auth
const [currentUser, setCurrentUser] = useState("default@gmail.com")

const changeUser = () =>{
  if(authUser.displayName !== "admin"){
    setCurrentUser(authUser.email)
    logInUser("admin@gmail.com", "123456")
  }
  else
    logInUser(currentUser ?? "default@gmail.com", "123456")
}

  return (
    <>
      <header>
        <div><div id="bar" onClick={() => setSidebar((prev) => !prev)}>
          <Bars sidebar={sidebar} />
        </div>
        <h3>Azil za životinje</h3></div>
        <div>
        {authUser ? <p>signed in as {authUser.displayName ? authUser.displayName : name}</p> : null}
          <div className={`user-changer ${authUser.email == "admin@gmail.com" ? "active" : ""}`} 
          onClick={()=>changeUser()}>
            </div>
        {!authUser && <button onClick={()=>setDisplaySign({signUp:true, signIn:false})}>Sign up</button>}
        {!authUser && <button onClick={()=>setDisplaySign({signUp:false, signIn:true})}>Sign in</button>}
        {authUser &&<button onClick={()=>{signOutFun();setDisplaySign({signUp:false, signIn:false})}}>Sign out</button>}
        </div>
      </header>
     
      <div id="sidebar" className={sidebar ? "active" : ""}>
        <ul>
          <li>
            <Link to={`about`}>About</Link>
          </li>
          <li>
            <Link to={`popis`}>Popis</Link>
          </li>
          <li>
            <Link to={`donacije`}>Donacije</Link>
          </li>
          <li>
            <Link to={`obavijesti`}>Obavijesti</Link>
          </li>
          {authUser.displayName == "admin" && <li>
            <Link to={`unos`}>Unos</Link>
          </li>}
        </ul>
      </div>
    </>
  );
}
