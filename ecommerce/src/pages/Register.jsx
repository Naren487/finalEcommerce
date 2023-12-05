import React, { useEffect } from 'react';
import "./assets/login.css";
import user_icon from './assets/person.png';
import email_icon from './assets/email.png';
import password_icon from './assets/password.png';
import phone_icon from './assets/phone.png'
import { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { db } from '../firebase';
import {collection, addDoc} from 'firebase/firestore';
const Register = () => {
    const navigate = useNavigate();

    
    useEffect(()=>{
        const getEmail=localStorage.getItem("email");
    console.log(getEmail);
    if(getEmail!==null){
        navigate("/");
    }
    },[])
    const [username,setusername]=useState("");
    const [email,setemail]=useState("");
    const [number,setnumber]=useState("");
    const [password,setpassword]=useState("");
    const dbref=collection(db,'userInfo')
    const handleSubmit=async()=>{
        const user={
            "username":username,
            "email":email,
            "number":number,
            "password":password
        }
        if(username==="" || number.toString ===""  || number.length!==10 || password==="" || email==="" ){
            alert("Enter details correctly");
            console.log(number.length);
        }
        else{
        // axios.post('http://localhost:2000/users',user)
        // .then(res=>{
        //     alert("Data Added Successfully!!!");
        //     navigate("/login");
        // })
        try{
            await addDoc(dbref,user)
            alert("data added")
        }
        catch(error){
            alert(error);
        }
        
    }
    }
  return (
   <div className='container2'>
    <div className='header'>
        <div className='text'>
            Register
        </div>
        <div className='underline'></div>

    </div>
    <div className='inputs'>
        <div className='input'>
            <img src={user_icon} alt=''/>
            <input type='text' onChange={(e)=>{setusername(e.target.value)}} placeholder='Username'/>
        </div>
        <div className='input'>
            <img src={email_icon} alt=''/>
            <input type='email'placeholder='Email' onChange={(e)=>{setemail(e.target.value)}}/>
        </div>
        <div className='input'>
            <img src={phone_icon} alt=''/>
            <input type='number'placeholder='Number' onChange={(e)=>{setnumber(e.target.value)}}/>
        </div>
        <div className='input'>
            <img src={password_icon} alt='' />
            <input type='password'placeholder='Password' onChange={(e)=>{setpassword(e.target.value)}}/>
        </div>
    </div>
    {/* <div className="forget-password">Forget</div> */}
    <div className="submit-container">
        <div className="submit" onClick={handleSubmit} >Register</div>
        <Link className="submit gray" to="/login" >Go to Login</Link>
    </div>
   </div>
  )
}

export default Register