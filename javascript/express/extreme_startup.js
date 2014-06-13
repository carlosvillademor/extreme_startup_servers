var express = require("express");

var answers = {
    "what is your name": "Darragh-Carlos"
};

/* Reimplement this function to answer questions. */
var answer = function(question, req, res) {
    var actualQuestion = (question.split(':')[1]).trim();
    console.log('actualQuestion', actualQuestion);
    return answers[actualQuestion];
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