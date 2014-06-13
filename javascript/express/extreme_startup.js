var express = require("express");
var _ = require('lodash');

/* Reimplement this function to answer questions. */
var answer = function(question, req, res) {

//    var fibonnaciMatch = question.match(/what is the (.*) number in the Fibonacci sequence/);
    var largestMatch = question.match(/which of the following numbers is the largest:(.*)/);
    var bananaColourMatch = question.match(/what colour is a banana/);
    var spainCurrencyMatch = question.match(/what currency did Spain use before the Euro/);
    var minusMatch = question.match(/what is (\d+) minus (\d+)/);
    var plusMatch = question.match(/what is (\d+) plus (\d+)/);
    var doublePlusMatch = question.match(/what is (\d+) plus (\d+) plus (\d+)/);
    var eiffelMatch = question.match(/which city is the Eiffel tower in/);
    var pmMatch = question.match(/who is the Prime Minister of Great Britain/);
    if(largestMatch){
        var numbers = _.map(largestMatch[1].split(','), function(number) {
            return Number(number);
        });
        return _.max(numbers);
    } else if (bananaColourMatch) {
        return 'yellow';
    } else if (spainCurrencyMatch) {
        return 'peseta';
    } else if (minusMatch) {
        return (_.reduce(minusMatch.splice(1), function(number1, number2) {
            return number1 - number2;
        })).toString();
    } else if (doublePlusMatch) {
        return _.reduce(doublePlusMatch.splice(1), function(number1, number2) {
            return Number(number1) + Number(number2);
        });
    } else if (plusMatch) {
        return _.reduce(plusMatch.splice(1), function(number1, number2) {
            return Number(number1) + Number(number2);
        });
    } else if (eiffelMatch) {
        return 'Paris';
    } else if (pmMatch) {
        return 'David Cameron';
    }
};

function fibonnaci(number) {
    if(number===1 || number===2) return number-1;
    return fibonnaci(number-2) + fibonnaci(number-1);
}

var app = express();
app.use(express.cookieParser());
app.use(express.session({
    "secret": "bodilpwnz"
}));

app.get("/", function(req, res) {
    var q = req.param("q");
    var a = answer(q, req, res);
    console.log("Q: \"" + q + "\" A:\"" + a + "\"");
    res.send(a);
});

app.listen(8000, "localhost");
console.log("Server running on localhost");