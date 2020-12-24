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
    
    let url = "https://api.github.com/search/repositories?q=stars:>100000"
    let response = await fetch(url)
    const result = await response.json()
    result.items.forEach(i=>{

        const anchor = document.createElement("a")
        anchor.href = i.html_url;
        anchor.textContent = i.full_name;
        divResult.appendChild(anchor)
        divResult.appendChild(document.createElement("br"))


    })
    console.log(result)
    //result.items.forEach(i=>console.log(i.full_name))
    //result.items.forEach(i=>console.log(i.language))
}

async function details(username,token){
    url = `https://api.github.com/users/${username}`;
    let user = await get(url, token).catch(error => console.error(error));
    console.log(user)
    let login = document.getElementById('login');
    login.innerHTML = `<b>Login ID: </b>${user.login}`;
    
    let num = document.getElementById('num');
    num.innerHTML = `<b>ID: </b>${user.id}`;
    let name = document.getElementById('name');
    name.innerHTML = `<b>Name: </b>${user.name}`;

    let url1 = `https://api.github.com/users/${username}/repos`
     let t = await get(url1, token)
     t.forEach(i=>{

        const anchor = document.createElement("a")
        anchor.href = i.html_url;
        anchor.textContent = i.full_name;
        divResult1.appendChild(anchor)
        divResult1.appendChild(document.createElement("br"))


    })
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