var code = new URLSearchParams(window.location.search).get("code");

var questions = [];

var xhr = new XMLHttpRequest();
xhr.onload = function () {
  var json = xhr.responseText;
  json = json.replace(/^[^(]*\(([\S\s]+)\);?$/, "$1");
  json = JSON.parse(json);

  questions = json.content.questions;

  setInterval(answerQuestions, 200);
};

xhr.open(
  "GET",
  "https://st6arucqsa.execute-api.eu-west-1.amazonaws.com/production/pulses/questions/" +
    code
);
xhr.send();

function answerQuestions() {
  var question = questions.find((o) => {
    return o["name"] === $(".m-questions:visible h1").text();
  });
  var bestAnswer = question.answerTemplate.answers.find((o) => {
    return o["value"] === 100;
  });
  $(
    ".m-questions:visible .answer-options:contains('" + bestAnswer.lable + "')"
  ).click();
}
