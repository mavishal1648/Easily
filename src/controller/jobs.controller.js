import { mailConfirmation } from "../middleware/sendmail.middleware.js";
import { findJobById, getJobs,addNewApplicants,createNewJob, updateForm, deleteJob,allApplicants} from "../model/job.modal.js";
import fs from 'fs'
import path from "path";

export default class easilyController{
    //home page
    home(req,res){
        res.render('home',{
            user:req.session.user
        });
    }
    // listing all the jobs
    getJobLists(req,res){
        const jobs = getJobs();
        res.render('jobs-lists',{jobs,
            user:req.session.user});
    }
    //getting the particular job
    getJob(req,res){
        const id = req.params.id;
        const jobFound = findJobById(id);
        if(jobFound){
            res.render('job',{
                job:jobFound,
                user:req.session.user
            })
        }   
    }
    //New Applicants 
    async newApplicants(req,res){
        const id = req.params.id;
        const {name,email,contact}=req.body;
        const resumeFile = req.file.filename;
        addNewApplicants(id,name,email,contact,resumeFile);
        await mailConfirmation(email);
        res.redirect('/jobs');
    }

    newJobForm(req,res){
        res.render('new-job',{
            user:req.session.user
        })
    }
    postNewJob(req,res){
        createNewJob(req.body);
        res.redirect('/jobs');
    }
    getUpdateForm(req,res){
        const id = req.params.id;
        const job = findJobById(id);
        res.render('update',{
            job:job,
            user:req.session.user
        })
    }
    postUpdateForm(req,res){
        const id = req.params.id;
        updateForm(id,req.body);
        res.redirect('/jobs');
    }
    deleteForm(req,res){
        const id = req.params.id;
        deleteJob(id);
        res.redirect("/jobs");
    }
    getApplicantsByID(req,res){
        const id = req.params.id;
        const applicants = allApplicants(id);
        res.render('applicants',{
            applicants:applicants,
            user:req.session.user
        })
    }
    getResume(req,res){
        const id = req.params.id;
        const applicant = allApplicants(id);
        res.render('applicants',{
            applicants:applicant,
            user:req.session.user
        });
    }

}