const router = require('express').Router();
const { Car, User, Comment } = require('../models');
const withAuth = require('../helpers/auth');
var carid = 1;
router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const carData = await Car.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],//pulled in name  from user
        },
      ],
    });

    // Serialize data so the template can read it
    const cars = carData.map((car) => car.get({ plain: true }));

    console.log(cars);



    console.log("HERE LOOK UP!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    // Pass serialized data and session flag into template
    res.render('homepage', {
      cars,
      session_username: req.session.username,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/car/:id', async (req, res) => {
  try {
    const carData = await Car.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          attributes: ['id', 'message', 'date_created', 'carid', 'userid', 'user_name'],
        },
        
      ],
      
    });

    const car = carData.get({ plain: true });
console.log(car);
    //get user info
/*
    const commentData = await Comment.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Comment }],
    });

    const comment = commentData.get({ plain: true });*/
    
    //console.log(car.comments);
    carid = car.id;
    //console.log(carid);
    ////
    //console.log(car);
    //// 
    /*

    req.session.save(() => {
      req.session.tempid = carid;

    });*/

    ////
    console.log(" HERE ABOVE!!!!!!!!:: " + car.model);
    res.render('car', {
      //...comment,
      ...car,
      logged_in: req.session.logged_in,
      session_username: req.session.username,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.userid, {
      attributes: { exclude: ['password'] },
      include: [{ model: Car }],
    });

    const user = userData.get({ plain: true });
console.log(user);
    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//create comments route

router.get('/comment/:id', async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      include: [
        {
          model: Car,
          attributes: ['id', 'model', 'year', 'make', 'price', 'description', 'image'],
        },
      ],
    });

    const comment = commentData.get({ plain: true });

    console.log(id);
    res.render('comment', {
      ...comment,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
