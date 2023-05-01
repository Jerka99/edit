import { useContextComp } from "./MyContext"
 

const ProtectedRoute = ({children}) => {

    const {authUser} = useContextComp();
    if(authUser.displayName == "admin"){
        return children
    }

  return (null
  )
}

export default ProtectedRoute
