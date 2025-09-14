import React from "react";
import { motion } from "framer-motion";

const Marquee = () => {
  const logos = [
    { src: "VTN.svg", width: 115, height: 75 },
    { src: "amazon.svg", width: 100, height: 50 },
    { src: "facebook.svg", width: 110, height: 70 },
    { src: "flipkart.svg", width: 115, height: 65 },
    { src: "jio.svg", width: 120, height: 80 },
    { src: "google.svg", width: 112, height: 72 },
  ];

  return (
    <div className="overflow-hidden bg-white py-6">
      <motion.div
        className="flex gap-20"
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
      >
        {logos.map((logo, index) => (
          <img
            key={index}
            src={`/logos/${logo.src}`}
            alt={logo.src.replace(".svg", "")}
            width={logo.width}
            height={logo.height}
            className="object-contain"
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
