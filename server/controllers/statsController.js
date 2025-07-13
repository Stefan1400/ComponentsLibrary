const Stat = require('../models/statsModel');

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
};

module.exports = {
   getMyStats,
};