const ReviewModel = require('../models/reviewModel');

const getDue = async (req, res) => {
   const userId = req.user.id;
   
   try {

      const fetchedDueWords = await ReviewModel.getDue(userId);

      console.log('fetched due in controller: ', fetchedDueWords);

      return res.status(200).json(fetchedDueWords);

   } catch (err) {
      console.error('500 error when getting due words');
      return res.status(500).json({ error: err });
   }
}

// const updateSRS = async (req, res) => {
//    const userId = req.user.id;
//    const { wordId } = req.params;

//    try {

//       const fetchedWord = await ReviewModel.getWordById(userId, wordId);

//       if (!fetchedWord) {
//          return res.status(404).json({ message: 'word i want to update not found' });
//       }

//       const srsIntervals = {
//          1: 1,
//          2: 2,
//          3: 4,
//          4: 7,
//          5: 14,
//          6: 30,
//          7: 60,
//          8: 120,
//          9: 180
//       };

//       const currentStage = fetchedWord.srs_stage || 1;
//       let nextStage = Math.min(currentStage + 1, 9);
//       let intervalDays = srsIntervals[nextStage];
      
//       const nextReviewAt = new Date();
//       nextReviewAt.setDate(nextReviewAt.getDate() + intervalDays);

//       const updatedReview = await ReviewModel.updateSRS(userId, wordId, nextStage, nextReviewAt);

//       if (!updatedReview) {
//          return res.status(400).json({ message: 'updatedReview didnt work' });
//       }

//       return res.status(200).json(updatedReview);
//    } catch (err) {
//       console.error('500 error when getting due words');
//       return res.status(500).json({ error: err });
//    }
// }
const updateSRS = async (req, res) => {
   const userId = req.user.id;
   const { wordId } = req.params;
   const { answer } = req.body;
 
   console.log('userId and wordId in updateSRS controller: ', userId, wordId, answer);

   try {

      const fetchedWord = await ReviewModel.getWordById(userId, wordId);

      console.log('fetchedWord in updateSRS controller: ', fetchedWord);

      if (!fetchedWord) {
         return res.status(404).json({ message: 'word i want to update not found' });
      }

      if (answer === 'wrong') {
         console.log('answer was wrong, inside wrong');
         
         const resetReview = await ReviewModel.resetReview(userId, wordId);

         console.log('answer was wrong, after resetReview: ', resetReview);

         if (!resetReview) {
            return res.status(409).json({ message: 'review was not correctly reset' });
         }

         return res.status(200).json(resetReview);
      }

      const srsIntervals = {
         1: 1,
         2: 2,
         3: 4,
         4: 7,
         5: 14,
         6: 30,
         7: 60,
         8: 120,
         9: 180
      };
      const currentStage = fetchedWord.srs_stage || 1;

      let nextStage = Math.min(currentStage + 1, 9);
      let intervalDays = srsIntervals[nextStage];
      
      const nextReviewAt = new Date();
      nextReviewAt.setDate(nextReviewAt.getDate() + intervalDays);

      const updatedReview = await ReviewModel.updateSRS(wordId, userId, nextStage, nextReviewAt);

      if (!updatedReview) {
         return res.status(400).json({ message: 'updatedReview didnt work' });
      }

      console.log('after logic updateSRS controller and updatedReview: ', updatedReview);

      return res.status(200).json(updatedReview);
   } catch (err) {
      console.error('500 error when getting due words');
      return res.status(500).json({ error: err });
   }
}

module.exports = {
   getDue,
   updateSRS,
}