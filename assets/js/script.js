var input = document.getElementById("usernameInput");

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("search").click();
  }
});

function searchUser() {
  let user = document.getElementById("usernameInput").value;

  if (user === "") {
    document.getElementsByName("username")[0].placeholder =
      "You must type an username...";
  } else {
    let url = `https://api.github.com/users/${user}`;

    fetch(url)
      .then(function (response) {
        return response.json();
      })

      .then(function (data) {
        let avatar = document.getElementById("avatar");
        let name = document.getElementById("name");
        let bio = document.getElementById("bio");
        let username = document.getElementById("username");
        let username2 = document.getElementById("username2");
        let followers = document.getElementById("followers");
        let following = document.getElementById("following");

        avatar.innerHTML = `<img class="avatar" src="${data.avatar_url ?? './assets/images/github-logo.svg'}" width="150px" />`;
        name.innerHTML = `<b>${data.name ?? 'User not found'}</b>`;
        username.innerHTML = `<a class="username" href="https://github.com/${data.login ?? '404'}" target="_blank"> @${data.login ?? '🤷‍♂️'}</a>`;
        bio.innerHTML = data.bio ?? 'Try searching for another user 🔎';
        username2.innerHTML = `<a class="username" href="https://github.com/${data.login ?? '404'}" target="_blank"> @${data.login ?? '🤷‍♂️'}</a>`;
        followers.innerHTML = data.followers ?? '0';
        following.innerHTML = data.following ?? '0';
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
      clearRepo();
      let userRepo = document.getElementById("userRepo");

      for (i = 0; i < dataR.length; i++) {
        userRepo.innerHTML += `<div class="repo"> <a id="link${i}" href="${dataR[i].html_url}" target="_blank">${dataR[i].name}</a> </div>`;
      }
    });
}

function clearRepo() {
  document.getElementById("userRepo").innerHTML = "";
}
