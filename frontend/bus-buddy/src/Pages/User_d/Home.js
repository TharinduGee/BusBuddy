import React , {useState} from "react";


function Home(){
     return(
          <div>
          <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">Home</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Overview
            </li>
          </ol>
        </nav>
        <h1 class="h2">Dashboard</h1>
        <p>
          This is the homepage of a simple admin interface 
        </p> 
          </div>
         
     );
};

export default  Home;
    