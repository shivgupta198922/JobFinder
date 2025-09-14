import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import About from "./pages/about"; 
import Contact from "./pages/contact.jsx";

// import contactRoutes from "./routes/contactRoutes.js";
import JobDescription from "./components/Jobs/JobDescription";
import SignUp from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Profiles from "./pages/Profiles";
import Browse from "./components/Home/Browse";
import Bookmark from "./components/Jobs/Bookmark";

import Companies from "./components/Admin/Companies";
import CompanyCreate from "./components/Admin/CompanyCreate";
import CompanySetup from "./components/Admin/CompanySetup";
import AdminJobs from "./components/Admin/AdminJobs";
import PostJob from "./components/Admin/PostJob";
import Applicants from "./components/Admin/Applicants";
import JobSetup from "./components/Admin/JobSetup";
import ProtectedRoute from "./components/Admin/ProtectedRoute";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> 
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profiles />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/description/:id" element={<JobDescription />} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/companies" element={<Companies />} />
          <Route path="/admin/companies/create" element={<CompanyCreate />} />
          <Route path="/admin/companies/:id" element={<CompanySetup />} />
          <Route path="/admin/jobs" element={<AdminJobs />} />
          <Route path="/admin/jobs/create" element={<PostJob />} />
          <Route path="/admin/jobs/:id" element={<JobSetup />} />
          <Route path="/admin/jobs/:id/applicants" element={<Applicants />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
