
var answer = [];
var first = [];
var newXHR = new XMLHttpRequest();

newXHR.open("GET", "http://localhost:3333/api/candidates");

newXHR.send();

newXHR.onload = function (response) {
    
    if (newXHR.status === 200) {
        answer = JSON.parse(newXHR.responseText);
        first = answer;
        render()
    }
}

// function load() {
//     setInterval(function(){clear(), render()}, 200)
// };
function render() {
  
    if (answer.length == 0) {
        
        
    } else {
        
        // creating img placeholder if there is no profile picture
        imgPlaceholder = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"

        answer.forEach(element => {
            if (element.avatar == "") {
                element.avatar = imgPlaceholder;
            }
            // creating element
            var div = document.createElement("div");
            // adding classes to element
            div.classList.add("card", "col-xs-6",  "col-sm-6", "col-md-4", "col-md-3");
            // adding style to element
            div.style = "width:18rem";
            var row = document.getElementById("row");
            var string = `<a href="./singleReport.html"><img class="card-img-top" src="` + element.avatar + `" alt="Card image cap">
        <div class="card-body col-sm-">
        <h5 class="text-center">` + element.name + `</h5>
        <p class="card-text text-center">` + element.email + `</p>
        </div></a>`
            div.innerHTML = string;

            row.appendChild(div);

        }
        );
    }
}
// clearing row for re-rendering
function clear() {
    var row = document.getElementById("row");
    row.innerHTML = "";
}
render()

////// search

var search = document.getElementById("search");

search.addEventListener("keyup", function(e) {
    answer = first.filter(element => {
        if (element.name.toLowerCase().startsWith(e.target.value.toLowerCase())) {
            return true;
        } else return false;
    })
     clear();
     render();
    
})



