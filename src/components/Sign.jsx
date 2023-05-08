import { useState } from "react";
import { useContextComp } from "./MyContext";


const SignIn = ({signIn, signUp, state, setDisplaySign}) => {

  const [user, setUser] = useState({...state});
  const { createUser, logInUser, authUser} = useContextComp().auth


  const inputFun = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  
  const submitFun = (e) => {
    e.preventDefault();
    if(signUp){
      createUser(user.name, user.email, user.password)
    }
    else if(signIn){
      logInUser(user.email, user.password)
    }
    if(authUser)
    setUser({name:"", email: "", password: "" })
  };

  return (<div id="sign-background">
    <div id="sign">
      <button id="close" onClick={()=>setDisplaySign({signUp:false, signIn:false})}>✖</button>
      {signIn ? <p>Prijavi se</p> : <p>Kreiraj Račun</p>}
      <form onSubmit={submitFun}>
        {Object.keys({...state}).map(element => {
         return <label key={element}>
          {element}
          <input
            type="text"
            name={element}
            value={user[element]}
            onChange={inputFun}
            required
          />
        </label>
        })}
        <button type="submit">{signUp ? "Kreiraj Račun" : "Prijavi se"}</button>
        {signUp && <div id="change-form"><p>Već imate račun?</p>
        <button onClick={()=>setDisplaySign({signUp:false, signIn:true})}>Prijavi se</button>
        </div>}
        
        {signIn && <div id="change-form"><p>Nemate Račun?</p>
        <button onClick={()=>setDisplaySign({signUp:true, signIn:false})}>Napravi Račun</button>
        </div>}

      </form>
    </div></div>
  );
};

export default SignIn;
