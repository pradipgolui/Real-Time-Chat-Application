const bcrypt = require('bcrypt');
const User = require('../models/User');

// User register
const registerUser = async(req, res)=>{
  try {
    const { name, email, password } = req.body;
    
    if( !name || !email || !password ){
      return res.status(400).json({ message :"all fields are required"});
    }

    const userExist =  await User.findOne({ email });
    if(userExist){
      return res.status(409).json({ message: "User already exists"});
    } 
    
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User ({ name, email , password: hashPassword });
    await newUser.save();

    return res.status(201).json({ message: "User register successfully", user: newUser});
    
  } catch (error) {
    return res.status(500).json({ Message: "Server Error"});
  }
};

const loginUser = async(req, res)=>{
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    const isMatchPassword = await bcrypt.compare(password, user.password);
    if(!user || !isMatchPassword){
      return res.status(409).json({ Message: "Invalid Credentials"});
    }

    return res.status(200).json({ Message: "Login successfully",user });
    
  } catch (error) {
    return res.status(500).json({ message: "Server error"});
  }
};

module.exports ={
  registerUser,
  loginUser
};
