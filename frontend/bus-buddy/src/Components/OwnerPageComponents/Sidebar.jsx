import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../../Assets/bus.png";
import "./Sidebar.css";
import dashbordIcon from "../../Assets/Navbar/dashbord.png";
import OperationHub from "../../Assets/Navbar/Operation Hub.png";
import FinacialCenter from "../../Assets/Navbar/Finacial_Center.png";
import TeamDirectory from "../../Assets/Navbar/Team_Directory.png";
import FleetOperation from "../../Assets/Navbar/Fleet_Operations.png";
import FileLibrary from "../../Assets/Navbar/File_Library.png";
import Tax_Insight from "../../Assets/Navbar/Tax_insight.png";
import routemanagement from "../../Assets/Navbar/Route_Manage.png";
import tripManagement from "../../Assets/Navbar/Trip_management.png";
import { IoIosMenu, IoIosClose } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Sidebar() {
  const [sidebarClass, setSidebarClass] = useState("sidebar");
  const [mainClass, setmainClass] = useState("main-content");
  const spans = document.querySelectorAll("span");
  const [activeLink, setActiveLink] = useState("");
  const [username, setUsername] = useState("");
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [imageData, setImageData] = useState(null);

  const [menuIcon, setMenuIcon] = useState(<IoIosMenu name="menu-outline" />);

  useEffect(() => {
    setMenuIcon(
      sidebarClass === "sidebar" ? (
        <IoIosMenu name="menu-outline" />
      ) : (
        <IoIosClose name="close-outline" />
      ),

      sidebarClass === "sidebar"
        ? setmainClass("main-content")
        : setmainClass("main-content-hidden")
    );

    setActiveLink(location.pathname);
  }, [sidebarClass]);

  const togglemenu = () => {
    if (sidebarClass === "sidebar") {
      setSidebarClass("sidebar max-sidebar ");
    } else {
      setSidebarClass("sidebar");

      spans.forEach((span) => {
        span.classList.remove("hidden");
      });
    }
  };

  const toggleSidebar = () => {
    if (sidebarClass === "sidebar") {
      setSidebarClass("sidebar mini-sidebar ");
      spans.forEach((span) => {
        span.classList.add("hidden");
      });
    } else {
      setSidebarClass("sidebar");
      spans.forEach((span) => {
        span.classList.remove("hidden");
      });
    }
  };

  const handleLogOut = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/v1/user/getUsername`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setUsername(response.data);
        console.log("Data successfully fetched:", response.data);
      })
      .catch(function (error) {
        console.error("Error posting data:", error);
      });
  }, [token]);

  function arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  async function fetchImageData(url) {
    try {
      const response = await axios.get(url, {
        responseType: "arraybuffer",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching image data:", error);
      return null;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      var data = await fetchImageData(
        "http://localhost:8081/api/v1/user/getImage"
      );
      if (data) {
        var base64Image = arrayBufferToBase64(data);
        setImageData(`data:image/png;base64,${base64Image}`);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="sidebar-container">
      <div className="menu" onClick={togglemenu}>
        {menuIcon}
      </div>
      <div className={sidebarClass}>
        <div>
          <div className="page-name">
            <img
              id="cloud"
              src={logo}
              className="sidebaricon_main"
              onClick={toggleSidebar}
            />
            <span>BusBuddy</span>
          </div>
        </div>
        <div className="user ms-3">
          <img name="ellipsis-vertical-outline" src={imageData} />

          <div className="user-info">
            <div className="name-email">
              <span className="name">{username}</span>
              <span className="email">ID: CP001238905</span>
            </div>
          </div>
        </div>
        <div className="line"></div>
        <nav className="navigation">
          <ul className="px-3">
            <li>
              <a
                href="/dashboard"
                className={activeLink === "/dashboard" ? "active-link" : ""}
              >
                <img src={dashbordIcon} className="sidebaricon" />
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="/operationhub"
                className={activeLink === "/operationhub" ? "active-link" : ""}
              >
                <img src={OperationHub} className="sidebaricon" />
                <span>Operations Hub</span>
              </a>
            </li>
            <li>
              <a
                href="/finacialcenter"
                className={
                  activeLink === "/finacialcenter" ? "active-link" : ""
                }
              >
                <img src={FinacialCenter} className="sidebaricon" />
                <span>Financial Center</span>
              </a>
            </li>
            <li>
              <a
                href="/teamdirectory"
                className={
                  activeLink === "/teamdirectory" ||
                  activeLink === "/teamdirectory/addemployee"
                    ? "active-link"
                    : ""
                }
              >
                <img src={TeamDirectory} className="sidebaricon" />
                <span>Team Directory</span>
              </a>
            </li>
            <li>
              <a
                href="/fleetoperation"
                className={
                  activeLink === "/fleetoperation" ? "active-link" : ""
                }
              >
                <img src={FleetOperation} className="sidebaricon" />
                <span>Fleet Operations</span>
              </a>
            </li>
            <li>
              <a
                href="/filelibrary"
                className={activeLink === "/filelibrary" ? "active-link" : ""}
              >
                <img src={FileLibrary} className="sidebaricon2" />
                <span>File Library</span>
              </a>
            </li>
            <li>
              <a
                href="/taxinsights"
                className={activeLink === "/taxinsights" ? "active-link" : ""}
              >
                <img src={Tax_Insight} className="sidebaricon2" />
                <span>Tax Insights</span>
              </a>
            </li>
            <li>
              <a
                href="/routemanagement"
                className={
                  activeLink === "/routemanagement" ? "active-link" : ""
                }
              >
                <img src={routemanagement} className="sidebaricon2" />
                <span>Route Management</span>
              </a>
            </li>
            <li>
              <a
                href="/tripmanagement"
                className={
                  activeLink === "/tripmanagement" ? "active-link" : ""
                }
              >
                <img src={tripManagement} className="sidebaricon2" />
                <span>Trip Management</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="line"></div>
        <a className="logout" href="#">
          <FiLogOut className="logout-btn ms-4 py-2" />
          <span onClick={handleLogOut}>Log Out</span>
        </a>
        <div></div>
      </div>
      <div className={mainClass}>
        <Outlet />
      </div>
    </div>
  );
}

export default Sidebar;
