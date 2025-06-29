const Stat = require('../models/statsModel');

const allowedStats = ['total_words'];

const getMyStats = async (req, res) => {
   
   const { userId } = req.params;
   
   try {

      if (!userId) {
         return res.status(400).json({ message: 'userId not found' });
      }

      const myStats = await Stat.getMyStats(userId);

      if (!myStats) {
         return res.status(404).json({ message: 'myStats not found' });
      }

      res.status(200).json(myStats);

   } catch (err) {
      console.log('500 error inside getting stats server: ', err);
      return res.status(500).json({ error: err });
   }
}

const updateStats = async (req, res) => {

   const { userId, stat } = req.params;
   
   // const { action } = req.body;
   
   try {

      if (!userId || !stat) {
         return res.status(400).json({ message: 'Missing required fields' });
      }

      if (!allowedStats.includes(stat)) {
         return res.status(400).json({ message: 'update stats action is not allowed' });
      }

      const updated = await Stat.updateStats(userId, stat);

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
   updateStats,
   getMyStats,
}