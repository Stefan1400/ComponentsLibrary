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

module.exports = {
   getDue,
}