// import React from 'react';
// import { useState, useEffect, useContext } from 'react';
// import './ReviewPanel.css';
// import { WordContext } from '../../context/WordContext';

// function ReviewPanel() {

//    const [answerShown, setAnswerShown] = useState(false);
//    const { dueWords, setDueWords, updateSRS } = useContext(WordContext);

//    const [reviews, setReviews] = useState(dueWords);
//    const [currentIndex, setCurrentIndex] = useState(0);
//    const [totalWrong, setTotalWrong] = useState(0);
//    const [totalCorrect, setTotalCorrect] = useState(0);

//    const [finished, setFinished] = useState(false);
//    const [resultsShown, setResultsShown] = useState(false);

//    const [sessionStarted, setSessionStarted] = useState(false);

//    // const reviewsLeft = dueWords.length - currentIndex;
//    const reviewsLeft = reviews.length - currentIndex;

//    useEffect(() => {
//       if (reviewsLeft === 0) {
//          showResults();
         
//       }
//    }, [reviewsLeft]);

//    const showResults = () => {
//       if (!finished) {
//          setResultsShown(true);
//       } else {
//          setResultsShown(false);
//       }
//    }


//    const handleAnswer = (answer) => {
//       const currentWord = dueWords[currentIndex];
      
//       if (!answer) {
//          console.log('error inside handleAnswer: ', answer);
//          return;
//       }

//       if (answer === 'correct') {
//          setCurrentIndex(prevIndex => prevIndex + 1);
//          setTotalCorrect(prev => prev + 1);

//          console.log('current word object: ', currentWord);

//          console.log('current word id: ', currentWord.id);

//          handleUpdate(currentWord.id, 'correct');
         
//       }

//       if (answer === 'wrong') {
//          const updatedDueWords = [...dueWords, currentWord];
//          updatedDueWords.splice(currentIndex, 1);

//          setDueWords(updatedDueWords);

//          setTotalWrong(prev => prev + 1);

//          handleUpdate(currentWord.id, 'wrong');
//       }
      
      
//       setAnswerShown(false);
//    };

//    const handleUpdate = async (wordId, answer) => {
//       const updated = await updateSRS(wordId, answer);

//       if (updated) {
//          console.log('updated successfully');
//       }
//    }

//    const toggelAnswerShown = () => {
//       setAnswerShown(prev => !prev);
//    }

//    const handleFinish = () => {
//       setFinished(true);
//       setTotalCorrect(0);
//       setTotalWrong(0);
//    }

// return (
//   <div className='review-panel-div'>
//     <h2>Words Due: {reviewsLeft}</h2>
    
//     {dueWords.length > 0 && dueWords[currentIndex] ? (
//       <>
//         <h3 className='review-word-h3'>{dueWords[currentIndex].word}</h3>
//         {answerShown && (
//           <p className='review-meaning'>{dueWords[currentIndex].meaning}</p>
//         )}
//       </>
//     ) : (
//       resultsShown && dueWords.length !== 0 && !finished ? (
//          <div className='review-results'>
//             <p>Reviews Finished</p>

//             <span>total correct: {totalCorrect}</span>
//             <span>total wrong: {totalWrong}</span>

//             <button onClick={() => handleFinish()} className='review-results-finish-btn'>Finish</button>
//          </div>
//       ) : (dueWords.length === 0 || finished) && (
//          <p>No reviews for today</p>
//       )
   
//     )}

//    {/* {reviewsLeft !== 0 && !sessionStarted && (
//       <button onClick={() => setSessionStarted(true)} className='review-btn-start-session'>Start Reviews</button>
//    )} */}

//     <div className="review-buttons">
//       {!answerShown && reviewsLeft !== 0 && (
//         <button onClick={toggelAnswerShown} className='review-btn show-answer'>
//           show answer
//         </button>
//       )}

//       {answerShown && reviewsLeft !== 0 && (
//         <>
//           <button onClick={(e) => handleAnswer(e.target.value)} value='wrong' className="review-btn wrong">
//             wrong
//           </button>
//           <button onClick={(e) => handleAnswer(e.target.value)} value='correct' className="review-btn correct">
//             correct
//           </button>
//         </>
//       )}
//     </div>
//   </div>
// );
// }

// export default ReviewPanel
































// import React from 'react';
// import { useState, useEffect, useContext } from 'react';
// import './ReviewPanel.css';
// import { WordContext } from '../../context/WordContext';

// function ReviewPanel() {

//    const [answerShown, setAnswerShown] = useState(false);
//    const { dueWords, updateSRS } = useContext(WordContext); // Removed setDueWords

