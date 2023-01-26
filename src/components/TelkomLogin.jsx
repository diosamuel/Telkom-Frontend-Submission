import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { TelkomGetToken } from "../auth/telkom-api/GetToken";

import telkomIcon from "./assets/telkomicon.png"


function Login() {

  let [loadingState, setLoading] = useState('Login')
  let [alertState, setAlert] = useState(null)
  let [JWT_TOKEN, setJWT] = useState(null)
  let [dataForm, setForm] = useState({username:null,password:null})
  let [loginBy, setLoginBy] = useState(null)
  
  const Navigate = useNavigate()


  let handleForm = async (event) => {
  	event.preventDefault()
    const form = await new FormData(event.currentTarget);
  	setForm({
  		username:form.get('username'),
  		password:form.get('password')
  	})
    try{
      if(loginBy === "telkom"){
        
        console.log('login by telkom')
        let q = await TelkomGetToken(dataForm)
        setJWT(q)

      }
    }catch(err){
        let temp = <div className="alert alert-danger" role="alert"><span><i className="bi bi-x-circle-fill"></i> Sistem sedang sibuk, coba beberapa saat lagi</span></div>
        setAlert(temp)
        setLoading(<>Login</>)
    }
  }

  useEffect(()=>{
    let telkomToken = Cookies.get('telkomToken')
    if(telkomToken){
      Navigate('/profile')
    }

    window.onpopstate = e => {
     Navigate('/')
    }

  },[])

  useEffect(()=>{

    if(JWT_TOKEN){
        if(JWT_TOKEN.success){
            
            Cookies.set('telkomToken',JWT_TOKEN.token, { expires:JWT_TOKEN.expired})
            setTimeout(()=>Navigate(`/profile`),200)
            window.opener.setData(true)
            window.close()
            
        }else{

          if(JWT_TOKEN.error){
            let temp = <div className="shake-horizontal alert alert-danger" role="alert"><span><i className="bi bi-x-circle-fill"></i>Sistem sedang sibuk, coba beberapa saat lagi</span></div>
            setAlert(temp)
          }else{
            let temp = <div className="shake-horizontal alert alert-danger" role="alert"><span><i className="bi bi-x-circle-fill"></i> Username atau password salah</span></div>
            setAlert(temp)
          }

        }

      }else{
        // let temp = <div className="shake-horizontal alert alert-danger" role="alert"><span><i className="bi bi-x-circle-fill"></i>Sistem sedang sibuk, coba beberapa saat lagi</span></div>
        //     setAlert(temp)
      }

    setLoading(<>Login</>)
  	
  },[JWT_TOKEN])

  let handleLoading = () => {
  	if(dataForm.username && dataForm.password){
      setLoading(<>Loading <div className="rotating"><i className="bi bi-arrow-clockwise"></i></div></>)
  	}
  }

    return (
      	<div className="vh-100 d-flex flex-column justify-content-center align-items-center">
          <img src={telkomIcon} className="img-fluid" width="50" height="50"/>
      	  <div className="w-75 p-2">
      	    <form onSubmit={handleForm} method="POST">
              <h3 className="text-center">Login Telkom</h3>
      	      <div>{ alertState }</div>
      	      <div className="form-group mb-3 mt-3">
      	        <b>Username</b>
      	        <input type="text" className="form-control" name="username" placeholder="Username Anda" onChange={(e)=>setForm({...dataForm,username:e.target.value})} required/>
      	      </div>
      	      <div className="form-group mb-3 mt-3">
      	        <b>Password</b>
      	        <input type="password" className="form-control" name="password" placeholder="Password Anda" onChange={(e)=>setForm({...dataForm,password:e.target.value})} required/>
      	      </div>
      	      <div className="row mt-2 gy-2">
                <p>Belum mempunyai akun? <a href="/register" target="_blank" onClick={()=>window.close()}><b>Daftar</b></a></p>
                <button type="submit" className="btn btn-danger rounded-pill text-center w-100 p-2 shadow fw-bold" onClick={()=>{setLoginBy('telkom');handleLoading('localhost')}}>
                  {loadingState}
                </button>
              </div>
      	    </form>
      	  </div>
      	</div>
    );
  }

export default Login