const router = require('express').Router();
const { Car, User } = require('../models');
const withAuth = require('../helpers/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const carData = await Car.findAll({
      include: [
        {
          model: User,
          attributes: ['name', 'email'],//pulled in name and email from user
        },
      ],
    });

    // Serialize data so the template can read it
    const cars = carData.map((car) => car.get({ plain: true }));
console.log(cars);

console.log("HERE LOOK UP");
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      cars, 
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
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const car = carData.get({ plain: true });
console.log(car);
console.log(carData);
console.log("req.params.id CAR INFORMATION HERE ABOVE!!!!!!!!:: " + car.model);
    res.render('car', {
      ...car,
      logged_in: req.session.logged_in
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
    
    res.render('profile', {
      ...user,
      logged_in: true
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
