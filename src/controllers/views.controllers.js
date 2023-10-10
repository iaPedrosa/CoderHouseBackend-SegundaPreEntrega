export const register = (req, res) => {
    const {error } = req.query;
    res.render('register', {error})
};

export const errorRegister = (req, res) => {
    res.render('errorRegister')
};

    export const login = (req, res) => {
        const {error,logout,newpass } = req.query;
        res.render('login', {error,logout,newpass})
    };

export const errorLogin = (req, res) => {
    res.render('errorLogin')
};

export const profile = (req, res) => {
    res.render('profile')

};

export const logout = (req, res) => {

    // req.session.destroy();
    res.clearCookie('Authorization');
    res.redirect('/login');
    
}

export const resetpass = (req, res) => {
    const {error,err,ok,vencido} = req.query;
    res.render('resetpass',{error,err,ok,vencido})
}

export const newpass = (req, res) => {
    const {tok} = req.query;
    res.render('newpass',{tok})
}