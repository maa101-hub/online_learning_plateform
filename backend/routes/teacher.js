const express = require('express');
const router = express.Router();
const login = require('./Teacher/login');
const signup = require('./Teacher/signup');
const dashboard = require('./Teacher/dashboard');
const course = require('./Teacher/course');
const resetPassword = require('./Teacher/reset-password');

router.use('/login', login);
router.use('/signup', signup);
router.use('/dashboard', dashboard);
router.use('/course', course);
router.use('/reset-password', resetPassword);

router.post('/', async (req, res)=>{
     
     const {email, password} = req.body;
     res.status(200).send({message:"user data recieve successfully"});
     
});

module.exports = router;