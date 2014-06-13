var express = require("express");
var _ = require('lodash');

/* Reimplement this function to answer questions. */
var answer = function(question, req, res) {
    var largestMatch = question.match(/which of the following numbers is the largest:(.*)/);
    var bananaColourMatch = question.match(/what colour is a banana/);
    var spainCurrencyMatch = question.match(/what currency did Spain use before the Euro/);
    if(largestMatch){
        console.log('largest number', largestMatch[1].split(','));
        var numbers = _.map(largestMatch[1].split(','), function(number) {
            return Number(number);
        });
        console.log('numbers', numbers);
        return _.max(numbers);
    } else if (bananaColourMatch) {
        return 'yellow';
    } else if (spainCurrencyMatch) {
        return 'peseta';
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