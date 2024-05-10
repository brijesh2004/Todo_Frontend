import NavbStyle from '../style/navb.module.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
const Navb = () => {
  const [login , setLogin] = useState(false);
  const getUser = async ()=>{
    const res = await fetch(`${process.env.REACT_APP_BACK_END}/getuser` , {
       method:"GET",
       credentials:'include',
       headers:{
           "Content-Type":'application/json'
       }
    })
     if(res.status===200){
       setLogin(true)
     }
     else{
      setLogin(false)
     }
 }

 const Logout = async ()=>{
     const res = await fetch(`${process.env.REACT_APP_BACK_END}/logout` , {
      method:'POST',
      credentials:'include',
      headers:{
        "Content-Type":'application/json'
      }
     })
     const data = res.json();
     if(res.status===200){
      window.location.reload();
     }
 }
 useEffect(()=>{
   getUser();
 },[])
  return (
    <div>
      <div className={NavbStyle.head}>
      {!login && (
        <>
          <div><Link to='/login'>Login</Link></div>
          <div><Link to="/signup">Signup</Link></div>
        </>
      )}
      {login && (
        <div><p onClick={Logout} className={NavbStyle.logout}>Logout</p></div>  // Assuming you have a handleLogout function that manages logout
      )}
      </div>
    </div>
  )
}

export default Navb
