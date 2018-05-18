(function () {
    // gettind id from storage
    var id = JSON.parse(localStorage.getItem("id"));

    var state = {
        report: []
    }

    function cleanDate(date) {

                
        var date = new Date(date);

        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();


        var interviewdate = day + "/" + month + "/" + year;

        return interviewdate;
    }
      



    function handler() {
        var body = $("body");
        
        
        body.on("click", function (event) {
            var target = $(event.target);
            
            
        if(target.hasClass("triger")) {
        var index = target.data("index");
        var a = state.report[index];
      
        
        renderModal(a.companyName, a.interviewDate, a.phase, a.status, a.note)
          
        }
            
        })
    }

    
    function renderModal(company, date, phase, status, note) {
        
        var date = cleanDate(date)
        $("#company").html("");
        $("#date").html("");
        $("#phase").html("");
        $("status").html("");
        $("note").html("");

        $("#company").html(company);
        $("#date").html(date);
        $("#phase").html(phase);
        $("status").html(status);
        $("note").html(note);
    }

    

    function Report(response) {
        this.companyName = response.companyName;
        this.interviewDate = response.interviewDate;
        this.status = response.status;
        this.phase = response.phase;
        this.note = response.note;
    }


    function Response(response) {
        this.avatar = response.avatar;
        this.name = response.name;
        this.birthday = response.birthday;
        this.email = response.email;
        this.education = response.education
    }




    var request = $.get("http://localhost:3333/api/candidates" + "?id=" + id);


    request.done(function (response) {

        var Candidate = new Response(response[0]);

        // appending content to DOM
        var div = $("div.main");

        div.html(template(Candidate.avatar, Candidate.name, Candidate.email, Candidate.birthday, Candidate.education));


        function template(avatar, name, email, birthday, education) {

            var birthday = cleanDate(birthday)
            return `<img class="col-sm-4" src=` + avatar + `>
            <div class="col-sm-8 main row">
                <div class="col-sm-6">Name:
                    <h2 class="h2">` + name + `</h2>
                </div>
                <div class="col-sm-6">Email:
                    <h2 class="h2">` + email + `</h2>
                </div>
                <div class="col-sm-6">Date of birth:
                    <h2 class="h2">` + birthday + `</h2>
                </div>
                <div class="col-sm-6">Education:
                    <h2 class="h2">` + education + `</h2>
                </div>
            </div>`

        }

        //// fetching reports

        var reportsRequest = $.get("http://localhost:3333/api/reports?candidateId=" + id);


        reportsRequest.done((response) => {
           
            
            response.length > 0 ? reportRender(response) : null

        })

        // rendering reports



        function reportRender(response) {

            var reportArray = [];

            response.forEach((response) => {
                reportArray.push(new Report(response))
            })

            state.report = reportArray;
       
            


            var table = $("#table");
            table.html("");
         

            $(reportArray).each((i, e) => {

              var interviewdate = cleanDate(e.interviewDate)
                var number = i + 1;
              
                

                
               
                return (
                    table.append(`<tr>
                        <th scope="row">` + number + `</th>
                        <td>` + e.companyName + `</td>
                        <td>` + interviewdate + `</td>
                        <td>` + e.status + `</td>
                        <td    class="td">
                        <i data-index="` + i + `" class="triger far fa-eye" data-target="#exampleModal" data-toggle="modal"></i>
                        </tr>`
                    )



                )
            }
                )    }
    



        // removing item from storage

        // $("#button").on("click", function () {
        //     localStorage.clear();
        // })


    })
    handler();
}

)();