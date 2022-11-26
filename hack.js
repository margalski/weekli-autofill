var code = new URLSearchParams(window.location.search).get("code");

fetch(
  `https://st6arucqsa.execute-api.eu-west-1.amazonaws.com/production/pulses/questions/${code}`
)
  .then((res) => res.json())
  .then((json) => {
    setInterval(() => {
      answerQuestions(json.content.questions);
    }, 200);
  });

function answerQuestions(questions) {
  var question = questions.find((o) => {
    return o["name"] === $(".m-questions:visible h1").text();
  });
  var bestAnswer = question.answerTemplate.answers.find((o) => {
    return o["value"] === 100;
  });
  $(
    `.m-questions:visible .answer-options:contains(${bestAnswer.lable})`
  ).click();
}
