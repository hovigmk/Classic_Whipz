const router = require('express').Router();
const userRoutes = require('./userRoutes');
const carRoutes = require('./carRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/cars', carRoutes);
router.use('/comments', commentRoutes);

module.exports = router;