const express=require("express");
const router=express.Router();
const User = require("../../models/user");
const auth = require("../../middleware/auth");
const {check,validationResult}=require("express-validator/check");
const bcrypt = require("bcryptjs");
const config= require("config");
const jwt = require("jsonwebtoken");
//@Route GET api/auth
//Discription Authentication checking
//Access Public
router.get("/",auth,async (req,res)=>{

try {
   const user= await User.findById(req.user.id).select("-password");
    res.json(user)
} catch (err) {
    console.log(err.message);
    return res.status(500).json({msg:"server error"});

}    
})

//@Route POST api/auth
//Discription Login checking
//Access Public
router.post("/",[

    check("email","Invalid email").isEmail(),
    check("password","Invalid Password").exists()





], async (req,res)=>{
const errors=validationResult(req);
    if(!errors.isEmpty()){

        return res.status(400).json({msg:errors.array()});

    }
    try{
            const { email,password} =req.body;

            let user = await User.findOne({email});
            if(!user){

                return res.status(400).json({ errors: [{ msg: 'User not exists' }] });
            }
         const v=await bcrypt.compare(password,user.password);
         if(!v){
                return res.status(400).json({ errors: [{ msg: 'Invalid password' }] });
         }

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
    }catch(err){

    }
});
module.exports=router;
/*
const express=require("express");
const router=express.Router();
const auth=require('../../middleware/auth');
const User=require('../../models/User');
const { check, validationResult } = require('express-validator/check');
const bcrypt =require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require('config');
//@route  GET api/auth
//desc    Authenticate user and get token
//access  Pubic
router.get('/',auth,

async (req,res)=> {

    try{
            const user=await User.findById(req.user.id).select('-password');
            res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send('server error');
    }
    
});
router.post(
    '/',
    [
      
      check('email', 'Please include a valid email').isEmail(),
      check(
        'password',
        'Password is required'
      ).exists()
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
          const {email,password}=req.body;
  
  
  
          try{
  
      //see if user exists
      let user= await User.findOne({email});
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User not exists' }] });
      }
      // get Users Gravatar
  

      //match password

      const isMatch=await bcrypt.compare(password,user.password);

      if(!isMatch){
        return res
        .status(400)
        .json({ errors: [{ msg: 'Invalid password' }] });
 
      }
     // return json webToken
      
      const payload={
        user:{
          id:user.id
        }
      }
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn:360000
        },
        (err,token)=>{
          if(err) throw err;
          res.json({token});
        }
        
        );
           
          }catch(err){
                  console.error(err.message);
                  res.status(500).send("server error");
          }
      
    }
  );
  
module.exports=router;



*/