

const express = require('express');
const router = express.Router();
const User = require('../models/___.js');
const bcrypt = require('bcrypt');

router.post('/', (req, res)=>{

    console.log(req.body.username);

    User.findOne({username:req.body.username}, (err, foundUser)=>{

        if(bcrypt.compareSync(req.body.password, foundUser.password)){
            req.session.currentUser = foundUser;
            res.json(foundUser);

        } else {
            res.json({
                status:401
            });
        }
    });
});

router.delete('/', (req, res)=>{
    req.session.destroy(() => {

    });
});

router.post('/newuser', (req, res)=>{

    console.log(req.body.password);

    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

    User.create(req.body, (err, createdUser)=>{
        res.json(createdUser);
    });
});

router.delete('/user/:id', (req, res)=>{
    User.findOneAndRemove();
});

module.exports = router;
