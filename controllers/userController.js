const { render } = require('ejs');
const User = require('../models/user');
const {v4 : uuidv4} = require('uuid')
const auth = require('../service/auth');
const bcrypt = require('bcrypt');

const handleUserSignup = async (req, res) => {
  try {
        // const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
          ...req.body, //this says to keep everything same then i just updated the password
          password: hashedPassword,
        });

        await user.save();

        res.redirect('/user/login');      
    } catch (err) {
        console.log(err);
        res.status(500).send("Signup failed");
   
    }
}
// const handleUserLogin = async (req, res) => {
//     const {email, password} = req.body;
//     const user = await User.findOne({email, password});
//     if(!user){
//         return res.render('login', {title : 'login'} );
//     };

//     const sessionId = uuidv4();
//     auth.setUser(sessionId , user);
//     res.cookie('uid', sessionId);
//     res.redirect('/home');
// }

const handleUserLogin = (req, res) => {

    const {email} = req.body;

    User.findOne({email})
            .then( async user => {
                const isPasswordValid = user && await bcrypt.compare(req.body.password , user.password);
                if (!isPasswordValid) {
                    return res.render("login", {
                        title: "Login",
                        error: "Invalid email or password"
                    });
                }

                const sessionId = uuidv4();
                auth.setUser(sessionId, user);
                res.cookie('uid', sessionId);
                res.redirect('/');

            }).catch(err =>{
                console.log(err);
                
            })
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
    
}
