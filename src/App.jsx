import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
// import Login from './pages/Login'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Company from './components/Company'
import Interviewer from './components/Interviewer/Interviewer'
import CompanyProtectedRoute from './components/admin/CompanyProtectedRoute'
import InterviwerProtectedRoute from './components/admin/InterviwerProtectedRoute'
import MoreCompanyInfo from './components/MoreCompanyInfo'
import CompanyInfo from './components/CompanyInfo'
import CompanyProfile from './components/CompanyProfile'
import PostJobCompany from './components/PostJobCompany'
import GetAllJobs from './components/GetAllJobs'
import JobDetails from './components/JobDetails'
import JobTable from './components/JobTable'
import UserProtectedRoute from './components/admin/UserProtectedRoute'
import User from './components/User'
import Create from './components/Create'
import EducationalDetails from './components/EducationalDetails'
import OtherDetails from './components/OtherDetails'
import AppliedJobTable from './components/AppliedJobTable'
import AppliedHistroy from './components/AppliedHistroy'
import InterviewerProfileStep2 from './components/Interviewer/InterviewerProfileStep2'
import Dashboard from './components/Interviewer/Dashboard'
import AboutUs from './components/AboutUs'
import ContactUs from './components/ContactUs'
import ErrorBoundary from './components/ErrorBoundary'
import RejectedCandidate from './components/RejectedCandidate'
import SelectedCandidate from './components/SelectedCandidate'
import BookSlot from './components/BookSlot'
import Upcomming from './components/Upcomming'
import UpcomingInterviews from './components/Interviewer/UpcomingInterviews'
import Interviwer from './interviewPortal/Interviwer'
import MediaAccessPage from './interviewPortal/MediaAcessPage'
import Candidate from './interviewPortal/CandidteLoading'
import CodeEditor from './interviewPortal/CodeEditor'
import RazorpayButton from './Razorpay/RazorpayButton'
import PaymentStudent from './components/PaymentStudent'
import PaymentCompany from './components/PaymentCompany'
import PerformancePage from './components/PerformancePage'
import ErrorPage from './components/ErrorPage'
import ProfileInterviwer from './components/Interviewer/ProfileInterviwer'
import GetTopStudents from './components/GetTopStudents'
import InterviewVideos from './interviewPortal/InterviewVideos'
const appRouter = createBrowserRouter([
  
  {
    path: '/',
    element: <UserProtectedRoute><Home /></UserProtectedRoute>
  },
  {
    path: '/user',
    element: <UserProtectedRoute><User /></UserProtectedRoute>
  },
  {
    path: '/company',
    element: <CompanyProtectedRoute><Company /></CompanyProtectedRoute>

  },
  {
    path: '/book-slot',
    element: <BookSlot />

  },
{
  path:'/admin',
  element:<InterviewVideos/>
},
  {
    path: '/contact',
    element: <ContactUs />

  },
  {
    path: '/create',
    element: <UserProtectedRoute><Create /></UserProtectedRoute>

  },
  {
    path: '/educational-details',
    element: <EducationalDetails />
  },
  {
    path: '/upcomming',
    element: <Upcomming />
  },
  {
    path: '/other-details',
    element: <OtherDetails />

  },
  {
    path: '/about',
    element: <AboutUs />

  },
  {
    path: '/Interviewer',
    element: <InterviwerProtectedRoute><Interviewer /></InterviwerProtectedRoute>

  },
  {
    path: '/interviewer-profile-step-2',
    element: <InterviwerProtectedRoute><InterviewerProfileStep2 /></InterviwerProtectedRoute>

  },
  {
    path: '/dashboard',
    element: <Dashboard />

  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },

  {
    path: "/description/:id",
    element: <JobDescription />
  },
  {
    path: "/company/post",
    element: <PostJobCompany />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/companyProfile",
    element: <CompanyProfile />
  },
  {
    path: "/company/getAlljob",
    element: <GetAllJobs />
  },
  {
    path: "/jobTable/:jobId",
    element: <JobTable />
  },
  {
    path: "/company/getAlljob/:jobId",
    element: <JobDetails />

  },
  {
    path: "/company/:jobId",
    element: <SelectedCandidate />
  },
  {
    path: "/rejected/:jobId",
    element: <RejectedCandidate />
  },

  {
    path: "/company/moreInfo",
    element: <MoreCompanyInfo />
  },
  {
    path: "/applied_jobs",
    element: <AppliedHistroy />
  },

  {
    path: "/companyInfo",
    element: <CompanyProtectedRoute> <CompanyInfo /></CompanyProtectedRoute>
  },
  {
    path: "/Dashboard",
    element: <InterviwerProtectedRoute> <Dashboard /></InterviwerProtectedRoute>
  },
  {
    path: "/interviewer/interviews",
    element:  <UpcomingInterviews />
  },
  {
    path: '/instruction/:intervieweID',
    element: <MediaAccessPage />
  },
  {
    path: '/interviwer/:interviweID',
    element: <Interviwer />
  },
  {
    path: '/candidate/:interviweID',
    element: <UserProtectedRoute><Candidate /></UserProtectedRoute>
  },
{
  path:'/codeEditor/:interviweID',
  element:<CodeEditor/>
},
// {
//   path:'/payment',
//   element:<RazorpayButton/>
// }
{
  path:'/payment',
  element:<PaymentStudent/>
},

{
  path:'/paymentCompany',
  element:<PaymentCompany/>
},
{
  path:'/performance',
  element:<PerformancePage/>
},
{
  path:'/error',
  element:<ErrorPage/>
},
{
  path:'/interviewer/profile',
  element:<ProfileInterviwer/>
},
{
  path:'/getTop',
  element:<GetTopStudents/>
}

])
function App() {

  return (
    <ErrorBoundary>
      <RouterProvider router={appRouter} />
    </ErrorBoundary>
  )
}

export default App
