import { React, useState } from "react";
import { useNavigate } from "react-router-dom"
import { AuthRegister } from "../auth/AuthRegister";
import { customValidator } from '../tool/customValidator'
import { everyObject } from '../tool/util.js'

import registerImage from "./assets/registerpage.jpg"

function RegisterPage(){

  const Navigate = useNavigate()

  let [loadingState, setLoading] = useState('Buat Akun')
  let [NamaLengkap, setNamaLengkap] = useState(null)
  let [Nim, setNim] = useState(null)
  let [Username, setUsername] = useState(null)
  let [Password, setPassword] = useState(null)
  let [Avatar, setAvatar] = useState(null)
  let [confirmPassword, isRepPassword] = useState(false)
  let [alertState, setAlert] = useState(null)
  let [passview, setViewPass] = useState(false)
  let [passconfview, setViewconfPass] = useState(false)

  let [needs, setComplete] = useState({
    namaLengkap:{
      letter:false,
      minimum:false
    },
    nim:{
      number:false,
      minimum:false,
    },
    username:{
      lowercase:false
    },
    password:{
      minimum:false,
      capitalcase:false,
      lowercase:false,
      number:false,
      spesialchar:false,
    },
    file:{
      size:false
    }
  })

  let [stats, setStats] = useState({
    namaLengkap:false,
    nim:false,
    username:false,
    password:false,
    file:false
  })


  let validate = (e) => {
    let typeform = e.target.id
    let value = e.target.value
    customValidator({
      input:e,
      typeform,
      value,
      methods:{ setComplete,setNim,setPassword,setUsername,setNamaLengkap },
      needs
    })
  }

  let inputBlur = (e) => {
  	let typeform = e.target.id
  	let warnAlert = document.querySelector(`#${typeform} + div`)
    let warnAlertPass = document.querySelector(`.${typeform}-validator`)
    if(warnAlert){
      warnAlert.classList.toggle("d-none")
    }
    if(warnAlertPass){
      warnAlertPass.classList.toggle("d-none")
    }

    //make input green by watch "needs" state
    let temporary = {}
    for(let i in needs) {
      temporary[i] = Object.values(needs[i]).every(x=>x)
    }
    setStats(temporary)

  }

  let inputFocus = (e) => {
  	let typeform = e.target.id
    let warnAlert = document.querySelector(`#${typeform} + div`)
  	let warnAlertPass = document.querySelector(`.${typeform}-validator`)
    if(warnAlert){
      warnAlert.classList.toggle("d-none")
    }
    if(warnAlertPass){
      warnAlertPass.classList.toggle("d-none")
    }

  }


  let repeatPassword = (e) => {
    if(Password === e.target.value){
      isRepPassword(true)
    }else{
      isRepPassword(false)
    }
  }

  let validateImage = (e) => {

    let inputFile = e.target
    let warnAlert = document.querySelector(`#${inputFile.id} + div`)
    
    if(inputFile.files.length){
        let { name, size} = inputFile.files[0]
        let regex = /(.*?).(jpg|jpeg|png)$/
    
        if(!regex.test(name) || size > 500000){
          warnAlert.classList.remove("d-none")
          inputFile.value = ''
        }else{
          setAvatar(inputFile.files[0])
          warnAlert.classList.add("d-none")
        }
    }else{
          warnAlert.classList.remove("d-none")

    }

  }

  let handleForm = async (event) => {
    event.preventDefault()
    let currentForm = {
      nama:NamaLengkap,
      password:Password,
      confirmPassword,
      username:Username,
      nim:Nim,
      avatar:Avatar
    }

    try{
      if(everyObject(currentForm,bool=>bool)){
        let registerState = await AuthRegister(currentForm)
        if(await registerState.status === 200){
          setAlert(<div className="alert alert-success" role="alert">
            <span><i className="bi bi-check-circle-fill"></i> Sukses daftar, mengalihkan...</span>
            </div>);
          setTimeout(()=>Navigate("/login"),200)
        }else{
          setAlert(<div className="alert alert-danger" role="alert">
            <span><i className="bi bi-x-circle-fill"></i> {registerState.msg}</span>
            </div>);
          setLoading(<>Buat Akun</>)
        }
      }else{
          setAlert(<div className="alert alert-danger" role="alert">
            <span><i className="bi bi-x-circle-fill"></i> Isi data dengan benar!</span>
            </div>);
      }
    }catch(err){
        setAlert(<div className="alert alert-danger" role="alert">
          <span><i className="bi bi-x-circle-fill"></i> Sistem sedang sibuk, coba beberapa saat lagi</span>
          </div>)

        setLoading(<>Buat Akun</>)
    }

  }

  let handleLoading = (e) => {
    let temp = {
      NamaLengkap,
      Password,
      confirmPassword,
      Username,
      Nim,
      Avatar
    }
    if(everyObject(temp,bool=>bool)){
      setLoading(<>Loading <div className="rotating"><i className="bi bi-arrow-clockwise"></i></div></>)
    }
  }

  let viewPass =()=>{
    if(passview) setViewPass(false)
    else setViewPass(true)
  }
  let viewconfPass=()=>{
   if(passconfview) setViewconfPass(false)
    else setViewconfPass(true)
  }

    return (
      <div className="row w-100">
        <div className="col-md-7 img-onboard">
          <img className="w-100 vh-100 img-cover" src={registerImage}/>
          <div className='auth-img-welcome'>
            <h1>Selamat Datang</h1>
            <p>Silahkan mengisi formulir<br/>untuk melakukan pendaftaran</p>
          </div>
        </div>
        <div className="col-md-5 p-5 register-form">
          <form onSubmit={handleForm} action="/register" method="post" encType="multipart/form-data" className="">
            <div className="form-group mb-2">
              <h3>Daftar Akun Sekarang</h3>
              <div>{ alertState }</div>
              <b>Nama Lengkap</b>
              <input type="text" className={stats.namaLengkap ? 'border-bottom border-success form-control' : 'form-control' } id="namaLengkap" placeholder="Nama Mahasiswa" maxLength="30" onChange={validate} onFocus={inputFocus} onBlur={inputBlur} required />
              <div className='d-none mt-2'>
                <ul>
                  <li className={needs.namaLengkap.letter ? 'text-success' : 'text-danger' }><b>Mengandung huruf {needs.namaLengkap.letter ? <i className="bi bi-check-lg"></i> :<i className="bi bi-x"></i>}</b></li>
                  <li className={needs.namaLengkap.minimum ? 'text-success' : 'text-danger' }><b>Minimal 4 kata {needs.namaLengkap.minimum ? <i className="bi bi-check-lg"></i> :<i className="bi bi-x"></i>}</b></li>
                </ul>
              </div>
            </div>
            <div className="form-group mb-2">
              <b>NIM</b>
              <input type="number" className={stats.nim ? 'border-bottom border-success form-control' : 'form-control' } id="nim" placeholder="Nomor Induk Mahasiswa" maxLength="10" onChange={validate} onFocus={inputFocus} onBlur={inputBlur} required />
              <div className='d-none mt-2'>
                <ul>
                  <li className={needs.nim.number ? 'text-success' : 'text-danger' }><b>Hanya angka {needs.nim.number ? <i className="bi bi-check-lg"></i> :<i className="bi bi-x"></i>}</b></li>
                  <li className={needs.nim.minimum ? 'text-success' : 'text-danger' }><b>Maksimal 10 angka {needs.nim.minimum ? <i className="bi bi-check-lg"></i> :<i className="bi bi-x"></i>}</b></li>
                </ul>
              </div>
            </div>
            <div className="form-group mb-2">
              <b>Username</b>
              <input type="text" className={stats.username ? 'border-bottom border-success form-control' : 'form-control' } id="username" name="username" placeholder="Username Anda" onChange={validate} onFocus={inputFocus} onBlur={inputBlur} required />
              <div className='d-none pt-2'>
                <ul>
                  <li className={needs.username.lowercase ? 'text-success' : 'text-danger' }><b>Hanya huruf kecil {needs.username.lowercase ? <i className="bi bi-check-lg"></i> :<i className="bi bi-x"></i>}</b></li>
                </ul>
              </div>
            </div>
            <div className="form-group mb-2">
              <b>Password</b>
              <div class="input-group input-eye">
                  <input type={passview?"password":"text"} className={stats.password ? 'border-bottom border-success form-control' : 'form-control' } id="password" name="password" placeholder="Isi Password" minLength="8" onChange={validate} onFocus={inputFocus} onBlur={inputBlur} required />
                  <span className="input-group-text" onClick={viewPass}>{passview?<i className="bi bi-eye-slash"></i>:<i className="bi bi-eye"></i>}</span>
              </div>
              <div className='d-none mt-2 password-validator'>
                <ul>
                  <li className={needs.password.minimum ? 'text-success' : 'text-danger' }><b>Minimal 8 karakter {needs.password.minimum ? <i className="bi bi-check-lg"></i> :<i className="bi bi-x"></i>}</b></li>
                  <li className={needs.password.capitalcase ? 'text-success' : 'text-danger' }><b>Huruf kapital {needs.password.capitalcase ? <i className="bi bi-check-lg"></i> :<i className="bi bi-x"></i>}</b></li>
                  <li className={needs.password.lowercase ? 'text-success' : 'text-danger' }><b>Huruf kecil {needs.password.lowercase ? <i className="bi bi-check-lg"></i> :<i className="bi bi-x"></i>}</b></li>
                  <li className={needs.password.number ? 'text-success' : 'text-danger' }><b>Angka {needs.password.number ? <i className="bi bi-check-lg"></i> :<i className="bi bi-x"></i>}</b></li>
                  <li className={needs.password.spesialchar ? 'text-success' : 'text-danger' }><b>Karakter spesial {needs.password.spesialchar ? <i className="bi bi-check-lg"></i> :<i className="bi bi-x"></i>}</b></li>
                </ul>
              </div>
            </div>
            <div className="form-group mb-2">
              <b>Ulangi Password</b>
              <div class="input-group input-eye">
                  <input type={passconfview?"password":"text"} className={confirmPassword ? 'border-bottom border-success form-control' : 'form-control' } id="ulangPassword" name="ulangPassword" placeholder="Ulangi pengisian password" minLength="8" onChange={repeatPassword} onFocus={inputFocus} onBlur={inputBlur} required />
                  <span className="input-group-text" onClick={viewconfPass}>{passconfview?<i className="bi bi-eye-slash"></i>:<i className="bi bi-eye"></i>}</span>
              </div>
            </div>
            <div className="form-group mb-2">
              <b>Foto Mahasiswa</b>
              <input type="file" className={stats.file ? 'border-bottom border-success form-control' : 'form-control' } id="foto" accept="image/*" onChange={validateImage} required />
              <div className='d-none mt-2'>
                <ul>
                  <li className={needs.file.size ? 'text-success list-unstyled' : 'text-danger list-unstyled' }><b>Ukuran maksimal 500 kb dan hanya jpg/png</b></li>
                </ul>
              </div>
            </div>
            <div className="mt-3">
              <button type="submit" onClick={handleLoading} className="btn btn-primary rounded text-center w-100 p-2 fw-bold">{loadingState}</button>
              <p className="mt-2">Sudah mempunyai akun? <a href="/login"><b>Login</b></a></p>
            </div>
          </form>
        </div>
      </div>
    );
}

export default RegisterPage;
