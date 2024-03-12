import React, { useState, useEffect } from "react";
import './DriverProfile.css';

function Profile() {
  const [avatar, setAvatar] = useState(null); // State to store the avatar image

  const fetchImage = async () => {
    try {
      // Check if token exists in local storage
      const token = localStorage.getItem("jwt_token");
      if (!token) {
        console.error("JWT token not found in local storage.");
        return;
      }

      // Fetch image using API
      const response = await fetch("http://localhost:8081/api/v1/user/getImage", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch image.");
        return;
      }

      // Convert image response to blob
      const imageBlob = await response.blob();
      // Create object URL from blob
      const imageUrl = URL.createObjectURL(imageBlob);
      // Set the avatar state to the fetched image URL
      setAvatar(imageUrl);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  useEffect(() => {
    fetchImage(); // Call the fetchImage function when component mounts

    // Clean up function to revoke object URL
    return () => {
      if (avatar) {
        URL.revokeObjectURL(avatar);
      }
    };
  }, []);

  const handleImageChange = async (event) => {
    const selectedImage = event.target.files[0];

    try {
      // Check if token exists in local storage
      const token = localStorage.getItem("jwt_token");
      if (!token) {
        console.error("JWT token not found in local storage.");
        return;
      }

      // Create form data and append the image file
      const formData = new FormData();
      formData.append("image", selectedImage);

      // Upload image using API
      const response = await fetch("http://localhost:8081/api/v1/user/uploadImage", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        console.error("Failed to upload image.");
        return;
      }

      // Fetch and display the updated image
      fetchImage();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="d-flex flex-wrap justify-content align-items-center">
      <div>
        <img className="p-photo-view" src={avatar} alt="Driver Avatar" />
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <div className="d-flex flex-column">
        <label className="p-profession">Driver</label>
        <label className="p-name-avatar">Kamal Fernando</label>
        <div className="p-normal-details">
          <label>ID :</label>
          <label>PV13289290</label>
        </div>
      </div>
    </div>
  );
}

export default Profile;
