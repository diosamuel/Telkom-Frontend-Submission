async function GetToken(dataForm){

	try{
	const API_URL = '/login'
	
	let req = await fetch(API_URL,{
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(dataForm)
	})

		if(req.status == 500){
			return {token:null, expired:null, success:false, error:true}
		}else if(req.status !== 200){
			return {token:null, expired:null, success:false}
		}else{
			let res = await req.json()
			return res
		}
		
  	}catch(err){
  		return {token:null,  expired:null, success:false, error:true}
  	}

}


export { GetToken }