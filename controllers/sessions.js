const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

router.delete('/', (req, res)=>{
    //destroy session
    req.session.destroy(() => {
        //redirect back to welcome page
        res.status(200).json({
          status:200,
          message:'logout complete'
        });
    });
});

router.post('/', (req, res)=>{
    //find user based on the username that they typed in /sessions/new
    User.findOne({username:req.body.username}, (err, foundUser)=>{
        //compare what the user typed for password to the encrypted db value
        if(bcrypt.compareSync(req.body.password, foundUser.password)){
            req.session.currentUser = foundUser;
            res.status(201).json({
              status:201,
              message:'session created',
			  data:{
				  sessionUser: req.session.currentUser
			  }
            });
        } else {
            //if the passwords don't match, tell the user
            // res.send('wrong password');
            res.status(401).json({
              status:401,
              message:'login failed'
            });
        }
    });
});

router.post('/newuser', (req, res)=>{
    //encrypt what the user typed for password
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (err, createdUser)=>{
		req.session.currentUser = createdUser;
		res.json(createdUser);
    });
});

module.exports = router;
