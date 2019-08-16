const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
require('dotenv').config();


const bcrypt = require('bcrypt');

router.delete('/', (req, res)=>{
    //destroy session
    req.session.destroy(() => {
        //redirect back to welcome page
        res.status(200).json({
          status:200,
          message:'logout complete'
        });
    })
});

router.post('/', (req, res)=>{
    //find user based on the username that they typed in /sessions/new
    User.findOne({username:req.body.username}, (err, foundUser)=>{
        //compare what the user typed for password to the encrypted db value
        if(bcrypt.compareSync(req.body.password, foundUser.password)){
            req.session.currentUser = foundUser;
            res.status(201).json({
              status:201,
              message:'session created'
            });
        } else {
            //if the passwords don't match, tell the user
            // res.send('wrong password');
            res.status(401).json({
              status:401,
              message:'login failed'
            });
        }
    })
})

router.post('/newuser', (req, res)=>{
  console.log("3" + req.body.password);
    //encrypt what the user typed for password
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    console.log(req.body.password);
    User.create(req.body, (err, createdUser)=>{
      console.log(createdUser);
        res.status(202).json({
          status:202,
          message:"user created"
        });
    });
});


module.exports = router;
