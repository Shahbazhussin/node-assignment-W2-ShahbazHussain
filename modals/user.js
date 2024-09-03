const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    products : [
        {
            type : mongoose.Types.ObjectId,
            ref : 'Product'
        }
    ]
});

userSchema.pre('save' , async function(next){
    const User = this;

    if(!User.isModified('password'))
        return next();

    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(User.password , salt);

        User.password = hashedPassword;
        next();
    }catch(err){
        console.log(err);
        next(err);
    }
});

userSchema.methods.comparePasswords = async function(password){
    try{
        //compare plain with hashed {order matters}
        const isMatch = await bcrypt.compare(password , this.password);
        console.log(isMatch);

        return isMatch;
    }
    catch(err){
        console.log(err);
        throw err;
    }
};

module.exports = mongoose.model( 'User' , userSchema );