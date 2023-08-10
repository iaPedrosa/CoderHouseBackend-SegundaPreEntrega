import UserDao from "../daos/mongodb/user.dao.js"
const userDao = new UserDao();


export const  registerResponse = async(req, res) => {
  try {
    const user = await userDao.getByEmail(req.body.email);
    req.session.email = user.email;
    res.redirect('/products');
   
} catch (error) {
    console.log(error);
}
};



  export const loginResponse = async(req, res, next)=>{
    try {
      const user = await userDao.getById(req.session.passport.user);
      req.session.email = user.email;
      res.redirect('/products');
    } catch (error) {
      next(error.message)
    }
  }  

  export const logoutUser = (req, res, next)=>{
    try {
        req.logout();
        res.json({
            msg: 'Logout ok',
        })
        
    } catch (error) {
        next(error.message)
        
    }

    }

    export const githubResponse = async (req, res, next) => {
      try {
        // console.log(req.user)
        const {email} = req.user;
        

          req.session.email = email;
          res.redirect('/products');

        }
       catch (error) {
        next(error.message);
      }
    };


    export const googleResponse = async (req, res, next) => {
      try {

       
        const {email} = req.user;

        req.session.email = email;
        res.redirect('/products');
      } catch (error) {
        next(error.message);
      }
    };
    
