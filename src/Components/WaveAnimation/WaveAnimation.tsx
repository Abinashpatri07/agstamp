// import React, { useEffect, useRef } from "react";

// const WaveAnimation: React.FC<{ offsetX?: number; opacity?: number; color?: string }> = ({ offsetX = 0, opacity = 1, color = "#3b82f6" }) => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const resizeCanvas = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerWidth < 640 ? 60 : 100;
//     };

//     resizeCanvas();
//     window.addEventListener("resize", resizeCanvas);

//     let waveOffset = offsetX; // Each wave has a different offset
//     const waveHeight = window.innerWidth < 640 ? 10 : 20;
//     const waveFrequency = window.innerWidth < 640 ? 0.03 : 0.02;
//     const waveSpeed = window.innerWidth < 640 ? 0.04 : 0.05;

//     const drawWave = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       ctx.fillStyle = color;
//       ctx.globalAlpha = opacity; // Adjust opacity for layering effect
//       ctx.beginPath();

//       for (let x = 0; x < canvas.width; x++) {
//         const y = Math.sin(x * waveFrequency + waveOffset) * waveHeight + waveHeight;
//         ctx.lineTo(x, y);
//       }

//       ctx.lineTo(canvas.width, canvas.height);
//       ctx.lineTo(0, canvas.height);
//       ctx.closePath();
//       ctx.fill();

//       waveOffset += waveSpeed;
//       requestAnimationFrame(drawWave);
//     };

//     drawWave();

//     return () => {
//       cancelAnimationFrame(drawWave as any);
//       window.removeEventListener("resize", resizeCanvas);
//     };
//   }, [offsetX, opacity, color]);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="absolute top-0 left-0 w-full"
//     />
//   );
// };


// export default WaveAnimation;

import React, { useEffect, useRef, useState } from "react";
import "./WaveImage.css"; // Import the CSS file
import { img6 } from "../../assets/image";

const WaveAnimation: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    // Load the image
    const img = new Image();
    img.src = img6;
    img.onload = () => {
      setImage(img);
    };
  }, [imageUrl]);

  useEffect(() => {
    if (!image) return; // Wait for the image to load

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = (window.innerWidth * image.height) / image.width; // Maintain aspect ratio
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let time = 0; // Time variable for animation

    const drawWaterEffect = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Apply wave distortion to the image
      for (let x = 0; x < canvas.width; x++) {
        const waveOffset = Math.sin(x * 0.02 + time) * 10; // Wave distortion
        ctx.drawImage(
          image,
          x, // Source X
          0, // Source Y
          1, // Source width (1 pixel column)
          image.height, // Source height
          x, // Destination X
          waveOffset, // Destination Y (apply distortion)
          1, // Destination width
          canvas.height // Destination height
        );
      }

      // Update time for animation
      time += 0.05;

      requestAnimationFrame(drawWaterEffect);
    };

    drawWaterEffect();

    return () => {
      cancelAnimationFrame(drawWaterEffect as any);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [image]);

  return (
    <div className="wave-container">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full"
      />
      <div className="wave-overlay"></div> {/* Add overlay for reflection effect */}
    </div>
  );
};

export default WaveAnimation;