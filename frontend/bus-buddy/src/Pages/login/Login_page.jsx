import React from "react";
import Header from "../../Components/Header.jsx";
import './Login_page.css';
import { FaGoogle,FaInstagram } from "react-icons/fa6";
import SocialMediaBar from '../../Components/SocialMediaBar.jsx'
import Footer from '../../Components/Footer.jsx'

function Login_page() {
  return (
    <div>
      <Header />
      <div className="row d-flex justify-content-around registration-page registration-page-sm">
        <div className="col-4 m-5 d-flex justify-content-center pt-4">
          <h1>JOIN WITH US</h1>
        </div>
        <div className="col-5 m-5">
          <div>
            <form>
              <div>
                <h3>LOG IN</h3>
              </div>
              <div className="formfield m-2">
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Enter Email" className="form-d" />
              </div>
              <div className="formfield m-2">
                <label htmlFor="psw">Password</label>
                <input type="password" placeholder="Enter Password" className="form-d" />
              </div>
              <div className="d-flex justify-content-center">
                <button className="m-4 continue_button " style={{ width: '200px' }}>Continue</button>
              </div>
              <div className="text-center fw-bold m-5">
                Or connect with social media
              </div>
              <div className="row text-center justify-content-between">
                <button className="col m-3 p-3 extra_button bg-yellow d-flex justify-content-center align-items-center">
                  <FaGoogle className="icon me-2" />
                  Sign in with Google
                </button>
                <button className="col m-3 p-3 extra_button bg-yellow d-flex justify-content-center align-items-center">
                  <FaInstagram className="icon me-2" />
                  Sign in with Instagram
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <SocialMediaBar />
      <Footer />
    </div>
  )
}

export default Login_page;
