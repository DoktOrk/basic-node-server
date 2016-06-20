var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var parseUrlencoded = bodyParser.urlencoded({extended: false});

var plusDataBox = {
    "Testa": "Additional data for Test a",
    "Testb": "Additional data for Test b",
    "Testc": "Additional data for Test c"
};

router.route("/")
.get(function(request, response){
    response.json(Object.keys(plusDataBox));
})
.post(parseUrlencoded, function(request, response){
    var newOption = request.body;
    plusDataBox[newOption.name] = newOption.description;
    response.status(201).json(newOption.name);
});

router.route("/:name")
.all(function(request, response, next){
    var name = request.params.name;
    var normalizedNameInNormalizer = name[0].toUpperCase() + name.slice(1).toLowerCase();
    request.normalizedName = normalizedNameInNormalizer;

    next();
})
.get(function(request, response){
    var plusData = plusDataBox[request.normalizedName];
    if(!plusData){
        response.status(404).json("property not found for: " + request.params.name);
    }else{
        response.json(plusData);
    }
})
.delete(function(request, response){
    delete plusDataBox[request.normalizedName];
    response.sendStatus(200);
});


module.exports = router;