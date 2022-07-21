const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

//Load Input Validation
const valReginput = require('../../Validation/Register');

const valLoginput = require('../../Validation/Login');

//Load Model
const User = require('../../Models/Users');

router.post("/register", (req,res) => {
    const {errors, isValid} = valReginput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({email : req.body.email }).then(user => {
        if(user)
        {
            return res.status(400).json({ email : "Email already in use!"});
        }else{
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.pass
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err){
                        console.log(err);
                    }
                    newUser.password = hash;
                    newUser.save()
                           .then(user => res.json (user))
                           .catch(err => console.log(err))
                });
            });
        }
    });
});

router.post("/login", (req, res) => {
    const { errors, isValid } = valLoginput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const pass = req.body.pass;

    User.findOne({ email })
    .then(user => {
        if(!user) {
            return res.status(404).json({ emailwrong : "Email not found!"});
        }
        
        bcrypt.compare(pass, user.password)
        .then(isMatch => {
            if(isMatch) {
                const payload = {
                    id: user.id,
                    name: user.name
                };

                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn : 31556926
                    },
                    (err,token) => {
                        res.json({
                            success: true,
                            token: "Bearer" + token
                        });
                    }
                );
            }else{
                return res
                .status(400)
                .json({ passwrong: "Incorrect Password!"});
            }
        });
    });
});

module.exports = router;