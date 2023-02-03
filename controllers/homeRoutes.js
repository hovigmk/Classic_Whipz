const router = require('express').Router();
const { Car, User, Comment } = require('../models');
const withAuth = require('../helpers/auth');
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', async (req, res) => {
  try {

    const carData = await Car.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const cars = carData.map((car) => car.get({ plain: true }));

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
    carid = car.id;
    res.render('car', {
      ...car,
      logged_in: req.session.logged_in,
      session_username: req.session.username,

    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {

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


    res.render('comment', {
      ...comment,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {

  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});
// get carlist information and render page
router.get('/carlist', async (req, res) => {
  try {

    const carData = await Car.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const cars = carData.map((car) => car.get({ plain: true }));

    res.render('carlist', {
      cars,
      //session_username: req.session.username, might need later
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get search information and render search page under development will change to have a broader search
router.get('/search/:search', async (req, res) => {
  try {

    const carData = await Car.findAll({
      where: { model: req.params.search },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const cars = carData.map((car) => car.get({ plain: true }));

    res.render('search', {
      cars,
      logged_in: req.session.logged_in,
      //session_username: req.session.username,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
/// Charge and stripe route under development delete or update database will be inserted 
router.post('/charge/:id/:price/:description', (req, res) => {

  const carid = req.params.id;
  const amount = req.params.price * 10;
  const description = req.params.description;

  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken

  })
    .then(customer => stripe.charges.create({
      amount,
      description,
      currency: 'CAD',
      customer: customer.id
    }))/*
  .then(charge => test = amount / 100, console.log(amount))
  .then(charge => console.log(amount + "amount above" + carid + "carid above" + description + "description above"))
  //.then(charge => Car.update({ sold: true }, { where: { id: carid } }))
*/

.then( async charge => {
  const carData = await Car.destroy({
    where: {
      id: req.params.id,
    },
  });
  if (!carData) {
    res.status(404).json({ message: 'No car found with this id!' });
    return;
  }

  res.render('success');

})

/*
.then(charge => fetch(`/api/cars/${carid}`, {
    method: 'DELETE',
}))*/

   // .then(charge => res.render('success'));

});

module.exports = router;