//    const [reviews, setReviews] = useState(dueWords);
//    const [currentIndex, setCurrentIndex] = useState(0);
//    const [totalWrong, setTotalWrong] = useState(0);
//    const [totalCorrect, setTotalCorrect] = useState(0);

//    const [finished, setFinished] = useState(false);
//    const [resultsShown, setResultsShown] = useState(false);

//    const [sessionStarted, setSessionStarted] = useState(false);

//    const reviewsLeft = reviews.length - currentIndex; // Use reviews instead of dueWords

//    // Update reviews when dueWords changes
//    useEffect(() => {
//       setReviews(dueWords);
//       setCurrentIndex(0); // Reset to first word when due words change
//    }, [dueWords]);

//    useEffect(() => {
//       if (reviewsLeft === 0) {
//          showResults();
//       }
//    }, [reviewsLeft]);

//    const showResults = () => {
//       if (!finished) {
//          setResultsShown(true);
//       } else {
//          setResultsShown(false);
//       }
//    }

//    const handleAnswer = (answer) => {
//       const currentWord = reviews[currentIndex]; // Use reviews instead of dueWords
      
//       if (!answer) {
//          console.log('error inside handleAnswer: ', answer);
//          return;
//       }

//       if (answer === 'correct') {
//          setCurrentIndex(prevIndex => prevIndex + 1);
//          setTotalCorrect(prev => prev + 1);

//          console.log('current word object: ', currentWord);
//          console.log('current word id: ', currentWord.id);

//          handleUpdate(currentWord.id, 'correct');
//       }

//       if (answer === 'wrong') {
//          // Modify local reviews state, not the global dueWords
//          const updatedReviews = [...reviews, currentWord];
//          updatedReviews.splice(currentIndex, 1);

//          setReviews(updatedReviews); // Use local state instead of setDueWords

//          setTotalWrong(prev => prev + 1);

//          handleUpdate(currentWord.id, 'wrong');
//       }
      
//       setAnswerShown(false);
//    };

//    const handleUpdate = async (wordId, answer) => {
//       const updated = await updateSRS(wordId, answer);

//       if (updated) {
//          console.log('updated successfully');
//       }
//    }

//    const toggelAnswerShown = () => {
//       setAnswerShown(prev => !prev);
//    }

//    const handleFinish = () => {
//       setFinished(true);
//       setTotalCorrect(0);
//       setTotalWrong(0);
//    }

// return (
//   <div className='review-panel-div'>
//     <h2>Words Due: {reviewsLeft}</h2>
    
//     {reviews.length > 0 && reviews[currentIndex] ? (
//       <>
//         <h3 className='review-word-h3'>{reviews[currentIndex].word}</h3>
//         {answerShown && (
//           <p className='review-meaning'>{reviews[currentIndex].meaning}</p>
//         )}
//       </>
//     ) : (
//       resultsShown && reviews.length !== 0 && !finished ? (
//          <div className='review-results'>
//             <p>Reviews Finished</p>

//             <span>total correct: {totalCorrect}</span>
//             <span>total wrong: {totalWrong}</span>

//             <button onClick={() => handleFinish()} className='review-results-finish-btn'>Finish</button>
//          </div>
//       ) : (reviews.length === 0 || finished) && (
//          <p>No reviews for today</p>
//       )
   
//     )}

//    {/* {reviewsLeft !== 0 && !sessionStarted && (
//       <button onClick={() => setSessionStarted(true)} className='review-btn-start-session'>Start Reviews</button>
//    )} */}

//     <div className="review-buttons">
//       {!answerShown && reviewsLeft !== 0 && (
//         <button onClick={toggelAnswerShown} className='review-btn show-answer'>
//           show answer
//         </button>
//       )}

//       {answerShown && reviewsLeft !== 0 && (
//         <>
//           <button onClick={(e) => handleAnswer(e.target.value)} value='wrong' className="review-btn wrong">
//             wrong
//           </button>
//           <button onClick={(e) => handleAnswer(e.target.value)} value='correct' className="review-btn correct">
//             correct
//           </button>
//         </>
//       )}
//     </div>
//   </div>
// );
// }

// export default ReviewPanel











































// import React from 'react';
// import { useState, useEffect, useContext } from 'react';
// import './ReviewPanel.css';
// import { WordContext } from '../../context/WordContext';

// function ReviewPanel() {

//    const [answerShown, setAnswerShown] = useState(false);
//    const { dueWords, updateSRS } = useContext(WordContext); // Removed setDueWords

