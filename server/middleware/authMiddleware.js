const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
   const authHeader = req.headers.authorization;

   console.log('reached auth middleware');

   if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'user is not authorized' });
   }

   const token = authHeader.split(' ')[1];

   try {

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = { id: decoded.id };

      console.log('right before next in auth middleware');

      next();
   } catch (err) {
      console.error('user is unauthorized: ', err);
      return res.status(401).json({ error: err });
   }
};

module.exports = {
   verifyToken,
};