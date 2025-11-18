const express = require('express');
const authenticate = require('../middlewares/authentication');
const router = express.Router();


router.get('/',authenticate, (req, res) => {
     const role = req.user.role;
      res.send({role:role, message:'validation success'});
  });
  


module.exports = router;