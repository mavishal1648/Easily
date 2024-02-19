import userModal from "../model/user.modal.js";

export default class userController{

    addUser(req,res){
        console.log(req.body);
        userModal.addUser(req.body);
        res.render('login');
    }

    getLogin(req,res){
        res.render('login');
    }

    userLogin(req,res){
        const { email, password } = req.body;
        const authenticateUser = userModal.confirmLogin(req.body);
        if(!authenticateUser){
            return res.render('404',{
                msg:"User Not found,pls Register"
            });
        }
       if(authenticateUser.email === email && authenticateUser.password === password){
        req.session.user = authenticateUser;
        // console.log(req.session.user,authenticateUser);
        res.redirect('/jobs');
       }else{
        res.render('404',{
            msg:"Invalid Credentials"
        })
       }
    }
    logout(req,res){
        req.session.user = null;
        res.redirect('/');
    }
}