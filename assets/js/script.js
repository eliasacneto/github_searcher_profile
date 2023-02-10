function searchUser(){

  let user = document.getElementById('usernameInput').value;
  let url = `https://api.github.com/users/${user}`;


  fetch(url)
    .then(function(response){
      return response.json()
    })
    .then(function(data){
      let avatar = document.getElementById('avatar');
      let name = document.getElementById('name');
      let location = document.getElementById('location');
      let bio = document.getElementById('bio');
      let username = document.getElementById('username');
      let username2 = document.getElementById('username2');

      avatar.innerHTML = `<img src="${data.avatar_url}" />`
      name.innerHTML = `<b>${data.name}</b>`
      bio.innerHTML = data.bio 
      username.innerHTML = "@" + data.login
      username2.innerHTML = "@" + data.login
    })

    repos()

}


function resetField(){
  document.getElementById('usernameInput').value = ''
}

function repos(){
  let user = document.getElementById('usernameInput').value;
  let urlR = `https://api.github.com/users/${user}/repos`

  fetch(urlR)
    .then(function(responseR){
      return responseR.json()
    })
    .then(function(dataR){
      let userRepo = document.getElementById('userRepo')

      for(i=0; i<dataR.length; i++){
        userRepo.innerHTML += `<div class="repositories"> <a id="link${i}" href="${dataR[i].html_url}" target="_blank">${dataR[i].name}</a> </div>`
      }
      
    })
}