//    const [reviews, setReviews] = useState(dueWords);
//    const [currentIndex, setCurrentIndex] = useState(0);
//    const [totalWrong, setTotalWrong] = useState(0);
//    const [totalCorrect, setTotalCorrect] = useState(0);
//    const [originalDueCount, setOriginalDueCount] = useState(dueWords.length);

//    const [finished, setFinished] = useState(false);
//    const [resultsShown, setResultsShown] = useState(false);

//    const [sessionStarted, setSessionStarted] = useState(false);

//    const reviewsLeft = originalDueCount - totalCorrect; // Words left = original count - words completed correctly

//    // Update reviews when dueWords changes
//    useEffect(() => {
//       setReviews(dueWords);
//       setCurrentIndex(0); // Reset to first word when due words change
//       setOriginalDueCount(dueWords.length); // Track original count
//       setTotalCorrect(0); // Reset counters
//       setTotalWrong(0);
//       setFinished(false);
//       setResultsShown(false);
//    }, [dueWords]);

//    useEffect(() => {
//       if (reviewsLeft === 0) {
//          showResults();
//       }
//    }, [reviewsLeft]);

//    const showResults = () => {
//       if (!finished) {
//          setResultsShown(true);
//       } else {
//          setResultsShown(false);
//       }
//    }

//    const handleAnswer = (answer) => {
//       const currentWord = reviews[currentIndex]; // Use reviews instead of dueWords
      
//       if (!answer) {
//          console.log('error inside handleAnswer: ', answer);
//          return;
//       }

//       if (answer === 'correct') {
//          setCurrentIndex(prevIndex => prevIndex + 1);
//          setTotalCorrect(prev => prev + 1);

//          console.log('current word object: ', currentWord);
//          console.log('current word id: ', currentWord.id);

//          handleUpdate(currentWord.id, 'correct');
//       }

//       if (answer === 'wrong') {
//          // Modify local reviews state, not the global dueWords
//          const updatedReviews = [...reviews, currentWord];
//          updatedReviews.splice(currentIndex, 1);

//          setReviews(updatedReviews); // Use local state instead of setDueWords

//          setTotalWrong(prev => prev + 1);

//          handleUpdate(currentWord.id, 'wrong');
//       }
      
//       setAnswerShown(false);
//    };

//    const handleUpdate = async (wordId, answer) => {
//       const updated = await updateSRS(wordId, answer);

//       if (updated) {
//          console.log('updated successfully');
//       }
//    }

//    const toggelAnswerShown = () => {
//       setAnswerShown(prev => !prev);
//    }

//    const handleFinish = () => {
//       setFinished(true);
//       setTotalCorrect(0);
//       setTotalWrong(0);
//    }

// return (
//   <div className='review-panel-div'>
//     <h2>Words Due: {reviewsLeft}</h2>
    
//     {reviews.length > 0 && reviews[currentIndex] ? (
//       <>
//         <h3 className='review-word-h3'>{reviews[currentIndex].word}</h3>
//         {answerShown && (
//           <p className='review-meaning'>{reviews[currentIndex].meaning}</p>
//         )}
//       </>
//     ) : (
//       resultsShown && reviews.length !== 0 && !finished ? (
//          <div className='review-results'>
//             <p>Reviews Finished</p>

//             <span>total correct: {totalCorrect}</span>
//             <span>total wrong: {totalWrong}</span>

//             <button onClick={() => handleFinish()} className='review-results-finish-btn'>Finish</button>
//          </div>
//       ) : (reviews.length === 0 || finished) && (
//          <p>No reviews for today</p>
//       )
   
//     )}

//    {/* {reviewsLeft !== 0 && !sessionStarted && (
//       <button onClick={() => setSessionStarted(true)} className='review-btn-start-session'>Start Reviews</button>
//    )} */}

//     <div className="review-buttons">
//       {!answerShown && reviewsLeft !== 0 && (
//         <button onClick={toggelAnswerShown} className='review-btn show-answer'>
//           show answer
//         </button>
//       )}

//       {answerShown && reviewsLeft !== 0 && (
//         <>
//           <button onClick={(e) => handleAnswer(e.target.value)} value='wrong' className="review-btn wrong">
//             wrong
//           </button>
//           <button onClick={(e) => handleAnswer(e.target.value)} value='correct' className="review-btn correct">
//             correct
//           </button>
//         </>
//       )}
//     </div>
//   </div>
// );
// }

// export default ReviewPanel










































import React from 'react';
import { useState, useEffect, useContext } from 'react';
import './ReviewPanel.css';
import { WordContext } from '../../context/WordContext';

