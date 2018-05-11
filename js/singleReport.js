(function() {

var request = $.get("http://localhost:3333/api/candidates");

request.done(function(response) {
    // gettind id from storage
    var id = JSON.parse(localStorage.getItem("id"));

    // getting the correct data from server
    var candidate = response.find(obj =>  obj.id === id);

    // appending content to DOM
    var div = $("div.row");
    div.html(template(candidate.avatar, candidate.name, candidate.email, candidate.birthday, candidate.education))

  
function template(avatar, name, email, dateOfBirth, education) {
    return `<img class="col-sm-4" src=` + avatar +  `alt="">
            <div class="col-sm-4">
                <div>Name:
                    <h2 class="h2">` + name +`</h2>
                </div>
                <div class="div">Email:
                    <h2 class="h2">` + email +`</h2>
                </div>
            </div>
            <div class="col-sm-4 ">
                <div>Date of birth:
                    <h2 class="h2">` + dateOfBirth+ `</h2>
                </div>
                <div class="div">Education:
                    <h2 class="h2">` + education + `</h2>
                </div>
            </div>`
}

    
})
}) ();