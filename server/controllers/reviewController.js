const ReviewModel = require('../models/reviewModel');

const getDue = async (req, res) => {
   const userId = req.user.id;
   
   try {

      const fetchedDueWords = await ReviewModel.getDue(userId);

      return res.status(200).json(fetchedDueWords);

   } catch (err) {
      console.error('500 error when getting due words');
      return res.status(500).json({ error: err });
   }
}

const updateSRS = async (req, res) => {
   const userId = req.user.id;
   const { wordId } = req.params;

   console.log('wordId in controller: ', wordId);

   try {

      const fetchedWord = await ReviewModel.getWordById(userId, wordId);

      console.log('after fetched word in controller: ', fetchedWord);

      if (!fetchedWord) {
         return res.status(404).json({ message: 'word i want to update not found' });
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

      console.log('before updating logic');

      const currentStage = fetchedWord.srs_stage || 1;
      let nextStage = Math.min(currentStage + 1, 9);
      let intervalDays = srsIntervals[nextStage];
      
      const nextReviewAt = new Date();
      nextReviewAt.setDate(nextReviewAt.getDate() + intervalDays);

      console.log('after updating logic before next model call');

      console.log('values to pass in: ', userId, wordId, nextStage, nextReviewAt);

      const updatedReview = await ReviewModel.updateSRS(userId, wordId, nextStage, nextReviewAt);

      console.log('after updated model call: ', updatedReview);

      if (!updatedReview) {
         return res.status(400).json({ message: 'updatedReview didnt work' });
      }

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

//just a random comment
// just adding another random comment
//third comment