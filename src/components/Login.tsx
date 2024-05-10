import React, {useEffect} from 'react'
import { useState } from 'react';
import Singup from '../style/Signup.module.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [message , setMessage] = useState("");
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit =async (e:any) => {
        try{
        
        e.preventDefault();
        const {email , password}=formData;
        const res = await fetch(`${process.env.REACT_APP_BACK_END}/login` , {
            method:'POST',
            credentials:'include',
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
               email , password
            })
        })
        const data =await res.json();
        if(res.status===401||res.status===500 || !data){
             setMessage(data.message);
        }
        else{
            window.location.reload();
          navigate("/");
        }
    }
    catch(err){
        navigate("/login");
    }
    };


    const getUser = async ()=>{
        const res = await fetch(`${process.env.REACT_APP_BACK_END}/getuser` , {
           method:"GET",
           credentials:'include',
           headers:{
               "Content-Type":'application/json'
           }
        })
         if(res.status===200){
           navigate("/");
         }
     }
   
     useEffect(()=>{
       getUser();
     },[])

  return (
    <div className={Singup.container}>
       <form onSubmit={handleSubmit} className={Singup.form}>
            <div className={Singup.inputGroup}>
                <label htmlFor="email" className={Singup.label}>Email:</label>
                <input
                 className={Singup.input}
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className={Singup.inputGroup}>
                <label htmlFor="password"  className={Singup.label}>Password:</label>
                <input
                 className={Singup.input}
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" className={Singup.button}>Login</button>
            <p className={Singup.error}>{message}</p>
        </form>
    </div>
  )
}

export default Login
