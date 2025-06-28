const Stat = require('../models/statsModel');

const allowedStats = ['total_words'];

const updateStats = async (req, res) => {

   const { userId, stat } = req.params;
   
   const { action } = req.body;
   
   try {

      if (!userId || !stat || !action) {
         return res.status(400).json({ message: 'Missing required fields' });
      }

      if (!allowedStats.includes(stat)) {
         return res.status(400).json({ message: 'update stats action is not allowed' });
      }

      const updated = await Stat.updateStats(userId, stat, action);

      if (!updated) {
         return res.status(404).json({ message: 'Stats not found for user' });
      }

      return res.status(200).json({ updated });
      

   } catch (err) {
      console.error('500 error inside updateStats: ', err);
      return res.status(500).json({ error: err });
   }
}

module.exports = {
   updateStats
}