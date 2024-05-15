import { checkToken } from "./checkToken"


export async function checkUserCredentials(setLoggedIn) {
    const token = await checkToken()
    console.log(token.status)
    console.log(token.ok)
    //console.log(response)
    if (token.ok) {
        console.log('set true')
        setLoggedIn(true)
    }
    else {
        console.log('setfalse')
        setLoggedIn(false)
    }
    }