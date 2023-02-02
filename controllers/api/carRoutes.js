const router = require('express').Router();
const { Car } = require('../../models');
const withAuth = require('../../helpers/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newCar = await Car.create({
      ...req.body,
      userid: req.session.userid,

    });

    res.status(200).json(newCar);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    
    console.log("Delete!!!!!!!!!!!!!!!!!!!");
    const carData = await Car.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!carData) {
      res.status(404).json({ message: 'No car found with this id!' });
      return;
    }

    res.status(200).json(carData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
