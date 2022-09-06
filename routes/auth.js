const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth');

/**
 * @swagger
 * tags:
 *    name: Authentication
 *    description: Login page for user
 */

/**
 * @swagger
 * path:
 *    /login:
 *      get:
 *          summary: login into panel
 *          tags: [Authentication]
 *          response:
 *              "200":
 *                  description: get token if successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/login'
 *
 */

/**
 * @swagger
 * components:
 *      schemas:
 *          login:
 *              type: object
 *              required:
 *                  - email
 *                  - password
 *              properties:
 *                  email:
 *                      type: string
 *                      description: email id of user
 *                  password:
 *                      type: string
 *                      description : password
 *              example:
 *                  email: pm@gmail.com
 *                  password: asdasd
 */
router.post('/register', register);
router.get('/login', login);

module.exports = router;
