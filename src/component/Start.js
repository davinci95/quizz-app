import React from "react";
import Quiz from "./Quiz";
import { useState, useEffect } from "react";
// import { useId } from "react";

export default function Start() {
   const [datas, setDatas] = useState([]);
   const [start, setStart] = useState(false);
   const [submitted, setSubmitted] = useState(false);
   const [score, setScore] = useState(0);

   useEffect(() => {
      async function getDatas() {
         const res = await fetch("https://opentdb.com/api.php?amount=5");
         const data = await res.json();
         setDatas(data.results);
      }
      getDatas();
   }, []);

   const correct_answers = datas.map((data) => data.correct_answer);
   // const id = useId();

   const questions = datas.map((data, index) => (
      <Quiz
         key={index}
         questions={data.question}
         id={`s${index}`}
         wr_answer={data.incorrect_answers}
         cr_answer={data.correct_answer}
      />
   ));
   // console.log(questions);
   function started() {
      setStart(true);
   }

   function submit() {
      const chosen = document.querySelectorAll(".chosen");
      console.log(chosen);
      for (let i = 0; i < chosen.length; i++) {
         if (chosen[i].textContent != correct_answers[i]) {
            chosen[i].style.backgroudColor = "#F8BCBC";
         } else {
            chosen[i].style.backgroudColor = "#94D7A2";
            setScore((prevScore) => prevScore + 1);
         }
      }
      const correctEl = document.querySelectorAll(".correct");
      for (let i = 0; i < correctEl.length; i++) {
         correctEl[i].style.backgroundColor = "#94D7A2";
      }
      setSubmitted(true);
   }
   function replay() {
      window.location.reload();
   }

   return (
      <div className="app">
         {!start && (
            <div className="start">
               <h1 className="start--header">Quizzical</h1>
               <p className="start--descript">Some description if needed</p>
               <button className="start--btn" onClick={started}>
                  Start Quiz
               </button>
            </div>
         )}
         {start && (
            <div className="question--container">
               <h1 className="header">Your quiz</h1>
               {questions}
               {!submitted && (
                  <button className="submit" onClick={submit}>
                     Check answers
                  </button>
               )}
               {submitted && (
                  <p className="scoring">
                     You scored {score}/5 correct answers{" "}
                     <button className="replay" onClick={replay}>
                        play again
                     </button>
                  </p>
               )}
            </div>
         )}
      </div>
   );
}
