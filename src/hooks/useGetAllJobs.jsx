import { setAllJobs } from '@/redux/jobSlice'
import store from '@/redux/store'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const dummyJobs = [
    {
      _id: "job1",
      title: "Frontend Developer",
      description: "Develop and maintain user-facing features using React.js.",
      requirements: [
        "Strong knowledge of JavaScript, HTML, and CSS",
        "Experience with React.js and Redux",
        "Familiarity with RESTful APIs"
      ],
      salary: 60000,
      experienceLevel: 2,
      location: "Pune, India",
      jobType: "Full-Time",
      position: 2,
      company: "65a1e0f1d3b2f33a5e123456",
      created_by: "65a1e0f1d3b2f33a5e654321",
      applications: []
    },
    {
      _id: "job2",
      title: "Backend Developer",
      description: "Build and maintain server-side applications using Node.js.",
      requirements: [
        "Proficient in Node.js and Express",
        "Experience with MongoDB and Mongoose",
        "Knowledge of RESTful API design"
      ],
      salary: 75000,
      experienceLevel: 3,
      location: "Mumbai, India",
      jobType: "Full-Time",
      position: 1,
      company: "65a1e0f1d3b2f33a5e223344",
      created_by: "65a1e0f1d3b2f33a5e998877",
      applications: []
    },
    {
      _id: "job3",
      title: "UI/UX Designer",
      description: "Design user-friendly interfaces and improve user experiences.",
      requirements: [
        "Proficiency in Figma or Adobe XD",
        "Strong understanding of user-centered design",
        "Ability to collaborate with developers"
      ],
      salary: 50000,
      experienceLevel: 1,
      location: "Remote",
      jobType: "Contract",
      position: 1,
      company: "65a1e0f1d3b2f33a5e334455",
      created_by: "65a1e0f1d3b2f33a5e112233",
      applications: []
    },
    {
        _id: "job4",
        title: "Full Stack Developer",
        description: "Work on both frontend and backend systems, ensure seamless integration.",
        requirements: [
          "Experience with MERN stack (MongoDB, Express, React, Node)",
          "Understanding of CI/CD pipelines",
          "Strong problem-solving skills"
        ],
        salary: 80000,
        experienceLevel: 3,
        location: "Bangalore, India",
        jobType: "Full-Time",
        position: 1,
        company: "65a1e0f1d3b2f33a5e445566",
        created_by: "65a1e0f1d3b2f33a5e776655",
        applications: []
      },
      {
        _id: "job5",
        title: "DevOps Engineer",
        description: "Manage infrastructure and automate deployment pipelines.",
        requirements: [
          "Experience with AWS, Docker, and Kubernetes",
          "Knowledge of Jenkins and GitHub Actions",
          "Scripting skills in Bash or Python"
        ],
        salary: 90000,
        experienceLevel: 4,
        location: "Hyderabad, India",
        jobType: "Full-Time",
        position: 1,
        company: "65a1e0f1d3b2f33a5e556677",
        created_by: "65a1e0f1d3b2f33a5e334411",
        applications: []
      },
      {
        _id: "job6",
        title: "Mobile App Developer",
        description: "Create high-quality mobile applications for Android and iOS.",
        requirements: [
          "Experience with React Native or Flutter",
          "Strong understanding of mobile UI/UX standards",
          "Knowledge of mobile APIs and performance optimization"
        ],
        salary: 65000,
        experienceLevel: 2,
        location: "Chennai, India",
        jobType: "Full-Time",
        position: 2,
        company: "65a1e0f1d3b2f33a5e998822",
        created_by: "65a1e0f1d3b2f33a5e667788",
        applications: []
      },
      {
        _id: "job7",
        title: "Data Analyst",
        description: "Analyze large datasets to extract actionable insights.",
        requirements: [
          "Strong knowledge of SQL and Excel",
          "Experience with Python libraries like Pandas and NumPy",
          "Familiarity with data visualization tools like Power BI or Tableau"
        ],
        salary: 70000,
        experienceLevel: 2,
        location: "Delhi, India",
        jobType: "Full-Time",
        position: 1,
        company: "65a1e0f1d3b2f33a5e882266",
        created_by: "65a1e0f1d3b2f33a5e446677",
        applications: []
      },
      {
        _id: "job8",
        title: "QA Engineer",
        description: "Ensure the quality of software products through manual and automated testing.",
        requirements: [
          "Experience in writing test cases and bug reports",
          "Knowledge of Selenium and other testing tools",
          "Understanding of Agile/Scrum development process"
        ],
        salary: 55000,
        experienceLevel: 1,
        location: "Kolkata, India",
        jobType: "Contract",
        position: 1,
        company: "65a1e0f1d3b2f33a5e554433",
        created_by: "65a1e0f1d3b2f33a5e123321",
        applications: []
      }
  ];
   
const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.job);
    dispatch(setAllJobs(dummyJobs));
    // useEffect(()=>{
    //     const fetchAllJobs = async () => {
    //         try {
    //             const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,{withCredentials:true});
    //             if(res.data.success){
    //                 dispatch(setAllJobs(res.data.jobs));
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     fetchAllJobs();
    // },[])
}

export default useGetAllJobs

