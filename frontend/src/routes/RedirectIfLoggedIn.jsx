import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore.js";

const RedirectIfLoggedIn=({children})=>{

  const {user}=useAuthStore();

  if(!user) return children;


  return <Navigate to="/" replace/>
}
export default RedirectIfLoggedIn;