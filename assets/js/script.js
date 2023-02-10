var input = document.getElementById("usernameInput");

input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("search").click();
  }
});

function searchUser() {
  let user = document.getElementById("usernameInput").value;

  if(user === ''){
    alert("Insert an user on InputField")
  } else {
    let url = `https://api.github.com/users/${user}`;

    
  fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    let avatar = document.getElementById("avatar");
    let name = document.getElementById("name");
    let public_repos = document.getElementById("public_repos");
    let bio = document.getElementById("bio");
    let username = document.getElementById("username");
    let username2 = document.getElementById("username2");

    avatar.innerHTML = `<img class="avatar" src="${data.avatar_url}" width="150px" />`;
    name.innerHTML = `<b>${data.name}</b>`;
    bio.innerHTML = data.bio;
    public_repos.innerHTML = data.public_repos;
    username.innerHTML = "@" + data.login;
    username2.innerHTML = "@" + data.login;
  });

repos();
  }


}

function resetField() {
  document.getElementById("usernameInput").value = "";
  window.location.reload();
}

function repos() {
  let user = document.getElementById("usernameInput").value;
  let urlR = `https://api.github.com/users/${user}/repos`;

  fetch(urlR)
    .then(function (responseR) {
      return responseR.json();
    })
    .then(function (dataR) {
      let userRepo = document.getElementById("userRepo");

      for (i = 0; i < dataR.length; i++) {
        userRepo.innerHTML += `<div class="repo"> <a id="link${i}" href="${dataR[i].html_url}" target="_blank">${dataR[i].name}</a> </div>`;
      }
    });
}
