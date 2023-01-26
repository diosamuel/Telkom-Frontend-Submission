async function AuthToken(refreshToken){

	const API_URL = '/profile'
	
	let req = await fetch(API_URL,{
		method: "GET",
		headers: { 'Authorization': `Bearer ${refreshToken}` },
	})

	try{
		if(req.status !== 200) return { accessToken:null }

		let res = await req.json()
		return res

  	}catch(err){
  		return { accessToken:null }
  	}

}


export { AuthToken }