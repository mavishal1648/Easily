let db_id = 3;
const jobs = [
  {
    id: 1,
    job_category: "Tech",
    job_designation: "Internship",
    job_location: "Remote",
    company_name: "Coding Ninjas",
    salary: "20-30/pm",
    apply_by: "30 Aug 2023",
    skills_required: [
      "DSA",
      "SQL",
    ],
    number_of_openings: 5,
    job_posted: new Date().toLocaleString(),
    applicants: [
      {
        applicant_id: 1,
        name: "Vishal",
        email: "mavishal1648@gmail.com",
        contact: 6361791470,
        resumePath: "resume.pdf",
      },
    ],
  },
  {
    id: 2,
    job_category: "Tech",
    job_designation: "Technical Consultant",
    job_location: "Bangalore IND On-Site",
    company_name: "Rubrick",
    salary: "11-19lpa",
    apply_by: "30 Aug 2023",
    skills_required: ["DSA", "JS", "SQL", "LINUX"],
    number_of_openings: 7,
    job_posted: new Date().toLocaleString(),
    applicants: [],
  },
  {
    id: 3,
    job_category: "Tech",
    job_designation: "SDE",
    job_location: "Bangalore IND",
    company_name: "UST",
    salary: "4-10lpa",
    apply_by: "30 Aug 2023",
    skills_required: [
      "REACT",
      "NodeJs",
      "JS",
      "SQL",
      "MongoDB",
      "Express",
      "AWS",
    ],
    number_of_openings: 3,
    job_posted: new Date().toLocaleString(),
    applicants: [],
  },
];


export const getJobs=()=>{
  return jobs;
}

export const findJobById = (id)=>{
  return jobs.find((job)=> job.id==id);
}

export const addNewApplicants = (id,...applicantData)=>{
  const index = jobs.findIndex((job)=> job.id==id);
  let applicant_ID = jobs[index].applicants.length+1;
  jobs[index].applicants.push({
    applicant_id:applicant_ID,
    name: applicantData[0],
    email: applicantData[1],
    contact: applicantData[2],
    resumePath: applicantData[3],
  });
  return jobs[index].applicants;
}

class postNewJob{
  constructor(
    job_category,
    job_designation,
    job_location,
    company_name,
    salary,
    apply_by,
    skills_required,
    number_of_openings
  ){
    this.id = ++db_id;
    this.job_category = job_category;
    this.job_designation = job_designation;
    this.job_location = job_location;
    this.company_name = company_name;
    this.salary = salary;
    this.apply_by = apply_by;
    this.skills_required = skills_required;
    this.number_of_openings = number_of_openings;
    this.job_posted = new Date().toLocaleString();
    this.applicants = [];
  };
}

export const createNewJob = (jobDetails)=>{
  const {
    job_category,
    job_designation,
    job_location,
    company_name,
    salary,
    apply_by,
    skills_required,
    number_of_openings,
  } = jobDetails;
  const job = new postNewJob(
    job_category,
    job_designation,
    job_location,
    company_name,
    salary,
    apply_by,
    skills_required,
    number_of_openings,
  );
  jobs.push(job);
}

export const updateForm = (id,updateData)=>{
  const index = jobs.findIndex((job)=> job.id==id);
  jobs[index].company_name = updateData.company_name;
  jobs[index].job_category = updateData.job_category;
  jobs[index].job_designation = updateData.job_designation;
  jobs[index].apply_by = updateData.apply_by;
  jobs[index].job_location = updateData.job_location;
  jobs[index].job_posted = new Date().toLocaleString();
  jobs[index].salary = updateData.salary;
  jobs[index].skills_required = updateData.skills_required;
  jobs[index].number_of_openings = updateData.number_of_openings;
};

export const deleteJob = (id)=>{
  const index = jobs.findIndex((job)=> job.id==id);
  jobs.splice(index,1);
}
export const allApplicants = (id)=>{
  const index = jobs.findIndex((job)=> job.id==id);
  return jobs[index].applicants;
}
