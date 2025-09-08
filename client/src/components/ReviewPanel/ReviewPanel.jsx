import React from 'react';
import { useState, useEffect, useContext } from 'react';
import './ReviewPanel.css';
import { WordContext } from '../../context/WordContext';

function ReviewPanel() {

   const [answerShown, setAnswerShown] = useState(false);
   const { dueWords, updateSRS, getDue } = useContext(WordContext);

   const [reviews, setReviews] = useState(dueWords);
   const [currentIndex, setCurrentIndex] = useState(0);
   const [totalWrong, setTotalWrong] = useState(0);
   const [totalCorrect, setTotalCorrect] = useState(0);
   const [originalDueCount, setOriginalDueCount] = useState(dueWords.length);
   const reviewsLeft = reviews.length - currentIndex;

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
   const progress = originalDueCount > 0 ? (totalCorrect / originalDueCount) * 100 : 0;

   useEffect(() => {
      console.log('progress: ', progress);
      console.log('originalDueCount: ', originalDueCount);
   }, [progress]);

return (
  <div className='review-panel-div page'>
    <h3 className='page-header'>Review</h3>

    
   {/* <h3 className='words-due-h3'>{reviewsLeft}</h3> */}
    {/* <div className="progress-circle" style={{ "--progress": `${progress}%`}}>
      <div className="progress-circle-inner">
         <h3 className='words-due-h3'>{reviewsLeft}</h3>
      </div>
    </div> */}
    
   {/* <div className='progress-bar'>
      <div style={{width: `${progress}%`}} className="progress-bar-fill"></div>
   </div> */}



   {/* <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M34 17C34 26.3888 26.3888 34 17 34C7.61116 34 0 26.3888 0 17C0 7.61116 7.61116 0 17 0C26.3888 0 34 7.61116 34 17ZM2.88452 17C2.88452 24.7958 9.20423 31.1155 17 31.1155C24.7958 31.1155 31.1155 24.7958 31.1155 17C31.1155 9.20423 24.7958 2.88452 17 2.88452C9.20423 2.88452 2.88452 9.20423 2.88452 17Z" fill="#D9D9D9"/>
      <path d="M17 0C19.2325 2.6622e-08 21.4431 0.439718 23.5056 1.29405C25.5682 2.14838 27.4422 3.40059 29.0208 4.97919C30.5994 6.55778 31.8516 8.43185 32.706 10.4944C33.5603 12.5569 34 14.7675 34 17L31.1155 17C31.1155 15.1463 30.7504 13.3108 30.041 11.5982C29.3316 9.88567 28.2919 8.32959 26.9812 7.01885C25.6704 5.7081 24.1143 4.66836 22.4018 3.959C20.6892 3.24963 18.8537 2.88452 17 2.88452V0Z" fill="#313131"/>
      <path d="M14.3253 13.2727V22H12.7443V14.8111H12.6932L10.652 16.1151V14.6662L12.821 13.2727H14.3253ZM19.767 22.1662C19.0653 22.1662 18.4631 21.9886 17.9602 21.6335C17.4602 21.2756 17.0753 20.7599 16.8054 20.0866C16.5384 19.4105 16.4048 18.5966 16.4048 17.6449C16.4077 16.6932 16.5426 15.8835 16.8097 15.2159C17.0795 14.5455 17.4645 14.0341 17.9645 13.6818C18.4673 13.3295 19.0682 13.1534 19.767 13.1534C20.4659 13.1534 21.0668 13.3295 21.5696 13.6818C22.0724 14.0341 22.4574 14.5455 22.7244 15.2159C22.9943 15.8864 23.1293 16.696 23.1293 17.6449C23.1293 18.5994 22.9943 19.4148 22.7244 20.0909C22.4574 20.7642 22.0724 21.2784 21.5696 21.6335C21.0696 21.9886 20.4688 22.1662 19.767 22.1662ZM19.767 20.8324C20.3125 20.8324 20.7429 20.5639 21.0582 20.027C21.3764 19.4872 21.5355 18.6932 21.5355 17.6449C21.5355 16.9517 21.4631 16.3693 21.3182 15.8977C21.1733 15.4261 20.9688 15.071 20.7045 14.8324C20.4403 14.5909 20.1278 14.4702 19.767 14.4702C19.2244 14.4702 18.7955 14.7401 18.4801 15.2798C18.1648 15.8168 18.0057 16.6051 18.0028 17.6449C18 18.3409 18.0696 18.9261 18.2116 19.4006C18.3565 19.875 18.5611 20.233 18.8253 20.4744C19.0895 20.7131 19.4034 20.8324 19.767 20.8324Z" fill="black"/>
   </svg> */}


   <svg
  className="progress-svg"
  width="40"
  height="40"
  viewBox="0 0 36 36"
  xmlns="http://www.w3.org/2000/svg"
>
  {/* Background circle */}
  <circle
    className="progress-bg"
    cx="18"
    cy="18"
    r="15.915"
    fill="none"
    stroke="#d9d9d9"
    strokeWidth="3"
  />
  
  {/* Progress circle */}
  <circle
    className="progress-bar"
    cx="18"
    cy="18"
    r="15.915"
    fill="none"
    stroke="#313131"
    strokeWidth="3"
    strokeDasharray="100, 100"
    strokeDashoffset={100 - progress} // 👈 animate this with progress %
  />
  
  {/* Text in the middle */}
  <text
    x="50%"
    y="52%"
    textAnchor="middle"
    dy=".3em"
    fontSize="15"
    fontWeight={500}
    fill="black"
  >
    {reviewsLeft}
  </text>
</svg>



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
      {!answerShown && reviewsLeft !== 0 && (
        <button onClick={toggelAnswerShown} className='review-btn show-answer enabled'>
          show meaning
        </button>
      )}

      {answerShown && reviewsLeft !== 0 && (
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