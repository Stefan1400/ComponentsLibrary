const ReviewModel = require('../models/reviewModel');

const getDue = async () => {
   const userId = req.user.id;
   
   try {

      const fetchedDueWords = await ReviewModel.getDue(userId);

      if (fetchedDueWords.length === 0) {
         return res.status(204).json({ message: 'no reviews today' });
      }

      return res.status(200).json(fetchedDueWords);

   } catch (err) {
      console.error('500 error when getting due words');
      return res.status(500).json({ error: err });
   }
}

module.exports = {
   getDue,
}