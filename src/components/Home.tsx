
import Singup from '../style/Signup.module.css';
import { useEffect, useState } from 'react';
import LoginFirst from './LoginFirst';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();
  const [logined , setLogined] = useState(false);
  const [todoval , setTodoVal] = useState(''); 
  const [userData , setUserData] = useState([]);


  const AddTodo =async (e:any)=>{
   e.preventDefault();
  if(todoval.length!==0){
    try{
     const res = await fetch(`${process.env.REACT_APP_BACK_END}/addtodo` , {
      method:'POST',
      credentials:'include',
      headers:{
        "Content-Type":'application/json',
      },
      body:JSON.stringify({
       todoval
      })
     })
     const data =await res.json();
     if(res.status===500||!data){
      alert("error");
     }
     else{
      alert("Added");
      window.location.reload();
      setTodoVal("");
     }
    }
    catch(err){
     alert("Error");
    }
  }
  else{
    alert("write something")
  }
  }



  const DeleteTodo = async (id:any)=>{
     try{
     const res = await fetch(`${process.env.REACT_APP_BACK_END}/delTodo/${id}` , {
      method:'DELETE',
      credentials:'include',
      headers:{
        "Content-Type":'application/json'
      }
     })
     const data = await res.json();
     if(res.status===500 ||!data){
      alert("Error");
     }
     else{
      alert("Deleted");
      window.location.reload();
     }
     }
     catch(err){
      alert("error");
     }
  }

  const getUser = async ()=>{
    const res = await fetch(`${process.env.REACT_APP_BACK_END}/getuser` , {
       method:"GET",
       credentials:'include',
       headers:{
           "Content-Type":'application/json'
       }
    })
    const data = await res.json();
     if(res.status===200){
      //  navigate("/");
      setLogined(true);
      setUserData(data.todo);
     }
     else{
      setLogined(false);
     }
 }

 useEffect(()=>{
   getUser();
 },[])
  return (
    <div className={Singup.homeContainer}>
     {logined &&<div>
      <form className={Singup.todoForm}>
        <input type="text" name='todoval' placeholder='Create Todo' className={Singup.todoInput} onChange={(e:any)=>setTodoVal(e.target.value)} required/>
        <button className={Singup.todoButton} onClick={AddTodo}>Add</button>
      </form>
      <div style={{marginTop:'40px'}}></div>
      {userData.map((elem: any, ind: number) => {
        return (
          <div key={ind} className={Singup.paraBox} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <p style={{ margin: '0', flexGrow: 1 }}>{elem.todos}</p>
            <button onClick={()=>{DeleteTodo(elem._id)}} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
              <i className="fas fa-trash" style={{ color: 'red' }}></i>
            </button>
          </div>
        );
      })}

      </div>
      }

      { !logined&&
        <LoginFirst/>
      }
    </div>
  )
}

export default Home
