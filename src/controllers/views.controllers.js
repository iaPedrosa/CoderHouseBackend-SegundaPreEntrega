export const register = (req, res) => {
    const {error } = req.query;
    res.render('register', {error})
};

export const errorRegister = (req, res) => {
    res.render('errorRegister')
};

    export const login = (req, res) => {
        const {error,logout } = req.query;
        res.render('login', {error,logout})
    };

export const errorLogin = (req, res) => {
    res.render('errorLogin')
};

export const profile = (req, res) => {
    res.render('profile')
    console.log(req.session);
};

export const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
    
}