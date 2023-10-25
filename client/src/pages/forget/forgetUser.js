import React from "react";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import backgroundImage from '../img/bg-log.png';
// import './Otp.css'

export default function ForgetUser() {
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    try {
        console.log(values);
      const response = await axios.post("/api/auth/forgetPassword", values);

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/userReset");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  return (

    <section className="vh-100 bg-image"
    style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
    <div className="mask d-flex align-items-center h-100 gradient-custom-3">
      <div className="container h-100">
        <div className="logo-text">
          <div className="logo">Book Me Hotel</div>
          {/* <div className="text">THE BEST</div>
          <div className="text text1">HOTELS</div> */}
        </div>
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6" style={{ marginLeft: '60px' }}>
            <div className="card" style={{ borderRadius: "10px" }}>
              <div className="card-body p-5">
                <h2 className="text-uppercase text-center mb-5">RESET PASSWORD</h2>

                <Form onFinish={onSubmit}>
                  <div className="form-outline mb-4">
                    <Form.Item name="email" >
                      <Input type="email" id="form3Example4cg" placeholder='Enter your email' className="form-control form-control-lg" />
                    </Form.Item>                  
                  </div>
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-success btn-block btn-lg gradient-custom-4 text-body" htmlType="submit">RESET</button>
                  </div>
                </Form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}