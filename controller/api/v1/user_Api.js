const USER=require('../../../model/user');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

module.exports.create=async (req,res)=>{
    try{
      const {email,password}=req.body;
      const user=await USER.findOne({email:email});
      if(user){
          return res.status(500).json({
              message:'User Alredy exits',
              success:false
          })
      }
      req.body.password=await bcrypt.hash(password,10);
      const newUser=await USER.create(req.body);
      return res.status(200).json({
          message:'SignUp Successfull',
          user:newUser
      })
    }catch(err){
        console.log(err);
         res.status(500).json({
            messsage:'Internal Server Error'
        })
    }
}



module.exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        let user=await USER.findOne({email:email});
        if(user){
            const isValidPassword = await user.isVaildPassword(user,password);
            if(isValidPassword)
            return res.status(200).json({
                success:true,
                message:'User Authenticated',
                data:{
                    token:jwt.sign(user.toJSON(),'secret',{
                        expiresIn:'1h',
                    })
                }
            })
        }
        return res.status(422).json({
            success:false,
            message:'Unauthorized'
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            message:'Internal Server Error'
        })
    }
}