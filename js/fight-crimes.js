let latitude = 0;
let longitude = 0;

if (!window.localStorage.getItem('crime-reported')) {
    window.localStorage.setItem('crime-reported', false);
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {

    }
}

function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
}

getLocation()


window.onload = function () {

    document.getElementById("submit-btn").addEventListener("click", () => {

        var city = document.getElementById("cityId").value;
        var state = document.getElementById("stateId").value;
        var street = document.getElementById("streetId").value;
        var age = document.getElementById("agecategoryList").value;
        var crime = document.getElementById("crimecategoryList").value;
        var desc = document.getElementById("prodDesc").value;

        let status = [];

        if (city.length <= 1) {
            document.getElementById("cityId").style.borderColor = "red";
            status.push("false");
        } else {
            status.push("true");
        }

        if (state.length <= 1) {
            document.getElementById("stateId").style.borderColor = "red";
            status.push("false");
        } else {
            status.push("true");
        }

        if (street.length <= 1) {
            document.getElementById("streetId").style.borderColor = "red";
            document.getElementById("streetId").placeholder = "Please enter valid street";
            status.push("false");
          } else {
            status.push("true");
          }

        if (desc.length < 1) {
            document.getElementById("prodDesc").style.borderColor = "red";
            document.getElementById("prodDesc").value = "";
            document.getElementById("labelDesc").innerHTML =
                "Please enter valid description";
            status.push("false");
        } else {
            status.push("true");
        }

        if (age === "none") {
            document.getElementById("agecategoryList").style.borderColor = "red";
            document.getElementById("age-dropdown").innerHTML = "Please select your age";
            status.push("false");
        } else {
            status.push("true");
        }

        if (crime === "none") {
            document.getElementById("crimecategoryList").style.borderColor = "red";
            document.getElementById("crime-dropdown").innerHTML = "Please select a crime";
            status.push("false");
        } else {
            status.push("true");
        }

        if (status.includes("false")) {

            return false;
        } else {


            //Fetch call to be added

            if(!Boolean(window.localStorage.getItem("crime-report"))){
                fetch('http://localhost:3500/register/complaints', {
                    method: 'POST',
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify({
                        city: city,
                        state: state,
                        street: street,
                        latitude: latitude,
                        longitude: longitude,
                        age: age ,
                        type: crime,
                        description: desc
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        if(data.message){
                            console.log(data)
                            window.localStorage.setItem('crime-reported', true);
                            Swal.fire({
                                icon: 'success',
                                title: 'You are brave and courageous!',
                                text: 'You reported the crime successfully, Dashabhuja is with you!'
                            })
                        } else {
                            console.log('Got some error ', data.error)
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops..',
                                text: 'There was an error posting your query. Please try again!',
                            })

                        }
                    })
                    .catch(err => {
                        // some error
                    })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops..',
                    text: 'You cannot post multiple crime reports!',
                })
            }
        }
    });
};

function logout(event) {
    localStorage.removeItem("token");
}
