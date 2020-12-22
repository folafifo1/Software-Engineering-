function handleInput() {
    var username = document.getElementById('username').value
    var token = document.getElementById('token').value
    console.log(username)
    var user = document.getElementById("user");
    user.innerHTML = username;
    details(username,token)

}
const btnRepos = document.getElementById("btnRepos")
btnRepos.addEventListener("click", getRepos)
async function getRepos() {
    
    const url = "https://api.github.com/search/repositories?q=stars:>100000"
    const response = await fetch(url)
    const result = await response.json()

    result.items.forEach(i=>console.log(i.full_name))
    result.items.forEach(i=>console.log(i.language))
}

async function details(username,token){
    let url = `https://api.github.com/users/${username}/repos`
    let t = await get(url, token)
    console.log(t)
}
async function get(url, token) {
    const headers = {
        'Authorization': `Token ${token}`
    }

    const response = (token == undefined) ? await fetch(url) : await fetch(url, {
        'method': 'GET',
        'headers': headers
    })

    let data = await response.json()
    return data;
}