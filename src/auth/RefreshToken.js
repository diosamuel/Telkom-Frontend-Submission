async function RefreshToken(refreshToken){

	const API_URL = '/refresh'
	
	let req = await fetch(API_URL,{
		method: "GET",
		headers: { 'Authorization': `Bearer ${refreshToken}` },
	})

	try{
		if(req.status !== 200) return {token:null}

		let res = await req.json()
		return res

  	}catch(err){
  		return {token:null}
  	}

}

export { RefreshToken }