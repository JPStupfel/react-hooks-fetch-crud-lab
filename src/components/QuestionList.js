import React from "react";
import QuestionItem from "./QuestionItem"
function QuestionList({questions, handleDelete, handlePatch}) {


  const displayQuestions = questions.map(e=> <QuestionItem handleDelete={handleDelete} handlePatch={handlePatch} key={e.id} question = {e}/>)


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{displayQuestions}</ul>
    </section>
  );
}

export default QuestionList;
