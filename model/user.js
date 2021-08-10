const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const UserSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }

})

UserSchema.methods.isVaildPassword = async function(user,password){
    const compare=await bcrypt.compare(password,user.password);
    return compare;
}

const USER=mongoose.model('USER',UserSchema);
module.exports=USER;