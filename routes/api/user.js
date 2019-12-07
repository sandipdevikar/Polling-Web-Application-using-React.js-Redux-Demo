const express=require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");
const {check,validationResult} = require("express-validator/check");
const router=express.Router();
const User = require("../../models/user")
const config=require("config");
router.post("/",[
    check("name","Name is require").not().isEmpty(),
    check("email","Email is invalid").isEmail(),
    check("password","password min 6 length").isLength({min:6})




], async (req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
           return res.status(400).json({msg : errors.array()});
        }
        const {
            name,
            email,
            password
        }=req.body;
        console.log(name);
        try {
            let user= await User.findOne({email});
            if (user) {
                return res
                  .status(400)
                  .json({ errors: [{ msg: 'User already exists' }] });
              }
             const avatar = gravatar.url(email,{
                s: '200',
                r: 'pg',
                d: 'mm'
             });

             user = new User({
                 name,email,avatar,password
             });
             const salt = await bcrypt.genSalt(10);

              user.password= await bcrypt.hash(password,salt);
            
              await user.save();
              const payload = {
                user: {
                  id: user.id
                }
              };
        
              jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token) => {
                  if (err) throw err;
                  res.json({ token });
                }
              );
        } catch (err) {
            console.error(err);
          return  res.status(500).send('Server error');  
        }
    
})

module.exports=router;