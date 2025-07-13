const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
   const authHeader = req.headers.authorization;

   if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'user is not authorized' });
   }

   const token = authHeader.split(' ')[1];

   try {

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = { id: decoded.id };

      next();
   } catch (err) {
      console.error('user is unauthorized: ', err);
      return res.status(401).json({ error: err });
   }
};

const verifyUserOwnership = async (req, res, next) => {
   const userId = req.user.id;
   const paramsUserId = parseInt(req.params.userId, 10);

   if (!paramsUserId) {
      return res.status(404).json({ message: 'userId from params is missing' });
   }

   if (isNaN(paramsUserId)) {
      return res.status(400).json({ message: 'Invalid userId parameter' });
   }

   if (userId !== paramsUserId) {
      return res.status(403).json({ message: 'user forbidden' });
   }

   next();
};

module.exports = {
   verifyToken,
   verifyUserOwnership
};