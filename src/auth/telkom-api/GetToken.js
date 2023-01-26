async function TelkomGetToken(dataForm){

	const API_URL = 'https://dev-gateway.telkomuniversity.ac.id/issueauth'
	
	let req = await fetch(API_URL,{
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(dataForm)
	})

	try{
		if(req.status !== 200) return { token:null, expired:null, success:false }

		let res = await req.json()
		return { ...res, success:true }

  	}catch(err){
  		return { token:null, expired:null, success:false, error:true }
  	}

}


export { TelkomGetToken }