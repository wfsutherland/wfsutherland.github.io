function fetchGradeData() {
    //Query db and return grade data
    console.log("Fetching grade data...")
    //Create a new request for HTTP data
    let xhr = new XMLHttpRequest();
    //This is the address on the machine we're asking for data
    let apiRoute = "/api/grades";
    //When the request changes status, we run this anonymous function
    xhr.onreadystatechange = function(){
        let results;
        //check if we're done
        if(xhr.readyState == xhr.DONE){
            //Check if we're successful
            if(xhr.status !== 200){
                console.error(`Could not get grades. Status: ${xhr.status}`);
            }
            //And then call the function to update the HTML with our data
            populateGradebook(JSON.parse(xhr.responseText));
        }
    }.bind(this);
    xhr.open("get", apiRoute, true);
    xhr.send();
}

function populateGradebook(data){
    //take the fetched gade data and populate table
    console.log("Populating gradebook with data:", data)
    let tableElm = document.getElementById("gradebook"); //Gradebook table element
    data.foreach(function(assignment){ //For each row of data we pass in
        let row = document.createElement("tr"); //Create a table row element
        let columns = []; //columns container

        columns.name = document.createElement('td'); //First column: name
        columns.name.appendChild(
            //Concatenate the full name
            document.createTextNode(assignment.last_name + "," + assignment.first_name)
        );

        columns.grade = document.createElement('td'); //Second column: grades
        columns.grade.appendChild(
            //Just putting the grade in, no fancy work needed
            document.createTextNode(assignment.total_grade)
        );

        //Add table data coumns to table row
        row.appendChild(columns.name);
        row.appendChild(columns.grade);
        //Add the row to the table itself
        tableElm.appendChild(row);
    });
}

//TODO: REMOVE THIS
//Call stubs to denostrate workflow
const gradeData = fetchGradeData();
populateGradebook(gradeData);
//END REMOVE