import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
  //which returns {auth, setAuth}
  //we made a shortcut and avoided importing useContext and AuthContext in everyplace this values are required
  return useContext(AuthContext)
}

export default useAuth