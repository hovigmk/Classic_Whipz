const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../helpers/auth');

router.post('/', withAuth, async (req, res) => {
  console.log(req.body);
  
  try {

    const newComment = await Comment.create({
      ...req.body,
      userid: req.session.userid,
      //carid: req.session.tempid,
      user_name: req.session.username,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        userid: req.session.userid,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No car found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
