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
   const { word } = req.params;

   const stages = [1, 2, 3, 4, 5, 6, 7, 8, 9];
   const intervals = [];
   
   try {

      const fetchedDueWords = await ReviewModel.getDue(userId, word);

      return res.status(200).json(fetchedDueWords);

   } catch (err) {
      console.error('500 error when getting due words');
      return res.status(500).json({ error: err });
   }
}



module.exports = {
   getDue,
   updateSRS,
}