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

var filteredData = tableData;

// insert table rows then insert data
Loop(tableData);

//filter based on input 

    //setup elements for trigger
var inputDate = d3.select("#datetime");

var filterButton = d3.select(".filterbutton");
var resetButton = d3.select(".resetbutton");

  //create function that serves as filter action
function filter() {

        //capture input
        var dateSpecifier = inputDate.property("value");

        //create function to evaluate and act on input

         //clear table
        d3.select("tbody").html('');

        d3.event.preventDefault();

        //verify whether any input is provided
        if (dateSpecifier.length == 0) {
            alert("Please specify");
            Loop(tableData);
            return false;
        }
        
        //otherwise loop through inputs and filter data
        else {

            //verify specified date meets those available
            var test = tableData.filter(item => item["datetime"] === dateSpecifier);
            console.log(test)
            if (test.length==0) {
                
                alert ("date not available")

                Loop(tableData);
            }
            else {
                //filter data based on specified iput
                filteredData = filteredData.filter(item => item["datetime"] === dateSpecifier);

                //update table 
                Loop(filteredData);
            }
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