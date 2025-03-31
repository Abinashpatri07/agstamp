
// import React, { useEffect, useRef, useState } from "react";

// const WaveAnimation: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [image, setImage] = useState<HTMLImageElement | null>(null);

//   useEffect(() => {
//     const img = new Image();
//     img.src = imageUrl;
//     img.onload = () => {
//       setImage(img);
//     };
//     img.onerror = (error) => {
//       console.error("Failed to load image:", error);
//     };
//   }, [imageUrl]);

//   useEffect(() => {
//     if (!image) return;

//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const resizeCanvas = () => {
//       if (!canvas || !image) return;

//       const container = canvas.parentElement;
//       if (!container) return;

//       const containerWidth = container.clientWidth;
//       const containerHeight = container.clientHeight;

//       const imageAspectRatio = image.width / image.height*1.4;
//       const containerAspectRatio = containerWidth / containerHeight;

//       let canvasWidth, canvasHeight;

//       if (containerAspectRatio > imageAspectRatio) {
//         canvasHeight = containerHeight;
//         canvasWidth = canvasHeight * imageAspectRatio;
//       } else {
//         canvasWidth = containerWidth;
//         canvasHeight = canvasWidth / imageAspectRatio;
//       }

//       if (canvasWidth <= 0 || canvasHeight <= 0) {
//         console.error("Invalid canvas dimensions:", canvasWidth, canvasHeight);
//         return;
//       }

//       canvas.width = canvasWidth;
//       canvas.height = canvasHeight;
//     };

//     resizeCanvas();
//     window.addEventListener("resize", resizeCanvas);

//     let time = 0;

//     const drawWaterEffect = () => {
//       try {
//         if (!ctx || !image) return;

//         ctx.clearRect(0, 0, canvas.width, canvas.height);

//         for (let x = 0; x < canvas.width; x++) {
//           const waveOffset1 = Math.sin(x * 0.02 + time) * 10;
//           const waveOffset2 = Math.sin(x * 0.05 + time * 0.7) * 5;
//           const waveOffset = waveOffset1 + waveOffset2;

//           const sourceX = x * (image.width / canvas.width);
//           const sourceWidth = image.width / canvas.width;

//           if (sourceX < 0 || sourceWidth <= 0) {
//             console.error("Invalid sourceX or sourceWidth:", sourceX, sourceWidth);
//             return;
//           }

//           ctx.drawImage(
//             image,
//             sourceX,
//             0,
//             sourceWidth,
//             image.height,
//             x,
//             waveOffset,
//             1,
//             canvas.height
//           );
//         }

//         time += 0.05;
//         requestAnimationFrame(drawWaterEffect);
//       } catch (error) {
//         console.error("Error in drawWaterEffect:", error);
//       }
//     };

//     let animationFrameId = requestAnimationFrame(drawWaterEffect);

//     return () => {
//       cancelAnimationFrame(animationFrameId);
//       window.removeEventListener("resize", resizeCanvas);
//     };
//   }, [image]);

//   return (
//     <div className="flex mb-10">
//       <canvas
//         ref={canvasRef}
//         className="top-0 left-0 w-full rounded-2xl"
//       />
//     </div>
//   );
// };

// export default WaveAnimation;

import React, { useEffect, useRef, useState } from "react";

const WaveAnimation: React.FC<{ imageUrl: string; backgroundColor?: string }> = ({ 
  imageUrl, 
  backgroundColor = 'transparent' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [dpr, setDpr] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setDpr(window.devicePixelRatio || 1);
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;
    img.onload = () => {
      setImage(img);
    };
    img.onerror = (error) => {
      console.error("Failed to load image:", error);
    };
  }, [imageUrl]);

  useEffect(() => {
    if (!image) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: backgroundColor === 'transparent' });
    if (!ctx) return;

    const resizeCanvas = () => {
      if (!canvas || !image) return;

      const container = canvas.parentElement;
      if (!container) return;

      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      const imageAspectRatio = image.width / image.height * 1.4;
      const containerAspectRatio = containerWidth / containerHeight;

      let canvasWidth, canvasHeight;

      if (containerAspectRatio > imageAspectRatio) {
        canvasHeight = containerHeight;
        canvasWidth = canvasHeight * imageAspectRatio;
      } else {
        canvasWidth = containerWidth;
        canvasHeight = canvasWidth / imageAspectRatio;
      }

      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;
      canvas.width = canvasWidth * dpr;
      canvas.height = canvasHeight * dpr;

      if (canvas.width <= 0 || canvas.height <= 0) {
        console.error("Invalid canvas dimensions:", canvas.width, canvas.height);
        return;
      }

      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let time = 0;

    const drawWaterEffect = () => {
      try {
        if (!ctx || !image) return;

        // Clear with background color
        if (backgroundColor !== 'transparent') {
          ctx.fillStyle = backgroundColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Increased speed for mobile (higher time increment)
        const timeIncrement = isMobile ? 0.08 : 0.05; // Mobile waves move faster
        const waveHeight = isMobile ? 12 : 10;
        const waveFrequency = isMobile ? 0.02 : 0.02;
        const waveDetail = isMobile ? 0.05 : 0.05;

        for (let x = 0; x < canvas.width / dpr; x++) {
          const waveOffset1 = Math.sin(x * waveFrequency + time) * waveHeight;
          const waveOffset2 = Math.sin(x * waveDetail + time * 0.7) * (waveHeight * 0.6);
          const waveOffset = waveOffset1 + waveOffset2;

          const sourceX = x * (image.width / (canvas.width / dpr));
          const sourceWidth = image.width / (canvas.width / dpr);

          if (sourceX < 0 || sourceWidth <= 0) continue;

          ctx.drawImage(
            image,
            sourceX,
            0,
            sourceWidth,
            image.height,
            x,
            waveOffset,
            1,
            canvas.height / dpr
          );
        }

        time += timeIncrement;
        requestAnimationFrame(drawWaterEffect);
      } catch (error) {
        console.error("Error in drawWaterEffect:", error);
      }
    };

    let animationFrameId = requestAnimationFrame(drawWaterEffect);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [image, dpr, backgroundColor, isMobile]);

  return (
    <div className="flex mb-10" style={{ backgroundColor }}>
      <canvas
        ref={canvasRef}
        className="top-0 left-0 w-full rounded-2xl"
      />
    </div>
  );
};

export default WaveAnimation;