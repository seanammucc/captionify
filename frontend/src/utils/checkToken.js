export async function checkToken(){
    const response = await fetch('http://localhost:5000/api/checktoken', {
        credentials: 'include'
    })
    return response
}