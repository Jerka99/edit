import { auth } from "../firebase/firebase";
import { useContextComp } from "./MyContext"
 

const ProtectedRoute = ({children}) => {

  const {authUser} = useContextComp().auth;

    if(authUser.displayName == "admin"){
        return children
    }

  return (<></>
  )
}

export default ProtectedRoute
