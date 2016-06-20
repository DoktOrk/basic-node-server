var express = require("express");
var app = express();
const port = 1985;

var logger = require("./logger");
app.use(logger);

app.use(express.static("public"));

var dataPackOne = require("./routes/datapackone");     //you don't have to use an other file (see below), but it's clearer when the application is bigger
app.use("/redirectedtotest", dataPackOne);


app.get("/", function(request, response){
    console.log(`express functional`);
    response.sendFile(__dirname + "/public/index.html");
});



app.get("/testarray", function(request, response){
    response.redirect(301, "/redirectedtotest");
});


var exampleDataBox = {
    "Testa": "Example of more additional data for Test a",
    "Testb": "Example of more additional data for Test b",
    "Testc": "Example of more additional data for Test c"
};

app.get("/example/:name", function(request, response){
    var exampleData = exampleDataBox[request.normalizedName];
    if(!exampleData){
        response.status(404).json("property not found for: " + request.params.name);
    }else{
        response.json(exampleData);
    }
});



app.listen(port, function(){
    console.log(`server is listening on ${port}`);
});



//issue1: If you submit an input, that already exists, it will be overwritten
//issue2: the data of the inputs with inappropriate name formats is not accessible
//issue3: css file is empty
//issue4: .gitignore file is empty