const config=require("config");
const jwt = require("jsonwebtoken");

module.exports = async (req,res,next) =>{

    const token=req.header("x-auth-token");

    if(!token){
        return res.status(400).json({msg:"No Token, Authorization Denied"})
    }

    try{

        jwt.verify(token,config.get("jwtSecret"),(error,decoded)=>{
            if(error){
                return res.status(401).json({msg:"Token invalid"});

            }
            else{
                
                req.user = decoded.user;
                next();
            }
        });


    }catch(err){
        console.error('something wrong with auth middleware')
            return res.status(500).json({msg:"server error"});
    }


}