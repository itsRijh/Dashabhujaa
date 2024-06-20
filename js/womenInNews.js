document.getElementById("preloader").style.display = "block";


window.onload = () => {

    const shortenAnswer = (answer) => {
        let content = "";
        for (let i = 0; i < (answer.length > 100 ? 100 : answer.length); i = i + 1) {
            content = content + answer[i];
        }
        return content;
    }

    function getUniqueListBy(arr, key) {
        return [...new Map(arr.map(item => [item[key], item])).values()]
    }

    fetch('http://localhost:3500/news')
        .then(res => res.json())
        .then(res => {
            const newsOne = res.message.data;
            news = getUniqueListBy(newsOne, 'title')
            let content = ""
            news.forEach(ele => {
                if(ele.image){
                  content = content +
                      `<div class="col-12 col-lg-4" style="padding: 5px">
                          <div class="card" style="width: 20rem;margin: auto auto; border-radius: 10px;">
                          <img class="card-img-top" src=${ele.image} alt="Card image cap">
                          <div class="card-body">
                              <h5 class="card-title">${ele.title}</h5>
                              <p class="card-text">${shortenAnswer(ele.description)}.....</p>
                              <a href=${ele.url} class="btn women-news-btn">Read more</a>
                          </div>
                          </div>
                      </div>`
                }
            })
            document.getElementById("women-in-news").innerHTML = content;
            document.getElementById("preloader").style.display = "none";
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "There was some error, contact mukhopadhyaybaivab77@gmail.com.",
          })
        });

}


const token = localStorage.getItem("token")
fetch("http://localhost:3500/auth/isloggedin", {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': token
    }
})

    .then(response => response.json())
    .then((res) => {

        let userDetails = "";
        if (res.message) {
            userDetails =
                userDetails +
                `
            <img src=${res.profile_pic} class="buy-prod-profile-navbar">
            <div id="user-navbar-name" style="color: black;"> ${res.name} </div>`;
            document.getElementById("user-navbar-details").innerHTML = userDetails;
        } else {
            document.getElementById("login-signup").innerHTML = `<li class="nav-item" style="padding-left: 30px; padding-right: 30px;">
      <a class="nav-link" href="signup.html"
        ><span class="fas fa-user-plus"></span> Signup</a
      >
    </li>
    <li class="nav-item" style="padding-left: 30px; padding-right: 30px;">
      <a class="nav-link" href="login.html"
        ><span class="fas fa-sign-in-alt"></span> Login</a
      >
    </li>`
        }
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error in fetching user details from, fix is login funtion in womenInNews.js",
      })
    });


    function logout(event) {
        localStorage.removeItem("token");
    }
