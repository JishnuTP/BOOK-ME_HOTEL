import { Form,Input } from 'antd'
import React from 'react'
import './login.css'
import backgroundImage from '../img/bg-log.png';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast from "react-hot-toast"
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';


function Login() {

  const navigate= useNavigate();
  const dispatch = useDispatch(); 

  // validation process
  const EmailRules=[{required:true,message:'Enter Email'}];
  const passwordRules=[{required:true,message:'Enter password'}]


  const onSubmit= async(values) =>{
    console.log(values)

    try {
      dispatch(showLoading());
      const response = await axios.post('/api/auth/login',values)
      dispatch(hideLoading());
      if(response.data.success){
        toast.success(response.data.message)
        toast("Redirecting to Home page")
        localStorage.setItem("token",response.data.data)
        navigate("/"); 
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("something went wrong")
    }
  }


  return (
    <section className="vh-100 bg-image"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="logo-text">
            <div className="logo">Book Me Hotel</div>
            <div className="text">THE BEST</div>
            <div className="text text1">HOTELS</div>
          </div>
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6" style={{ marginLeft: '600px' }}>
              <div className="card" style={{ borderRadius: "10px" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Login</h2>

                  <Form onFinish={onSubmit}>



                    <div className="form-outline mb-4">
                      <Form.Item name="email" rules={EmailRules}>
                        <Input type="email" id="form3Example3cg" placeholder='Enter Your Email' className="form-control form-control-lg" />
                      </Form.Item>

                      
                    </div>

                    <div className="form-outline mb-4">
                      <Form.Item name="password" rules={passwordRules}>
                        <Input type="password" id="form3Example4cg" placeholder='Enter your password' className="form-control form-control-lg" />
                      </Form.Item>
                      
                    </div>



                    <div className="d-flex justify-content-center">
                      <button
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body" htmlType="submit">LOGIN</button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">Don"t have an account? <Link to="/register"
                      className="fw-bold text-body"><u>Register here</u></Link>                     
                      
                      </p>
                      <p className='forget '>  
                      <a  href="/forgetPassword">forget password</a>
                      </p>
                      
                       

                  </Form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};




export default Login