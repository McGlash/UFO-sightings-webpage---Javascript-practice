//create function to loop through data items and inserts rows when they match input
function Loop(spec){        
    
    spec.forEach(item => {

        //select element
        var htmlTable = d3.select("tbody");
    
        //append table row
        var row = htmlTable.append("tr");
    
        //append data element and insert data
        Object.entries(item).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value)
        });
    });
};

// pull in data from data.js
var tableData = data;

// insert table rows then insert data
Loop(tableData);

//filter based on input 

    //setup elements for trigger
var inputDate = d3.select("#datetime");
var inputCity = d3.select("#city");
var inputState = d3.select("#state");
var inputCountry = d3.select("#country");
var inputShape = d3.select("#shape");

var filterButton = d3.select(".filterbutton");
var resetButton = d3.select(".resetbutton");

  //create function that serve as filter action
function filter() {

        //capture input
        var dateSpecifier = inputDate.property("value");
        var citySpecifier = inputCity.property("value");
        var stateSpecifier = inputState.property("value");
        var countrySpecifier = inputCountry.property("value");
        var shapeSpecifier = inputShape.property("value");

        //create array of input variables

        var variables = [{[citySpecifier] : "city"}, 
                        {[stateSpecifier] : "state"}, 
                        {[countrySpecifier] : "country"}, 
                        {[shapeSpecifier] : "shape"}];

        //setup of tracking variables

        var filteredData = tableData;

        var track = 0

        //create function to evaluate and act on input

         //clear table
         d3.select("tbody").html('');

        //verify whether any input is provided
        if (dateSpecifier.length == 0 && citySpecifier.length == 0 && stateSpecifier.length == 0 && countrySpecifier.length == 0 && shapeSpecifier.length == 0) {
            alert("Please specify");
            Loop(filteredData);
            return false;
        }
        
        //other loop through inputs and filter data
        else {

            //date 
            if (dateSpecifier.length != 0){

                //verify input matches what is available/alert if not

                var test = tableData.filter(item => item["datetime"] === dateSpecifier);

                    if (test.length==0) {
                        alert ("date not available")
                    }
                    else {
                    //filter data based on specified iput
                        filteredData = filteredData.filter(item => item["datetime"] === dateSpecifier);
                    }
            }
            else {};

            //loop of other input
            variables.forEach(item => {
            
            Object.entries(item).forEach(([key1, value1]) => {
                
                if (key1.length != 0){

                //verify input matches what is available/alert if not

                var test = tableData.filter(item => item[value1] === key1);

                    if (test.length==0) {
                        alert (`${value1} not available`)
                    }
                    else {
                    //filter data based on specified iput
                    filteredData = filteredData.filter(item => item[value1] === key1);
                    }
                }   

                else {};

            });
            });

        //update table 

        //verify table is not empty
        if(filteredData == 0) {
            alert("No sightings meeting specified criteria")
            Loop(tableData);
        }
        else{
        Loop(filteredData);
        };
        };
};

//reset function

function reset() {
    //clear table
    d3.select("tbody").html('');

    //reset table
    Loop(tableData);
};

    //setup triggers
filterButton.on("click", filter);

//setup triggers
resetButton.on("click", reset);