import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import BusImage1 from "../../../Assets/ImageBus1.png";
import BusImage2 from "../../../Assets/ImageBus2.png";
import BusImage3 from "../../../Assets/ImageBus3.png";
import BusImage4 from "../../../Assets/ImageBus4.png";
import "./Gallery.css";
function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function QuiltedImageList() {
  return (
    <div className="d-flex flex-shrink">
      <ImageList
        sx={{
          padding: "20px",
          width: "860px",
          height: "639px",
          overflow: "visible",
          "@media (max-width: 870px)": {
            width: "750px", // Adjust the width for smaller devices
            padding: "10px", // Adjust the height for smaller devices
          },
          "@media (max-width: 770px)": {
            width: "650px", // Adjust the width for smaller devices
            padding: "10px", // Adjust the height for smaller devices
          },
          "@media (max-width: 640px)": {
            width: "350px", // Adjust the width for smaller devices
            padding: "10px", // Adjust the height for smaller devices
          },
        }}
        variant="quilted"
        cols={5}
        rowHeight={100}
        className="list-image"
      >
        {itemData.map((item) => (
          <ImageListItem
            key={item.img}
            cols={item.cols || 1}
            rows={item.rows || 1}
            className="image-list-container"
          >
            <img
              {...srcset(item.img, 121, item.rows, item.cols)}
              alt={item.title}
              loading="lazy"
            />
            <div className="image-details">
              <div className="heading-title">{item.title}</div>
              <div className="normal-para">{item.info}</div>
            </div>
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

const itemData = [
  {
    img: BusImage1,
    title: "Bus driver of the month",
    info: "Next biz Unveils Groundbreaking CRM  Solution for Enhanced Customer Engagement",
    rows: 3,
    cols: 2,
  },
  {
    img: BusImage2,
    title: "New fuel efficiency regulations",
    info: "How BusBuddy can help you comply and save",
    rows: 3,
    cols: 3,
  },
  {
    img: BusImage3,
    title: "Safety Tips for Bus Drivers in Sri Lanka",
    info: "Practical tips for preventing accidents and ensuring passenger safety",
    rows: 3,
    cols: 3,
  },
  {
    img: BusImage4,
    title: "How NCG Grew 20% in One Year with BusBuddy",
    rows: 3,
    cols: 2,
  },
];
