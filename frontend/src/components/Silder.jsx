import React, { useEffect, useState } from "react";
import img1 from "../images/testing.jpg";
import img2 from "../images/second-photo.jpg";
import img3 from "../images/three-image.jpg"; // Add as many images as needed

const images = [img1, img2, img3];

export default function Slider() {
  const [current, setCurrent] = useState(0);
  console.log(images[current])

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrent((prev) => (prev + 1) % images.length);
  //   }, 3000); // Change every 3 seconds
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div style={{ height: "320px", width: "100%", overflow: "hidden" }}>
      <img
        src={images[current] || <p>Loading...</p>}
        alt="slider"
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
          transition: "all 0.5s ease-in-out"
        }}
      />
    </div>
  );
}
