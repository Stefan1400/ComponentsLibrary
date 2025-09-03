import React from 'react';
import { useState, useEffect, useContext } from 'react';
import './ReviewPanel.css';
import { WordContext } from '../../context/WordContext';

function ReviewPanel() {

   const [answerShown, setAnswerShown] = useState(false);
   const { dueWords, updateSRS } = useContext(WordContext);

   const [reviews, setReviews] = useState(dueWords);
   const [currentIndex, setCurrentIndex] = useState(0);
   const [totalWrong, setTotalWrong] = useState(0);
   const [totalCorrect, setTotalCorrect] = useState(0);
   const [originalDueCount, setOriginalDueCount] = useState(dueWords.length);

   const [finished, setFinished] = useState(false);
   const [resultsShown, setResultsShown] = useState(false);

   const [sessionStarted, setSessionStarted] = useState(false);

   const reviewsLeft = reviews.length - currentIndex;

   // dueWords.forEach(w => {
   //    console.log(w.known);
   // })

   useEffect(() => {
      if (!resultsShown && !finished && dueWords.length > 0) {
         setReviews(dueWords);
         setCurrentIndex(0);
         setOriginalDueCount(dueWords.length);
         setTotalCorrect(0); 
         setTotalWrong(0);
         setFinished(false);
         setResultsShown(false);
      }
   }, [dueWords, resultsShown, finished]);

   useEffect(() => {
      if (reviewsLeft === 0 && originalDueCount > 0) {
         showResults();
      }
   }, [reviewsLeft, originalDueCount]);

   const showResults = () => {
      if (!finished) {
         setResultsShown(true);
      } else {
         setResultsShown(false);
      }
   }


   const handleAnswer = (answer) => {
      const currentWord = reviews[currentIndex];
      
      if (!answer) {
         return;
      }

      if (answer === 'correct') {
         setCurrentIndex(prevIndex => prevIndex + 1);
         setTotalCorrect(prev => prev + 1);

         handleUpdate(currentWord.id, 'correct');
      }


      if (answer === 'wrong') {
         const updatedReviews = [...reviews];
         updatedReviews.splice(currentIndex, 1);
         updatedReviews.push(currentWord);

         setReviews(updatedReviews);
         setTotalWrong(prev => prev + 1);

         handleUpdate(currentWord.id, 'wrong');
      }
      
      setAnswerShown(false);
   };

   const handleUpdate = async (wordId, answer) => {
      const updated = await updateSRS(wordId, answer);

      if (updated) {
      }
   }

   const toggelAnswerShown = () => {
      setAnswerShown(prev => !prev);
   }

   // useEffect(() => {
   //    console.log(reviews[currentIndex].known);
   // }, [])

return (
  <div className='review-panel-div page'>
    {/* <h2>Review</h2> */}
    
    <h3 className='words-due-h3'>Due Today: {finished ? 0 : reviewsLeft}</h3>
    
    {reviews.length > 0 && reviews[currentIndex] ? (
      <div className={`review-word-meaning-flex ${reviews[currentIndex].known ? 'known' : ''}`}>
        <span className='review-known'>{reviews[currentIndex].known ? 'known' : 'learning'}</span>
        <h3 className='review-word-h3'>{reviews[currentIndex].word}</h3>
        {answerShown && (
          <p className='review-meaning'>{reviews[currentIndex].meaning}</p>
        )}
      </div>
    ) : (
         <p className='reviews-no-reviews-today'>You're all caught up! Nothing left to review today</p>
      )
    }
    <div className="review-buttons">
      {!answerShown && reviewsLeft !== 0 && !resultsShown && (
        <button onClick={toggelAnswerShown} className='review-btn show-answer enabled'>
          show meaning
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

export default ReviewPanel;