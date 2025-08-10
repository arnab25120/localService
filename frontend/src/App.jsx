import { Route, Routes } from "react-router-dom";

import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import ChangePassword from "./pages/auth/ChangePassword.jsx";
import Home from "./pages/Home.jsx";
import AdminDashboard from "./pages/admin/adminDashboard.jsx";
import CreateService from "./pages/provider/createService.jsx";
import EditService from "./pages/provider/EditService.jsx";
import ProviderDashboard from "./pages/provider/ProviderDashboard.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/ui/Footer.jsx";
import ServiceList from "./pages/services/ServiceList.jsx";
import ServiceDetail from "./pages/services/ServiceDetail.jsx";

import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import RedirectIfLoggedIn from "./routes/RedirectIfLoggedIn.jsx";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
    <Navbar />
    <main className="min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServiceList />} />
        <Route path="/services/:id" element={<ServiceDetail />} />

        <Route
          path="/login"
          element={
            <RedirectIfLoggedIn>
              <Login />
            </RedirectIfLoggedIn>
          }
        />
        <Route
          path="/register"
          element={
            <RedirectIfLoggedIn>
              <Register />
            </RedirectIfLoggedIn>
          }
        />

        <Route
        path="/services"
        element={
          <ServiceList/>
        }
        />

        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/provider/dashboard"
          element={
            <ProtectedRoute allowedRoles={["provider"]}>
              <ProviderDashboard />
            </ProtectedRoute>
          }
        />

        <Route
        path="/services/create"
          element={
            <ProtectedRoute allowedRoles={["provider"]}>
              <CreateService/>
            </ProtectedRoute>
          }
        />

        <Route
        path="/provider/edit/:id"
        element={
          <ProtectedRoute allowedRoles={["provider"]} >
            <EditService/>
          </ProtectedRoute>
        } 
        />
         <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute isAdminOnly={true}>
               <AdminDashboard/>S
              </ProtectedRoute>
            }
          />
        <Route path="*" element={<h1 className="text-center mt-10 text-2xl text-red-600">404 - Page Not Found</h1>} />
      </Routes>
   </main>
    <Footer/>
    <ToastContainer position="top-center" autoClose={3000}/>
    </>
  );
}

export default App;