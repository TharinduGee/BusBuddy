import React from "react";
import Header from "../../Components/Header.jsx";
import './Login_page.css'

function Login_page() {
  return (
    <div>
      <Header />

      <div className="registration-page registration-page-sm">
        <h1>JOIN WITH US</h1>
        <div className="container">
          <form>
            <h3>LOG IN</h3>
            <div className="formfield">
              <label htmlFor="email">Email</label>
              <input type="email" placeholder="Enter Email" className="form-d" />
            </div>
            <div className="formfield">
              <label htmlFor="psw">Password</label>
              <input type="password" placeholder="Enter Password" className="form-d" />
            </div>
            <div className="continue_buttton">
              <button>Continue</button>
            </div>
            <div>Or connect with social media</div>
            <div className="extra_buttton">
              <button>Sign from Google</button>
              <button>Sign from Instagram</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login_page;
