import React, { useEffect, useRef } from "react";
import "./assets/login.css";
import emailjs from "@emailjs/browser";
import otp_icon from "./assets/otp.png";
import email_icon from "./assets/email.png";
import password_icon from "./assets/password.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {getDocs,collection,where,query} from 'firebase/firestore'
import { db } from "../firebase";
const Login = () => {
  const navigate = useNavigate();


  const getEmail = localStorage.getItem("email");
  if (getEmail !== null) {
    navigate("/");
  }
  const [email, setemail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [users, Setusers] = useState([]);
  const [isOtpSent, SetIsOtpSent] = useState(false);
  const [generated_otp, setGenerared_OTP] = useState(Math.floor(100000 + Math.random() * 900000));
  const [new_otp, setNew_OTP] = useState(0);
  useEffect(() => {
    const getEmail = localStorage.getItem("email");
    console.log(getEmail);
    if (getEmail !== null) {
      navigate("/");
    }
    axios.get("http://localhost:2000/users").then((res) => {
      Setusers(res.data);
    });
  }, []);

  const form = useRef();

  const sendEmail = async(e) => {
    e.preventDefault();
    const dbref=collection(db,"userInfo")
    let count = 0;

    try{
      console.log(username,password)
      const emailMatch=query(dbref,where('email','==',email))
      const passwordMatch=query(dbref,where('password','==',password))
      const emailSnapshot=await getDocs(emailMatch)
      const emailArray=emailSnapshot.docs.map((doc)=>doc.data())
      const passwordSnapshot=await getDocs(passwordMatch)
      const passwordArray=passwordSnapshot.docs.map((doc)=>doc.data())
      if(emailArray.length>0 && passwordArray.length>0){
            count = 1;
        SetIsOtpSent(true);
        // setGenerared_OTP();
        setUsername(username);
        emailjs
          .sendForm(
            "service_zi7uhfl",
            "template_ett67sq",
            form.current,
            "VAuhSI-Y55nG5oU0b"
          )
          .then(
            (result) => {
              console.log(result.text);
            },
            (error) => {
              console.log(error.text);
            }
          );
      
        alert("Email Sent")
      }
      else{
        alert("Sending email Failed")
      }
    }
    catch(error){
      alert(error)

    }
    // users.map((user, index) => {
    //   if (user["email"] === email && user["password"] === password) {
      //   count = 1;
      //   SetIsOtpSent(true);
      //   // setGenerared_OTP();
      //   setUsername(user["username"]);
      //   emailjs
      //     .sendForm(
      //       "service_zi7uhfl",
      //       "template_ett67sq",
      //       form.current,
      //       "VAuhSI-Y55nG5oU0b"
      //     )
      //     .then(
      //       (result) => {
      //         console.log(result.text);
      //       },
      //       (error) => {
      //         console.log(error.text);
      //       }
      //     );
      // }
    // });
    // if (count === 0) {
    //   alert("Invalid Credentials");
    // }
  };
  const handleSubmit = () => {
    if (generated_otp == new_otp) {
      alert("Login succesful");
      localStorage.setItem("email", email);
      localStorage.setItem("name", username);
      navigate("/");
    }
  };
  return (
    <form ref={form} onSubmit={sendEmail}>
      <div className="container2">
        <div className="header">
          <div className="text">Login</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <img src={email_icon} alt="" />
            <input
              type="text"
              placeholder="Email"
              name="email"
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
          </div>

          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
          </div>
          <input type="hidden" name="otp" value={generated_otp} placeholder="OTP" />
          {isOtpSent && (
            <div className="input">
              <img src={otp_icon} alt="" />
              <input type="text" name="new_otp" onChange={(e) => { setNew_OTP(e.target.value) }} placeholder="OTP" />
            </div>
          )}
        </div>
        {/* <div className="forget-password">Forget</div> */}
        <div className="submit-container">
          {isOtpSent ? (
            <button className="submit" onClick={handleSubmit}>
              Login
            </button>
          ) : (
            <button className="submit" >
              Send OTP
            </button>
          )
          }

          <Link className="submit gray" to="/register">
            Go to Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Login;
