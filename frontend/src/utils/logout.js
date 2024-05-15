export async function logout(setLoggedIn){
    fetch('http://localhost:5000/logout', {
        credentials: 'include'
    })
    setLoggedIn(false)
    window.location.reload()
}