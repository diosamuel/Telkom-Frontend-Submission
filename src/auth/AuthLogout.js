async function AuthLogout() {
	const API_URL = '/logout'
	let req = await fetch(API_URL,{
		method: "DELETE",
	})

	return req.json()
}

export { AuthLogout }