
var newXHR = new XMLHttpRequest();

newXHR.open("GET", "http://localhost:3333/api/candidates");

newXHR.send();

newXHR.onload = function(response) {
    if (newXHR.status === 200) {
        var answer = JSON.parse(newXHR.responseText);

        // creating img placeholder if there is no profile picture
        imgPlaceholder = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"

        answer.forEach(element => {
            if (element.avatar == "") {
                element.avatar = imgPlaceholder;
            }
            // creating element
            var div = document.createElement("div");
            // adding classes to element
            div.classList.add("card", "col-sm-3");
            // adding style to element
            div.style = "width:18rem";
            var row = document.getElementById("row");
            var string = `<img class="card-img-top" src="` + element.avatar + `" alt="Card image cap">
            <div class="card-body col-sm-">
              <h5 class="text-center">` + element.name + `</h5>
              <p class="card-text text-center">` + element.email + `</p>
              </div>`
            div.innerHTML = string;
            
            row.appendChild(div);

        });
        
    }
}


