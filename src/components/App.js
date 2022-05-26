import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  //list of questions lives here and feeds up from form and down to list
  const [questions, setQuestions] = useState([])

  function handleDelete(id){

    console.log('hello from app, ready to delete', id)
    //delete from server
    fetch(`http://localhost:4000/questions/${id}`,{method:"DELETE"}).then(r=>r.json()).then(d=>setQuestions([...questions].filter(e=>e.id !== id)))

    //d=>setQuestions([...questions].filter(e=>e.id !== id))
    //delete from state

  }

  function handleSubmit(formData){
  const post = {
      "prompt": formData.prompt,
      "answers": [formData.answer1, formData.answer2, formData.answer3, formData.answer4],
      "correctIndex": formData.correctIndex
    }

    fetch(
      "http://localhost:4000/questions", {method: "POST",
      headers: {
        'Content-Type': 'application/json'},
        body: JSON.stringify(post)}
    ).then(r=>r.json).then(d=>console.log(d))


    setQuestions(
      [...questions,post]

    )

  }

  function handlePatch(id,integer){

    fetch(`http://localhost:4000/questions/${id}`,{
      method: 'PATCH',
      body: JSON.stringify({"correctIndex": integer}),
      headers: {
        'Content-type': 'application/json',
    }}).then(r=>r.json()).then(data=>setQuestions(q=>q.map(q=>q.id===id?data:q)))

  }

  useEffect(
    ()=>fetch('http://localhost:4000/questions').then(r=>r.json()).then(data=>setQuestions(data))
    ,[]
  )

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm handleSubmit={handleSubmit}/> : <QuestionList handlePatch={handlePatch} handleDelete={handleDelete} questions={questions} />}
    </main>
  );
}

export default App;
