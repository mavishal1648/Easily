//import from npm
import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'path'
import session from 'express-session'
import expressEjsLayouts from 'express-ejs-layouts'


//import from other internal files..
import easilyController from './src/controller/jobs.controller.js'
import { uploadFile } from './src/middleware/fileUpload.middleware.js'
import userController from './src/controller/user.controller.js'
import { auth } from './src/middleware/auth.middleware.js'
import { lastVisit } from './src/middleware/lastVisit.middleware.js'
//creating the server
const server = express();


//setting up neccessary information for the project...
server.set('view engine','ejs');
server.set('views',path.join(path.resolve(),"src","views"));
server.use(expressEjsLayouts);
server.use(cookieParser());
server.use(lastVisit);
server.use(session({
    secret:'Easily',
    resave:false,
    saveUninitialized:true,
    cookie:{
        secure:false
    }
}));
server.use(express.static('public'));
server.use(express.urlencoded({
    extended:true
}))


//instance creation..
const easilyControllers = new easilyController();
const userControllers = new userController()
//creating the routes...
server.get('/',easilyControllers.home);
server.get('/jobs',easilyControllers.getJobLists);
server.get('/viewDetails/:id',easilyControllers.getJob);
server.post('/apply/:id',uploadFile.single('resume'),easilyControllers.newApplicants);
server.get('/postjob',auth,easilyControllers.newJobForm);
server.post('/newJob',auth,easilyControllers.postNewJob);
server.get('/job/update/:id',auth,easilyControllers.getUpdateForm);
server.post('/job/update/:id',auth,easilyControllers.postUpdateForm);
server.get('/job/delete/:id',auth,easilyControllers.deleteForm);
server.get('/applicants/:id',auth,easilyControllers.getApplicantsByID);
server.get('/getResumePath/:id',easilyControllers.getResume);

server.post('/register',userControllers.addUser);
server.get('/login',userControllers.getLogin);
server.post('/login',userControllers.userLogin);
server.get('/logout',userControllers.logout);

//listening to the server...
const PORT = process.env.PORT || 3100;
server.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}!`);
});
