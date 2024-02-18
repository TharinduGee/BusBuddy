import React, { useState, useEffect } from "react";
import logo from "../../../Assets/bus.png";
import "./SidebarOwner.css";
import { IoIosMenu, IoIosClose } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { useLocation } from "react-router-dom";

function SidebarOwner({ children }) {
  const [sidebarOwnerClass, setSidebarOwnerClass] = useState("sidebarOwner");
  const [mainClass, setmainClass] = useState("main-content");
  const spans = document.querySelectorAll("span");
  const [activeOwnerLink, setActiveOwnerLink] = useState("");
  const location = useLocation();

  const [menuIcon, setMenuIcon] = useState(<IoIosMenu name="menu-outline" />);

  useEffect(() => {
    setMenuIcon(
      sidebarOwnerClass === "sidebarOwner" ? (
        <IoIosMenu name="menu-outline" />
      ) : (
        <IoIosClose name="close-outline" />
      ),

      sidebarOwnerClass === "sidebarOwner"
        ? setmainClass("main-content")
        : setmainClass("main-content-hidden")
    );

    setActiveOwnerLink(location.pathname);
  }, [sidebarOwnerClass]);

  const togglemenu = () => {
    if (sidebarOwnerClass === "sidebarOwner") {
      setSidebarOwnerClass("sidebarOwner max-sidebarOwner ");
    } else {
      setSidebarOwnerClass("sidebarOwner");

      spans.forEach((span) => {
        span.classList.remove("hidden");
      });
    }
  };

  const toggleSidebarOwner = () => {
    if (sidebarOwnerClass === "sidebarOwner") {
      setSidebarOwnerClass("sidebarOwner mini-sidebarOwner ");
      spans.forEach((span) => {
        span.classList.add("hidden");
      });
    } else {
      setSidebarOwnerClass("sidebarOwner");
      spans.forEach((span) => {
        span.classList.remove("hidden");
      });
    }
  };
  return (
    <div className="sidebarOwner-container">
      <div className="menu" onClick={togglemenu}>
        {menuIcon}
      </div>
      <div className={sidebarOwnerClass}>
        <div>
          <div className="page-name">
            <img
              id="cloud"
              src={logo}
              className="sidebarOwnericon_main"
              onClick={toggleSidebarOwner}
            />
            <span>BusBuddy</span>
          </div>
        </div>
        <div className="user ms-3">
          <img name="ellipsis-vertical-outline" src={logo} />

          <div className="user-info">
            <div className="name-email">
              <span className="name">Chathurya Prasad</span>
              <span className="email">ID: CP001238905</span>
            </div>
          </div>
        </div>
        <div className="title-text">
          <span>Profile & Settings</span>
        </div>
        <div className="line"></div>
        <nav className="navigationOwner">
          <ul className="px-3">
            <li>
              <a
                href="/membership"
                className={activeOwnerLink === "/membership" ? "activeOwner-link" : "notactiveOwner-link"}
              >
                {activeOwnerLink === "/membership" ? <span>|  Membership</span> : <span>Membership</span>}
              </a>
            </li>
            <li>
              <a
                href="/contactInfo"
                className={activeOwnerLink === "/contactInfo" ? "activeOwner-link" : "notactiveOwner-link"}
              >
                {activeOwnerLink === "/contactInfo" ? <span>|  Contact Info</span> : <span>Contact Info</span>}
                
              </a>
            </li>
            <li>
              <a
                href="/passwordSecurity"
                className={
                  activeOwnerLink === "/passwordSecurity" ? "activeOwner-link" : "notactiveOwner-link"
                }
              >
                {activeOwnerLink === "/passwordSecurity" ? <span>|  Password & Security</span> : <span>Password & Security</span>}
              
              </a>
            </li>
            <li>
              <a
                href="/notifications"
                className={
                  activeOwnerLink === "/notifications" ? "activeOwner-link" : "notactiveOwner-link"
                }
              >
                {activeOwnerLink === "/notifications" ? <span>|  Notifications</span> : <span>Notifications</span>}
                
              </a>
            </li>
          </ul>
        </nav>
        <div className="line"></div>
        <a className="logout" href="#">
          <FiLogOut className="logout-btn ms-4 py-2" />
          <span>Log Out</span>
        </a>
        <div></div>
      </div>
      <div className={mainClass}>{children}</div>
    </div>
  );
}

export default SidebarOwner;
