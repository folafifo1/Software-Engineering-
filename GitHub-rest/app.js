function handleInput() {
    var username = document.getElementById('username').value
    
    console.log(username)
    var user = document.getElementById("user");
    user.innerHTML = username;

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
