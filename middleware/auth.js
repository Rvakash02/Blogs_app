const auth = require('../service/auth') 

const requireAuth = async (req, res, next) => {
    const uid = req.cookies.uid;
    
    if(!uid) return res.render('login', {title : 'login'});

    const user = auth.getUser(uid);

    if(!user) return res.render('login', {title : 'login'});

    req.user = user ;
    next();
};

const checkUser = (req, res, next) => {
    const uid = req.cookies.uid;

    if (uid) {
        req.user = auth.getUser(uid);
    }

    next();
};

module.exports = {
    requireAuth,
    checkUser,

}
