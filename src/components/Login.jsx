import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TelkomGetToken } from "../auth/telkom-api/GetToken";
import { GetToken } from "../auth/GetToken";
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';

import loginImage from "./assets/loginpage.jpg"
import telkomIcon from "./assets/telkomicon.png"


function Login() {

  let [loadingState, setLoading] = useState('Login')
  let [loadingStateTelkom, setLoadingTelkom] = useState('Login via Telkom')
  let [alertState, setAlert] = useState(null)
  let [JWT, setJWT] = useState(null)
  let [dataForm, setForm] = useState({username:null,password:null})
  let [loginBy, setLoginBy] = useState(null)
  let [passview, setViewPass] = useState(false)
  
  let Navigate = useNavigate()

  let handleForm = async (event) => {
  	event.preventDefault()
    const FORM = await new FormData(event.currentTarget);
  	setForm({
  		username:FORM.get('username'),
  		password:FORM.get('password')
  	})

    try{

      let q = await GetToken(dataForm)
      setJWT(q)

    }catch(err){

      let temp = <div className="alert alert-danger" role="alert"><span><i className="bi bi-x-circle-fill"></i> Sistem sedang sibuk, coba beberapa saat lagi</span></div>
      setAlert(temp)
      setLoading(<>Login</>)
      setLoadingTelkom(<>Login with Telkom</>)

    }
  }

  useEffect(()=>{
    let accessToken = Cookies.get('accessToken')
    let refreshToken = Cookies.get('refreshToken')
    let telkomToken = Cookies.get('telkomToken')
    
    if(accessToken && refreshToken){
      Navigate('/profile')
    }else if(telkomToken){
      Navigate('/profile')
    }else{

    }

    window.onpopstate = () => {
     Navigate('/')
    }

    window.setData = success => {
      if(success){
        setTimeout(()=>Navigate(`/profile`),200)
      }
    }

  },[])

  useEffect(()=>{

    if(JWT){
        if(JWT.success){

          let decodeToken = jwt_decode(JWT.token)
          let decodeAccess = jwt_decode(JWT.access)
          Cookies.set('refreshToken', JWT.token,{ expires:decodeToken.exp })
          Cookies.set('accessToken', JWT.access,{ expires:decodeAccess.exp })
          Cookies.remove('telkomToken')

          let temp = <div className="alert alert-success" role="alert"><span><i className="bi bi-check-circle-fill"></i> Sukses login, mengalihkan...</span></div>
          setAlert(temp);
          setTimeout(()=>Navigate(`/profile`),200)
    
        }else{

          if(JWT.error){
            let temp = <div className="shake-horizontal alert alert-danger" role="alert"><span><i className="bi bi-x-circle-fill"></i>Sistem sedang sibuk, coba beberapa saat lagi</span></div>
            setAlert(temp)
          }else{
            let temp = <div className="shake-horizontal alert alert-danger" role="alert"><span><i className="bi bi-x-circle-fill"></i> Username atau password salah</span></div>
            setAlert(temp)
          }

        }


      }else{

      }

    setLoading(<>Login</>)
  	setLoadingTelkom(<>Login via Telkom</>)

  },[JWT])

  let handleLoading = (via) => {
    if(via === "telkom"){
  	  setLoadingTelkom(<>Loading <div className="rotating"><i className="bi bi-arrow-clockwise"></i></div></>)
    }else{
      if(dataForm.username && dataForm.password){
        setLoading(<>Loading <div className="rotating"><i className="bi bi-arrow-clockwise"></i></div></>)
      }
    }
  }

  let windowPopup = () => {
    let width = 500
    let height = 600
    let options = `width=${width},height=${height},left=50,top=100,scrollbars=yes`
    let win = window.open('/login/telkom','popupWindow',options)
    let timed = setInterval(()=>{
      if(win.closed){
        setLoadingTelkom(<>Login via Telkom</>)
        clearInterval(timed)
      }
    },500)
  }
  let viewPass=()=>{
   if(passview) setViewPass(false)
    else setViewPass(true)
  }
    return (
      	<div className="row w-100">
          <div className="col-md-7 img-onboard">
            <img className="w-100 vh-100 img-cover" src={loginImage}/>
      	    <div className="auth-img-welcome">
      	      <h1>Selamat Datang</h1>
      	      <p>Silahkan mengisi formulir dengan lengkap<br/>untuk masuk kedalam sistem</p>
      	    </div>
          </div>
      	  <div className="col-md-5 p-5">
            <div className="form-padding">
      	    <form onSubmit={handleForm} method="post" className="mt-5">
              <h3>Masuk menggunakan akun kamu</h3>
      	      <div>{ alertState }</div>
      	      <div className="form-group mb-3 mt-3">
      	        <b>Username</b>
      	        <input type="text" className="mt-2 form-control" name="username" placeholder="Username Anda" onChange={(e)=>setForm({...dataForm,username:e.target.value})} required/>
      	      </div>
      	      <div className="form-group mb-3 mt-3">
      	        <b>Password</b>
      	         <input type="password" className="mt-2 form-control" name="password" placeholder="Isi Password" onChange={(e)=>setForm({...dataForm,password:e.target.value})} required/>
      	      </div>
      	      <div className="mt-2">
                <div>
                  <button type="submit" className="btn btn-success rounded text-center w-100 p-2 fw-bold" onClick={()=>{setLoginBy('localhost');handleLoading('localhost')}} type="submit">
                    {loadingState}
                  </button>
                </div>
      	      </div>
      	    </form>
            <div className="mt-2">
              <button className="btn border-danger rounded text-center w-100 p-2 fw-bold" onClick={()=>{windowPopup();handleLoading('telkom')}} type="button">
                <img className="img-fluid me-2" width="20" src={telkomIcon}/>                      
                {loadingStateTelkom}
              </button>
            </div>
      	   <div className="col-md-12 mt-2">
              <p>Belum mempunyai akun? <a href="/register"><b>Daftar</b></a></p>
           </div>
      	  </div>
          </div>
      	</div>
    );
  }

export default Login