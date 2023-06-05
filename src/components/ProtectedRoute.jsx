import { auth } from "../firebase/firebase";
import { useContextComp } from "./MyContext"
 

const ProtectedRoute = ({children}) => {

  const {authUser} = useContextComp().auth;

    if(authUser.email == "admin@gmail.com"){
        return children
    }

  return (<></>
  )
}

export default ProtectedRoute
