import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from "react-router-dom";
import { Layout } from "./Layout";
import { Signup } from "./auth/Signup";
import { Login } from "./auth/Login";
import { About } from "./pages/About";
import { Eligible } from "./pages/Eligible";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { Calendar } from "./pages/Calendar";
import { ProtectedRoute } from "./Components/ProtectedRoute";
import { Dashboard } from "./Dashboards/AdminDashboard/Components/Dashboard";
import { UserDashboard } from "./Dashboards/UserDashBaord/UserDashboard";
import { RegisterationApproval } from "./Dashboards/AdminDashboard/pages/RegisterationApproval";
import { AdminHome } from "./Dashboards/AdminDashboard/pages/AdminHome";
import { Training } from "./Dashboards/AdminDashboard/pages/Training";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]} />}>
          <Route path="/admin" element={<Dashboard />}>
            <Route index element={<AdminHome />} /> {/* Default Admin Home */}
            <Route path="approval" element={<RegisterationApproval />} /> {/* Corrected path */}
            <Route path="add-training" element={<Training/>}/>
          </Route>
        </Route>

        {/* Protected User Routes */}
        <Route element={<ProtectedRoute allowedRoles={["ROLE_USER"]} />}>
          <Route path="/user" element={<UserDashboard />} />
        </Route>

        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="eligibility" element={<Eligible />} />
          <Route path="contact" element={<Contact />} />
          <Route path="calendar" element={<Calendar />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
