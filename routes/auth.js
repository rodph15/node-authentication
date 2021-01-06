const router = require('express').Router();
const User = require('../models/User');
const {registerValidation, loginValidation} = require('../validation/user-validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register',async (req, res) => {

    if(registerValidation(req.body) && error?.details[0]) return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');
 
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(req.body.password,salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        lastIP:req.ip
    })

    try{
        const savedUser = await user.save();
        res.status(201).send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
});

router.post('/login',async (req, res) => {

    if(loginValidation(req.body) && error?.details[0]) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(404).send('Email doesnt exists');

    const validPass = await bcrypt.compareSync(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Password is wrong');

    const token = jwt.sign({__id: user.id, email: user.email}, process.env.TOKEN_SECRET);
    res.header('auth-token',token).status(200).send(token);

});

module.exports = router;