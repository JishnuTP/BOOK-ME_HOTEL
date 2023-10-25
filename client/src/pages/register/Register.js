import {Form,Input} from 'antd'
import React, { useState } from 'react'
import './register.css'
import backgroundImage from '../img/bg-log.png';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast"
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';


function Register() {

  
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
      setPasswordsMatch(e.target.value === confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
      setConfirmPassword(e.target.value);
      setPasswordsMatch(e.target.value === password);
    };

  const dispatch = useDispatch();
  const navigate = useNavigate();

   // validation process
   const NameRules=[{required:true,message:'Enter name'}];
   const EmailRules=[{required:true,message:'Enter Email'}];
   const passwordRules=[{required:true,message:'Enter password'}];
   const PhoneRules=[{required:true,message:'Enter Phone number'}]

    



  const onSubmit= async(values) =>{
    try {
      dispatch(showLoading());
      const response = await axios.post('/api/auth/register',values)
      dispatch(hideLoading());
      if(response.data.success){
        toast.success(response.data.message)
        toast("Redirecting to login page")
        navigate("/otp"); 
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
          style={{ backgroundImage: `url(${backgroundImage})`,backgroundSize: 'cover'  }}>
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
                      <h2 className="text-uppercase text-center mb-5">Register</h2>
    
                      <Form onFinish={onSubmit}>
    
                        <div className="form-outline mb-4">
                          <Form.Item  name="name" rules={NameRules}>
                          <Input type="text" id="form3Example1cg" placeholder="Enter your name" className="form-control form-control-lg" />
                            
                             </Form.Item>
                         
                          
                        </div>
    
                        <div className="form-outline mb-4">
                        <Form.Item  name="email" rules={EmailRules}>
                          <Input type="email" id="form3Example3cg" placeholder="Enter your email" className="form-control form-control-lg" />
                          </Form.Item>
                          
                        </div>
                        <div className="form-outline mb-4">
                        <Form.Item  name="phone" rules={PhoneRules}>
                          <Input type="Number" id="form3Example3cg" placeholder="Enter your Phone" className="form-control form-control-lg" />
                          </Form.Item>
                          
                        </div>
    
                        <div className="form-outline mb-4">
                        <Form.Item  name="password" rules={passwordRules}>
                          <Input type="password" id="form3Example4cg" placeholder="Enter your password" className="form-control form-control-lg" onChange={handlePasswordChange} />
                          </Form.Item>
                          
                        </div>

                        <div className="form-outline mb-4">
                        <Form.Item  name="password" rules={passwordRules}>
                          <Input type="password" id="form3Example4cg" placeholder="Confirm your password" className="form-control form-control-lg"  onChange={handleConfirmPasswordChange} />
                          {!passwordsMatch && <p style={{ color: 'red',  }}>Passwords do not match</p>}
                          </Form.Item>
                          
                        </div>
    
    
                        
    
                        <div className="d-flex justify-content-center">
                          <button 
                            className="btn btn-success btn-block btn-lg gradient-custom-4 text-body" htmlType="submit">Register</button>
                        </div>
    
                        <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link to="/login"
                          className="fw-bold text-body"><u>Login here</u></Link></p>
                        
    
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
    
   
    

export default Register