import React from "react";
import Header from "../../Components/Header.jsx";
import SocialMediaBar from "../../Components/SocialMediaBar.jsx";
import Footer from "../../Components/Footer.jsx";
import "./RegistraionPage.css";

function RegistrationPage() {
  return (
    <div>
      <Header />
      <div className="d-flex justify-content-center registration-page registration-page-sm ">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 justify">
              <div className="join-text   ps-4">JOIN WITH US</div>
            </div>
            <div className="col-12 col-md-6 ps-5">
              <div className="sign-up-text">SIGN UP</div>
              <div>
                <div className="row row-cols-2 mt-3">
                  <div class="col label">First Name*</div>
                  <div class="col label">Last Name*</div>
                </div>
              </div>
              <div>
                <div class="row row-cols-2 mt-2">
                  <div class="col">
                    <input
                      type="text"
                      class="form-control transparent-box"
                      placeholder="First name"
                      aria-label="First name"
                    />
                  </div>
                  <div class="col">
                    <input
                      type="text"
                      class="form-control transparent-box"
                      placeholder="Last name"
                      aria-label="Last name"
                    />
                  </div>
                </div>
              </div>

              <div class="label mt-3">Email*</div>

              <input
                type="text"
                class="form-control transparent-box mt-2"
                placeholder="Email"
                aria-label="Email"
              />
              <div class="label mt-3">Mobile Phone Number*</div>

              <input
                type="text"
                class="form-control transparent-box text-box-width  mt-2"
                placeholder="+947611223344"
                aria-label="Email"
              />
              <div class="label mt-3">Password*</div>

              <input
                type="password"
                class="form-control transparent-box mt-2"
                placeholder="Your Password"
                aria-label="password"
              />
              <div class="label mt-3">
                * Something at least 8 characters Long
              </div>
              <div class="label mt-1">* Use at least one number</div>
              <div class="label mt-1">* Use at least one lowercase letter</div>
              <div class="label mt-1">
                * Use at least one uppercase letter (@,#,$,%..)
              </div>
              <div class="label mt-1">
                * Use at least one special characters
              </div>

              <div class="label mt-3">Confirm Password*</div>

              <input
                type="password"
                class="form-control transparent-box mt-2"
                placeholder="Confirm Your Password"
                aria-label="confirm_password"
              />
              <div className="row ms-1  mt-3">
                <input
                  class="col-1 form-check-input transparent-box"
                  type="checkbox"
                  id="gridCheck_1"
                />
                <label class="col  label" for="gridCheck_1">
                  Sign me up for the wish list weekly newsletter
                </label>
              </div>
              <div className="row ms-1 mt-2">
                <input
                  class="col-1 form-check-input transparent-box "
                  type="checkbox"
                  id="gridCheck_2"
                />
                <label className="col label" htmlFor="gridCheck_2">
                  By clicking the checkbox, I hereby (i) accept{" "}
                  <a href="link_to_terms_of_service">TERMS OF SERVICE</a> and
                  agree to be bound by them and (ii) acknowledge that I have
                  received and reviewed{" "}
                  <a href="link_to_privacy_policy">PRIVACY POLICY</a>.
                </label>
              </div>

              <div class="d-grid gap-2 mt-3 d-md-flex justify-content-md-start ">
                <button
                  class="btn btn-primary me-md-2 creat-account-btn"
                  type="button"
                >
                  CREATE ACCOOUNT
                </button>
              </div>
              <div class="d-flex flex-row mt-3 mb-5">
                <div class="mt-3 label">Already have an account?</div>
                <a href="">
                  <div class="mt-3 ms-2 clickable-text mb-3 ">Sign in here</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SocialMediaBar />
      <Footer />
    </div>
  );
}

export default RegistrationPage;
