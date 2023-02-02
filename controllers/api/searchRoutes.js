const router = require('express').Router();
const { Car, User } = require('../../models');


router.post('/', async (req, res) => {
    try {
        console.log(req.body.search);

        const carData = await Car.findAll({
            where: { model: req.body.search }

        });
        //console.log(carData.dataValues);
        console.log(carData);
        console.log("Hello searchRoutes worked!!");
        console.log(carData.model);

        if (!carData) {
            res
                .status(400)
                .json({ message: 'Unavailable model, please try again' });
            return;
        }

        res.status(200).json(carData.dataValues);


    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;