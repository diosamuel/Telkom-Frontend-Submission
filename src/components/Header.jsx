import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { AuthLogout } from "../auth/AuthLogout";
import headerLogo from "./assets/telkomicon.png"
import profile_png from './assets/profile.png'

function Header(props){

	let [localAvatar, setLocalAvatar] = useState('')
	let [isLogged, setLogged] = useState(false)
	let [isAvatarError, setAvatarError] = useState(false)
  	const Navigate = useNavigate()
	let Logout = async ()=>{
		let q = await AuthLogout()

		if(q && q.logout){
			setTimeout(()=>Navigate('/login'),200)
			Cookies.remove('refreshToken')
			Cookies.remove('accessToken')
			Cookies.remove('telkomToken')
			localStorage.removeItem('avatar')
		}
	}

	let Login = ()=>{
		Navigate('/login')
	}

	useEffect(()=>{

		const COOKIE_LOCAL = Cookies.get('refreshToken') && Cookies.get('accessToken')
		const COOKIE_TELKOM = Cookies.get('telkomToken')
		
		if(COOKIE_LOCAL){
			setLogged(true)
		}else if(COOKIE_TELKOM){
			setLogged(true)
		}else{
			setLogged(false)
		}

		let tempAvatar = localStorage.getItem('avatar')
		if(tempAvatar){
			setLocalAvatar(tempAvatar)
		}else{
			setAvatarError(true)
		}

		window.onscroll=()=>{
			let unpath = ['/login','/register']
			if(!unpath.includes(window.location.pathname)){

				let $nav = document.querySelector('nav')
				let $headerLogo = document.querySelector('.header-logo')
				let $a = document.querySelectorAll('.menu-nav a')
				let $loginBtn = document.querySelector('#loginBtn')
				let $profileDropdown = document.querySelector('#profileDropdown a')
				if(window.scrollY <= 10){
					$profileDropdown?.classList.add('text-white')
					$a?.forEach(f=>f.classList.add('text-white'))
					$nav?.classList.remove('nav-blur')
					$headerLogo?.classList.add('text-white')
					$nav?.classList.add('shadow-none')
				}else{
					$profileDropdown?.classList.remove('text-white')
					$a?.forEach(f=>f.classList.remove('text-white'))
					$nav?.classList.add('nav-blur')
					$headerLogo?.classList.remove('text-white')
					$nav?.classList.remove('shadow-none')
				}
			}
		}
	})
	return(
		<nav className="navbar top-0 w-100 shadow-sm">
		  <div className="container">
			<a className="navbar-brand d-flex" href="/">
				<img className="img-fluid p-2" width="50" src={headerLogo}/>
				<div className="header-logo text-white">
					<h3 className="fs-5">Telkom</h3>
					<p className="fs-6">University</p>
				</div>
			</a>
			<div className="dropdown">
			  <span id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
			    {isLogged ? 
			    	<img src={props.avatar || localAvatar} className="img-profile-header" onError={(e)=>e.target.src=profile_png}/>:
			    	<a className="text-white" href="#"><i className="bi bi-person-circle fs-1"></i></a>
			    }
			  </span>
			  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
			    <li><a className="dropdown-item" href="/profile">Profil</a></li>
			    <li><hr className="dropdown-divider"/></li>
			    {isLogged ? 
			    	<li><a className="dropdown-item" href="#" onClick={Logout}>Logout</a></li>:
			    	<li><a className="dropdown-item" href="/login">Login</a></li>
			    }
			  </ul>
			</div>
		  </div>
		</nav>
	)

}

export default Header;