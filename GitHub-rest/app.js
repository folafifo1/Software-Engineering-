function handleInput() {
    var username = document.getElementById('username').value
    var token = document.getElementById('token').value
    console.log(username)
    details(username,token)
    divResult1.innerHTML = " "
    urls.innerHTML = " "
    if (pieChart != null) pieChart.destroy();
}
const btnRepos = document.getElementById("btnRepos")
btnRepos.addEventListener("click", getRepos)
async function getRepos() {
    divResult.innerHTML= ""
    let url = "https://api.github.com/search/repositories?q=stars:>150000"
    let response = await fetch(url)
    const result = await response.json()
    result.items.forEach(i=>{

        const anchor = document.createElement("a")
        
        anchor.href = i.html_url;
        anchor.textContent = i.full_name;
        divResult.appendChild(anchor)
        const ty = document.createElement("lab")
        ty.innerHTML = "<b> - Language: </b>" + i.language; 
        divResult.appendChild(ty)
        divResult.appendChild(document.createElement("br"))


    })
    console.log(result)
    result.items.forEach(i=>console.log(i.full_name))
    result.items.forEach(i=>console.log(i.language))
}

async function details(username,token){
    url = `https://api.github.com/users/${username}`;
    let user = await get(url, token).catch(error => console.error(error));
    console.log(user)
    
    let login = document.getElementById('login');
    login.innerHTML = `<b>Login ID: </b>${user.login}`;
    
    let picture = document.getElementById('profilepic');
    picture.src= user.avatar_url;


    let num = document.getElementById('num');
    num.innerHTML = `<b>ID: </b>${user.id}`;
    let name = document.getElementById('name');
    name.innerHTML = `<b>Name: </b>${user.name}`;
    let loc = document.getElementById('location');
    loc.innerHTML = `<b>Location: </b>${user.location}`;
    let foll = document.getElementById('followers');
    foll.innerHTML = `<b>Followers: </b>${user.followers}`;

    const anchor = document.createElement("a")
        const tp = document.createElement("label")
        tp.innerHTML = "<b>Link: </b>";
        
        urls.appendChild(tp)
        anchor.href = `${user.html_url}`;
        anchor.textContent = `${user.html_url}`;
        urls.appendChild(anchor)
        urls.appendChild(document.createElement("br"))

    
    
    
    
        let url1 = `https://api.github.com/users/${username}/repos`
     let t = await get(url1, token)
     
     console.log(t)
     t.sort(function(a, b){
        return b.size-a.size
    })
    
    drawpie(t);
    t.forEach(i=>console.log(i.size))







     t.forEach(i=>{

        const anchor = document.createElement("a")
        anchor.href = i.html_url;
        anchor.textContent = i.name;
        divResult1.appendChild(anchor)
        const ty = document.createElement("lab")
        ty.innerHTML = "<b> - Language: </b>" + i.language;  
        divResult1.appendChild(ty)
        divResult1.appendChild(document.createElement("br"))


    })
     console.log(t[0].language)
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


async function drawpie(vals){
    var firstFive = vals.slice(0,5);
    var names = new Array();
    var numbers = new Array();
    for(i=0;i<firstFive.length;i++){
        names[i] = firstFive[i].name   
    }
    for(i=0;i<firstFive.length;i++){
        numbers[i] = firstFive[i].size   
    }
    // for(i=0;i<names.length && numbers.length;i++){
       
    //     console.log(names[i] + " Size = " + numbers[i])
    // }




   firstFive.forEach(i=>console.log(i.name))
    let sizeChart = document.getElementById('pie').getContext('2d');
     pieChart = new Chart(sizeChart, {
        type: 'pie',
        data:{
            labels: names,
            datasets: [{
                label:'Size in Kilobytes',
                data: numbers,
                backgroundColor:[
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    
                    
                  ],
                  borderWidth:1,
                  borderColor:'#777',
                  hoverBorderWidth:3,
                  hoverBorderColor:'#000'
            }],
            
        },

        options:{
            title:{
                display:true,
                text:'Largest Repositories by Size(Kb)',
                fontSize:25,
                fontColor: 'black',
              },
              

        }



    })















}
var pieChart;