import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import Header from "./Header";
import Footer from "./Footer";

import { TelkomAuthToken } from "../auth/telkom-api/AuthToken"
import { AuthToken } from "../auth/AuthToken"
import { RefreshToken } from "../auth/RefreshToken"

import profile_png from './assets/profile.png'

function Profile(){

	const [namaMahasiswa, setFullname] = useState(null)
	const [username, setUsername] = useState(null)
	const [nim, setNim] = useState(null)
	const [avatar, setAvatar] = useState(null)

	const Navigate = useNavigate();

	const convertBlobToBase64 = blob => new Promise((resolve, reject) => {
	    const reader = new FileReader;
	    reader.onerror = reject;
	    reader.onload = () => {
	        resolve(reader.result);
	    };
	    return reader.readAsDataURL(blob);
	});

	let decodeJWT = () => {
		let telkomToken = Cookies.get('telkomToken')
		let accessToken = Cookies.get('accessToken')
		let refreshToken = Cookies.get('refreshToken')

		if(accessToken && refreshToken){
			loginByLocal({accessToken, refreshToken})
		}else if(telkomToken){
			loginByTelkom({telkomToken})
		}else{

		}
	}

	let loginByLocal = async ({accessToken, refreshToken}) => {
		let result = await AuthToken(accessToken)
		let { nama, nim, username, avatar } = result
		setFullname(nama)
		setUsername(username)
		setNim(nim)
		
		let response = await fetch(avatar)
		let blob = await response.blob()
		let base64img = await convertBlobToBase64(blob)
		setAvatar(base64img)
		localStorage.setItem('avatar',base64img)
	}

	let loginByTelkom = async ({telkomToken}) => {
		let result = await TelkomAuthToken(telkomToken)
		let { fullname, photo } = result
		setFullname(fullname)
		setAvatar(photo)
		setUsername(jwt_decode(telkomToken)?.sub)
		localStorage.setItem('avatar',photo)
	}

	let watchLocalExpire = async ()=>{
		let accessToken = Cookies.get('accessToken')
		let refreshToken = Cookies.get('refreshToken')

		if(accessToken && refreshToken){
			let decode = jwt_decode(accessToken)
			let expires = decode.exp
			let timenow = new Date().getTime()
			if(expires * 1000 < timenow){
				let result = await RefreshToken()
   		     	Cookies.set('accessToken',result.accessToken, { expires:result.exp})
				let accessToken = Cookies.get('accessToken')
				loginByLocal({accessToken, refreshToken})
			}
		}else{
			if(!accessToken && refreshToken){
				let result = await RefreshToken()
				Cookies.set('accessToken',result.accessToken, { expires:result.exp})
				let accessToken = Cookies.get('accessToken')
				loginByLocal({accessToken, refreshToken})
			}else if(!refreshToken){
				Navigate('/login')
			}else{

			}
		}
	}

	let watchTelkomExpire = () => {
		let telkomToken = Cookies.get('telkomToken')
		let decode = jwt_decode(telkomToken)
		let expires = decode.exp
		let timenow = new Date().getTime()

		if(expires * 1000 < timenow){
			Navigate('/login')
		}

	}

	useEffect(() => {
		decodeJWT();
		let telkomToken = Cookies.get('telkomToken')

		if(telkomToken){
			watchTelkomExpire()
		}else{
			watchLocalExpire()
		}

	},[])

	let defaultProfile = ()=>{
		setAvatar(profile_png)
	}
	return(
		<>
		<Header logout="true" avatar={avatar}/>
		<div className="img-jumbotron" style={{height:"15em"}}></div>
		<div className='container'>
			<div className="position-relative text-light header-profile">
				<h1>Profil Mahasiswa</h1>
			</div>
			<div className='row justify-content-center shadow content-profile'>
				<div className='col-md-4 p-5'>
					<img src={avatar} className='circle-img circle-img-profile' onError={defaultProfile}/>
				</div>
				<div className='col-md-4 p-5'>
					<h5 className='fw-bold'>Nama Mahasiswa</h5>
					<p className="fs-5">{namaMahasiswa || '--'}</p>
					<h5 className='fw-bold'>Username</h5>
					<p className="fs-5">{username ||'--'}</p>
					<h5 className='fw-bold'>NIM</h5>
					<p className="fs-5">{nim || '--'}</p>
				</div>
			</div>
		</div>
		<Footer/>
		</>
	)
}

export default Profile;