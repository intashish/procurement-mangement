const express = require('express');
const router = express.Router();
const { createUser, updateUser, deleteUser, getAllUser, getUser } = require('../controllers/userMangement');

//admin can create new user
router.post('/user/createUser', createUser);

//get all user
router.route('/user').get(getAllUser);
router.route('/user/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
