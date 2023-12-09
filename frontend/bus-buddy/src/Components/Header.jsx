// Header.js
import "../App.css";
import React from "react";

function Header() {
  return (
    <div className="navbar  align-items-center">
      <div>
        <a
          class="text-light fw-bold px-3 py-2 rounded-3 custom-margin custom-margin-sm "
          href="#"
          role="button"
          style={{ fontFamily: "Inter", textDecoration: "none" }}
        >
          Home
        </a>
      </div>

      <div class="d-flex align-items-center custom-margin custom-margin-sm">
        <a
          href="#"
          class="text-light fs-6 fw-bold me-3"
          style={{ textDecoration: "none", fontFamily: "Inter" }}
        >
          Log in
        </a>

        <a
          class="btn btn-light fw-bold px-3 py-2 rounded-3  "
          href="/Registration_page"
          role="button"
          style={{ fontFamily: "Inter" }}
        >
          Sign Up
        </a>
      </div>
    </div>
  );
}

export default Header;
