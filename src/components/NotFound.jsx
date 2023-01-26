function NotFound(){
	return (
		<div className='d-flex flex-column align-items-center justify-content-center vh-100'>
			<h1 className='text-muted big-text'>404</h1>
			<h3>Not Found</h3>
			<a href="/" className="btn btn-danger shadow rounded-pill"><i class="bi bi-arrow-left"></i> Home</a>
		</div>
	)
}

export default NotFound