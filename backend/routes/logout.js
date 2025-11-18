const express = require('express');
const router = express.Router();


router.post('/', (req, res) => {
    console.log('logout route');
    
    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(0), // expire immediately
      sameSite: 'strict',   // adjust based on your cookie config
      secure: process.env.NODE_ENV === 'production',       // set true if you use HTTPS
    });
    res.status(200).json({ message: 'Logged out successfully' });
  });
  


module.exports = router;