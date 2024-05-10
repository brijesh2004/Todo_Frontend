import React, { useEffect } from 'react'
import { useState } from 'react';
import Singup from '../style/Signup.module.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [message , setMessage] = useState("");
    const [formData, setFormData] = useState({
        username: '',
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

    const handleSubmit = async (e:any) => {
        const {username , email , password} = formData;
        e.preventDefault();
        const res = await fetch(`${process.env.REACT_APP_BACK_END}/signup` , {
            method:'POST',
            credentials:'include',
            headers:{
                "Content-Type" : "application/json"
              },
            body:JSON.stringify({
                username , email , password
            })
        })
        const data = await res.json();
        if(res.status===400 || !data || res.status === 500 || res.status===401){
            setMessage(data.message);
           }
           else{
            window.location.reload();
            navigate("/");
        
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
                <label htmlFor="username" className={Singup.label}>Username:</label>
                <input
                 className={Singup.input}
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
            </div>
            <div className={Singup.inputGroup}>
                <label htmlFor="email" className={Singup.label}>Email:</label>
                <input
                 className={Singup.input}
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
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
                />
            </div>
            <button type="submit" className={Singup.button}>Sign Up</button>
            <p className={Singup.error}>{message}</p>
        </form>
    </div>
  )
}

export default Signup
