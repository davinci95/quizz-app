import React from "react";

export default function Quiz(props) {
   const options = [...props.wr_answer, props.cr_answer];

   // function shuffle(array) {
   //    let currentIndex = array.length,
   //       randomIndex;

   //    while (currentIndex != 0) {
   //       randomIndex = Math.floor(Math.random() * currentIndex);
   //       currentIndex--;

   //       [array[currentIndex], array[randomIndex]] = [
   //          array[randomIndex],
   //          array[currentIndex],
   //       ];
   //    }

   //    return array;
   // }

   // shuffle(options);

   const btnOpt = options.map((option, index) => (
      <button
         key={index}
         className={`${props.id} ${
            props.cr_answer === option ? "correct" : ""
         }`}
         onClick={(e) => handleClicks(e)}
      >
         {option}
      </button>
   ));

   function handleClicks(e) {
      const tr = document.querySelectorAll(`.${props.id}`);
      for (let i = 0; i < tr.length; i++) {
         tr[i].style.backgroundColor = "white";
         tr[i].style.color = "black";
      }
      e.target.style.backgroundColor = "#D6DBF5";
      e.target.classList.add("chosen");
   }

   //function decoding all html syntaxes
   function htmlDecode(question) {
      let newQuestion = new DOMParser().parseFromString(question, "text/html");
      return newQuestion.documentElement.textContent;
   }
   //fixing &#39; &quot; errors
   let question = htmlDecode(props.questions);

   return (
      <div className="quiz">
         <p className="quiz--question">{question}</p>
         <div className="quiz--options">{btnOpt}</div>
      </div>
   );
}
