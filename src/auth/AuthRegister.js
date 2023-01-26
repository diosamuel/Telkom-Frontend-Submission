async function AuthRegister(dataForm){
	const formData = new FormData()

	for(let i in dataForm){
		formData.append(i, dataForm[i]);
	}

	const API_URL = '/register'
	
	try{
		let req = await fetch(API_URL,{
			method: "POST",
			body: formData
		})

		let res = await req.json()
		return res
	}catch(err){
		return { status:500, success:false, msg:'Sistem sedang sibuk, coba beberapa saat lagi' }
	}
}


export { AuthRegister }