function ReviewPanel() {

   const [answerShown, setAnswerShown] = useState(false);
   const { dueWords, updateSRS } = useContext(WordContext); // Removed setDueWords

   const [reviews, setReviews] = useState(dueWords);
   const [currentIndex, setCurrentIndex] = useState(0);
   const [totalWrong, setTotalWrong] = useState(0);
   const [totalCorrect, setTotalCorrect] = useState(0);
   const [originalDueCount, setOriginalDueCount] = useState(dueWords.length);

   const [finished, setFinished] = useState(false);
   const [resultsShown, setResultsShown] = useState(false);

   const [sessionStarted, setSessionStarted] = useState(false);

   const reviewsLeft = originalDueCount - totalCorrect; // Words left = original count - words completed correctly

   // Update reviews when dueWords changes
   useEffect(() => {
      setReviews(dueWords);
      setCurrentIndex(0); // Reset to first word when due words change
      setOriginalDueCount(dueWords.length); // Track original count
      setTotalCorrect(0); // Reset counters
      setTotalWrong(0);
      setFinished(false);
      setResultsShown(false);
   }, [dueWords]);

   useEffect(() => {
      if (reviewsLeft === 0 && originalDueCount > 0) {
         showResults();
      }
   }, [reviewsLeft, originalDueCount]);

   // useEffect(() => {
   //    if (reviewsLeft === 0) {
   //       showResults();
   //    }
   // }, [reviewsLeft]);

   const showResults = () => {
      if (!finished) {
         setResultsShown(true);
      } else {
         setResultsShown(false);
      }
   }

   const handleAnswer = (answer) => {
      const currentWord = reviews[currentIndex]; // Use reviews instead of dueWords
      
      if (!answer) {
         console.log('error inside handleAnswer: ', answer);
         return;
      }

      if (answer === 'correct') {
         setCurrentIndex(prevIndex => prevIndex + 1);
         setTotalCorrect(prev => prev + 1);

         console.log('current word object: ', currentWord);
         console.log('current word id: ', currentWord.id);

         handleUpdate(currentWord.id, 'correct');
      }

      if (answer === 'wrong') {
         // Modify local reviews state, not the global dueWords
         const updatedReviews = [...reviews, currentWord];
         updatedReviews.splice(currentIndex, 1);

         setReviews(updatedReviews); // Use local state instead of setDueWords

         setTotalWrong(prev => prev + 1);

         handleUpdate(currentWord.id, 'wrong');
      }
      
      setAnswerShown(false);
   };

   const handleUpdate = async (wordId, answer) => {
      const updated = await updateSRS(wordId, answer);

      if (updated) {
         console.log('updated successfully');
      }
   }

   const toggelAnswerShown = () => {
      setAnswerShown(prev => !prev);
   }

   const handleFinish = () => {
      setFinished(true);
      setTotalCorrect(0);
      setTotalWrong(0);
   }

return (
  <div className='review-panel-div page'>
    <h2>Review</h2>
    
    <h3 className='words-due-h3'>Due Today: {finished ? 0 : reviewsLeft}</h3>
    
    {reviews.length > 0 && reviews[currentIndex] ? (
      <div className='review-word-meaning-flex'>
        <h3 className='review-word-h3'>{reviews[currentIndex].word}</h3>
        {answerShown && (
          <p className='review-meaning'>{reviews[currentIndex].meaning}</p>
        )}
      </div>
    ) : (
      resultsShown && reviews.length !== 0 && !finished ? (
         <div className='review-results'>
            <p>Reviews Finished</p>

            <span>total correct: {totalCorrect}</span>
            <span>total wrong: {totalWrong}</span>

            <button onClick={() => handleFinish()} className='review-results-finish-btn enabled'>Finish</button>
         </div>
      ) : (reviews.length === 0 || finished) && (
         <p>No reviews for today</p>
      )
   
    )}

   {/* {reviewsLeft !== 0 && !sessionStarted && (
      <button onClick={() => setSessionStarted(true)} className='review-btn-start-session'>Start Reviews</button>
   )} */}

    <div className="review-buttons">
      {!answerShown && reviewsLeft !== 0 && !resultsShown && (
        <button onClick={toggelAnswerShown} className='review-btn show-answer enabled'>
          show answer
        </button>
      )}

      {answerShown && reviewsLeft !== 0 && !resultsShown && (
        <>
          <button onClick={(e) => handleAnswer(e.target.value)} value='wrong' className="review-btn wrong enabled">
            wrong
          </button>
          <button onClick={(e) => handleAnswer(e.target.value)} value='correct' className="review-btn correct enabled">
            correct
          </button>
        </>
      )}
    </div>
  </div>
);
}

export default ReviewPanel

































