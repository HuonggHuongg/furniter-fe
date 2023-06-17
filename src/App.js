import "./App.css";
import LayoutUserSide from "./Layout/LayoutUserSide";
import HomeAdmin from "./adminSide/HomeAdmin";
import { Progress } from "reactstrap";
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


function App() {
  const loading = useSelector((state) => state.user.status);
  const navigate = useNavigate();
  const currentUserLocal = JSON.parse(localStorage.getItem("currentUserInfor"));
const {currentUser} = useSelector((state) => state.user);


const [isAdmin,setIsAdmin] = useState(false)
console.log(isAdmin);

useEffect(()=>{
    if(currentUserLocal) {  
      currentUserLocal.userRoles.forEach(role => {
        if(role==="ROLE_ADMIN"){
           setIsAdmin(true)}
      }) 
    } else {
      setIsAdmin(false);
    }
  },[currentUserLocal,currentUser])
  console.log(currentUser)
  useEffect(() => {
    if(isAdmin && currentUser.userName){
      navigate("/admin/")
    }
  }, [isAdmin])
  return (
    <>
      {loading === "loading" ? (
        <Progress animated value="100" className="progress"></Progress>
      ) : (
        ""
      )}
      {
        isAdmin?<HomeAdmin/>:<LayoutUserSide/>
       }
    </>
  );
}

export default App;
