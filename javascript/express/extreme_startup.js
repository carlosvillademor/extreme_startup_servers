var express = require("express");
var _ = require('lodash');

/* Reimplement this function to answer questions. */
var answer = function(question, req, res) {
    var largestMatch = question.match(/which of the following numbers is the largest:(.*)/);
    if(largestMatch){
        console.log('largest number', largestMatch[1].split(','));
        var numbers = _.map(largestMatch[1].split(','), function(number) {
            return Number(number);
        });
        return _.max(numbers);
    }
};

var app = express();
app.use(express.cookieParser());
app.use(express.session({
    "secret": "bodilpwnz"
}));

app.get("/", function(req, res) {
    var q = req.param("q");
    var a = answer(q, req, res);
    console.log("Q: \"" + q + "\" A:\"" + a + "\"");
    res.end(a);
});

app.listen(8000, "localhost");
console.log("Server running on localhost");