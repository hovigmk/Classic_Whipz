const router = require('express').Router();
const userRoutes = require('./userRoutes');
const carRoutes = require('./carRoutes');
const commentRoutes = require('./commentRoutes');
const searchRoutes = require('./searchRoutes');

//api routes
router.use('/users', userRoutes);
router.use('/cars', carRoutes);
router.use('/comments', commentRoutes);
router.use('/search', searchRoutes);

module.exports = router;