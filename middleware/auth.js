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
        const user = auth.getUser(uid);
        req.user = user;
        res.locals.user = user;
    }else {
        res.locals.user = null;
    }

    next();
};

module.exports = {
    requireAuth,
    checkUser,

}
