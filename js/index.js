document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    recordInput();
});


//Listening for form submit and capturing the values
function recordInput(){
    document.querySelector('#github-form').addEventListener("submit", function(event){
        event.preventDefault();
        userName = document.querySelector('#search').value;
        //console.log(userName);
        
        getUsers(userName);
        
    });
}


function getUsers(userName){
    let URL = `https://api.github.com/users/${userName}`
    fetch(URL)
        .then(resp => resp.json())
        .then(json => extractInformation(json))
}

//username, avatar and a link to their profile.
function extractInformation(json){
    let pageContainer = document.querySelector('#user-list');

    let h2 = document.createElement('h2');
    h2.innerText = `${json.login}`

    let img = document.createElement('img');
    img.setAttribute('src', `${json.avatar_url}`)

    let a = document.createElement('a');
    a.setAttribute('target', '_blank')
    a.setAttribute('href', `https://github.com/${json.login}`)
    a.innerText = img;

    let p = document.createElement('p');
    p.innerText = `Click image to access GitHub page.`

    let p2 = document.createElement('p');
    p2.innerText = `https://api.github.com/users/${userName}/repos`

    let btn = document.createElement('button');
    btn.setAttribute('id', `${json.login}`)
    btn.innerText = "Repository"

    let user = `${userName}`

    btn.addEventListener('click', () => {
        let URL2 = `https://api.github.com/users/${json.login}/repos`
        fetch(URL2)
            .then(resp => resp.json())
            .then(json => extractRepos(json))
  })

  let userDiv = document.createElement('div');
  userDiv.append(h2, img, p, p2, btn)

  pageContainer.appendChild(userDiv);
}


function extractRepos(json){
    let pageContainer = document.querySelector('#repos-list');
    // json.forEach(element => {
    // });
    repositoryNames = [];
    console.log(json)
    for (const item of json) {
        let p = document.createElement('p');
        p.innerText = (item.name);
        pageContainer.append(p);
      }
}



// Object.values(user)