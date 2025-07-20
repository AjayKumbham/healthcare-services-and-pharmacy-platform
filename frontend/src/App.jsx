import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Index from "/src/routes/index/Index";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Landing/login/Login";
import Signup from "./pages/Landing/signup/Signup";
import ForgotPassword from "./pages/Landing/forgotpassword/ForgotPassword";
import Home from "./pages/Home/Home";
import FAQ from "./pages/faqs/FAQs";
import Upload from './pages/Upload/Upload';
import Prescription from './pages/Prescription/Prescription';
import YourOrders from './pages//Home/YourOrders';
import Support from './pages/Home/Support';
import Membership from './pages/Home/Membership';
import Cart from './pages/Cart/CartMed';
import Checkout from './pages/Cart/Checkout';
import Validate from './pages/Cart/Valdate';
import HealthDashboard from './pages/Health/HealthDashboard'
import StoreDashboard from './pages/pharmaStore/StoreDashboard';
import Error from "./pages/error/Error";
import Admin from "./pages/admin/Admin";
import MemberProfilePage from "./pages/Home/memberprofilepage";
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/home" element={<ProtectedRoute element={Home} />} />
        <Route path="/faqs" element={<ProtectedRoute element={FAQ}/>} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/support" element={<Support />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/validate" element={<Validate />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/prescription" element={<Prescription />} />
        <Route path="/storeDashboard" element={<StoreDashboard />} />
        <Route path="/health" element={<HealthDashboard />} />
        <Route path="/orders" element={<YourOrders />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/memberprofilepage" element={<MemberProfilePage />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

