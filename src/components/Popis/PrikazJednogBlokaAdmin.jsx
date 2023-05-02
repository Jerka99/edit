import { useContextComp } from "../MyContext";

const PrikazJednogBlokaAdmin = ({children}) => {

    const {authUser} = useContextComp();

    if(authUser.displayName !== "admin"){
        return children
    }

  return (
    <div>
      aaaa
    </div>
  )
}

export default PrikazJednogBlokaAdmin
