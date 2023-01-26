import { React } from "react";
import Header from "./Header";
import Footer from "./Footer";

function Home(){
return(
	<>
		<Header/>
		<div>
			<div className="img-jumbotron h-50"></div>
			<div className="position-relative text-light text-jumbotron container">
				<h1 className='fs-header'>Sistem Informasi Mahasiswa</h1>
			</div>
		</div>
		<div className="container content  d-flex justify-content-center align-items-center">
  			<div className='row gy-4'>
  				<div className="content-title">
  					<h3>Menu Sistem</h3>
  				</div>
				<div className="col-md-4 card text-start">
				  <div className="card-body rounded">
				  	<div className='fs-1 mb-2'><i className="bi bi-person-plus-fill"></i></div>
				    <h4 className="card-title fw-bold">Buat Akun</h4>
				    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed semper tempor ex, quis dapibus ex ullamcorper venenatis. </p>
				    <a href="/register" className="btn btn-primary btn-content rounded-pill text-center p-2 fw-bold shadow">Registrasi</a>
				  </div>
				</div>
				<div className="col-md-4 card text-start">
				  <div className="card-body rounded">
				  	<div className='fs-1 mb-2'><i className="bi bi-person-circle"></i></div>
				    <h4 className="card-title fw-bold">Masuk Kedalam Sistem</h4>
				    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed semper tempor ex, quis dapibus ex ullamcorper venenatis. </p>
				    <a href="/login" className="btn btn-success btn-content rounded-pill text-center p-2 fw-bold shadow">Login</a>
				  </div>
				</div>
				<div className="col-md-4 card text-start">
				  <div className="card-body rounded">
				  	<div className='fs-1 mb-2'><i className="bi bi-file-text"></i></div>
				    <h4 className="card-title fw-bold">Lihat Profil Kamu</h4>
				    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed semper tempor ex, quis dapibus ex ullamcorper venenatis. </p>
				    <a href="/profile" className="btn btn-primary btn-content rounded-pill text-center p-2 fw-bold shadow">Profil</a>
				  </div>
				</div>
  			</div>
		</div>
		<Footer/>
	</>
)
}

export default Home;