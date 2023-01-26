async function TelkomAuthToken(refreshToken){

	const API_URL = 'https://dev-gateway.telkomuniversity.ac.id/issueprofile'
	
	let req = await fetch(API_URL,{
		method: "GET",
		headers: { 'Authorization': `Bearer ${refreshToken}` },
	})

	try{
		if(req.status !== 200) return {fullname: null, numberid: null, photo: null, success:false}
		
		let res = await req.json()
		return res

  	}catch(err){
  		return {fullname: null, numberid: null, photo: null, success:false, error:true}
  	}

}


export { TelkomAuthToken }