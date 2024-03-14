import React from "react";
import SidebarOwner from "./SidebarOwner";

function ContactInfo() {
    return (
        <SidebarOwner>
            <div className="d-flex flex-row mt-2 justify-content-start">
                <h1>Contact Info</h1>
            </div>
            <div className="borderdcontainer border border-2 border-dark rounded-4 m-5">
                <h2 className="m-3 ">Account</h2>
                <div className="row mt-2 p-3">
                    <div className="col-2 ">
                        <span className="p-3">User ID</span>
                    </div>
                    <div className="col-10">
                        <span>Johndoe1230345</span>
                    </div>
                </div>
                <div className="row mt-2 p-3">
                    <div className="col-2 ">
                        <span className="p-3">First Name</span>
                    </div>
                    <div className="col-4">
                        <span>John</span>
                    </div>
                    <div className="col-2">
                        <span>Second Name</span>
                    </div>
                    <div className="col-4">
                        <span>Doe</span>
                    </div>
                </div>
                <div className="row mt-2 p-3">
                    <div className="col-2">
                        <span className="p-3">Email</span>
                    </div>
                    <div className="col-10">
                        <span>Johndoe@gmail.com</span>
                    </div>
                </div>
                <div className="row mt-2 p-3">
                    <div className="col-2">
                        <span className="p-3">Phone</span>
                    </div>
                    <div className="col-10">
                        <span>+1 900 124 4012</span>
                    </div>
                </div>
            </div>
        </SidebarOwner>
);
}

export default ContactInfo;
