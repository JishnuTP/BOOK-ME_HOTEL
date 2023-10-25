import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Otp from "./pages/otp/Otp";
import ForgetUser from "./pages/forget/forgetUser";
import ResetOtp from "./pages/resetotp/ResetOtp";

import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

function App() {
  const {loading}= useSelector(state=>state.alerts)
  return (
    <BrowserRouter>
    {loading&&(<div className='spinner-parent'>
    <div class="spinner-grow"  role="status">
   
</div>
    </div>)}

    <Toaster position='top-center'  reverseOrder={false}/>

      <Routes>
        <Route path="/" element={<ProtectedRoute> <Home/> </ProtectedRoute>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/login" element={<PublicRoute> <Login/> </PublicRoute>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/otp" element={<Otp />} />
        <Route path="/forgetPassword" element={<ForgetUser />} />
        <Route path="/userReset" element={ <ResetOtp />  } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
