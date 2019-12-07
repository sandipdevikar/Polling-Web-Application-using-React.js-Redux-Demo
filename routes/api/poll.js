const express = require("express");

const router = express.Router();
const auth = require('../../middleware/auth');
const Poll = require("../../models/poll");
const User = require("../../models/user");

const {check,validationResult} = require("express-validator/check");

router.post('/',async (req,res)=>{

  const {pollname} = req.body;
try{

  let pollnames = new Poll({
    pollname
  })
  await pollnames.save();
  res.json(pollnames)
}catch(err){
console.log(err.message);
return res.status(500).json({msg:"server error"});
}

});
router.post(
  '/:id',
  

    [
      check('contenstantName', 'name is required')
        .not()
        .isEmpty()
    ] ,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: 

errors.array() });
    }

    try {

      const {contenstantName} = req.body;
      


      let poll = await Poll.findById(req.params.id);
      console.log(poll);
     
      if ( poll.pollslist.filter(pollslist1 => 

pollslist1.contenstantName.toString() === 

req.body.contenstantName).length > 0 ) {
        return res.status(400).json({ msg: 'Contestant Already Exists' });
      }  /*
const graph = new Graph({
nodes:[{id:req.body.nodes.id}],
links:[{source: req.body.source, target: 

req.body.target}]
}); // you need to include your data inside the 

instance of the model when you create it that was 

the problem.. It should work fine now


        */ 
      await poll.pollslist.unshift({contenstantName:req.body.contenstantName});
         await poll.save();

      res.json(poll);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);


router.put('/vote/:id1/:id2', auth, async (req, res) => {
    try {
      const poll = await Poll.findById(req.params.id1);
   
      const pollby=await poll.pollslist.find(obj =>{return  obj._id.toString() ===req.params.id2});
      
      let flag=1;
      const a =poll.pollslist.filter(ob =>{
        if(ob.votes.filter(vo=> vo.user.toString()==req.user.id).length>0){
          flag=0;
          return res.status(400).json({ errors: [{ msg: 'You have already vote' }] });

        };
      })
      // Check if the post has already been liked
     if(flag==1){
      
    await  pollby.votes.unshift({ user: req.user.id });
  
    await poll.save();

    res.json(poll);
     }
    } catch (err) {
      console.error(err.message);
   return res.status(500).send('Server Error');
    }
  });
router.get('/',async (req,res)=>{
  try {
    const polls= await Poll.find();
     res.json(polls)
 } catch (err) {
     console.log(err.message);
     return res.status(500).json({msg:"server error"});
 
 }    
});

router.get('/:id',async (req,res)=>{
  try {
    const polls= await Poll.findById(req.params.id);
     res.json(polls)
 } catch (err) {
     console.log(err.message);
     return res.status(500).json({msg:"server error"});
 
 }    
});

module.exports=router;