
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
  const animationFrameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

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

    // Optimization: Pre-calculate wave parameters
    const waveParams = {
      timeIncrement: isMobile ? 0.08 : 0.05,
      waveHeight: isMobile ? 12 : 10,
      waveFrequency: isMobile ? 0.02 : 0.02,
      waveDetail: isMobile ? 0.05 : 0.05,
      waveDetailFactor: 0.7,
      waveHeightFactor: 0.6
    };

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

    // Optimization: Create an offscreen canvas for the base image
    const offscreenCanvas = document.createElement('canvas');
    const offscreenCtx = offscreenCanvas.getContext('2d');
    if (offscreenCtx) {
      offscreenCanvas.width = image.width;
      offscreenCanvas.height = image.height;
      offscreenCtx.drawImage(image, 0, 0);
    }

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

        // Optimization: Reduce the number of slices on mobile
        const sliceDensity = isMobile ? 2 : 1; // Render every 2nd pixel on mobile
        const width = canvas.width / dpr;

        for (let x = 0; x < width; x += sliceDensity) {
          const waveOffset1 = Math.sin(x * waveParams.waveFrequency + timeRef.current) * waveParams.waveHeight;
          const waveOffset2 = Math.sin(x * waveParams.waveDetail + timeRef.current * waveParams.waveDetailFactor) * 
                            (waveParams.waveHeight * waveParams.waveHeightFactor);
          const waveOffset = waveOffset1 + waveOffset2;

          const sourceX = x * (image.width / width);
          const sourceWidth = image.width / width * sliceDensity;

          if (sourceX < 0 || sourceWidth <= 0) continue;

          // Use the offscreen canvas if available
          const sourceImage = offscreenCanvas || image;
          
          ctx.drawImage(
            sourceImage,
            sourceX,
            0,
            sourceWidth,
            image.height,
            x,
            waveOffset,
            sliceDensity, // Wider slices when skipping pixels
            canvas.height / dpr
          );
        }

        timeRef.current += waveParams.timeIncrement;
        animationFrameRef.current = requestAnimationFrame(drawWaterEffect);
      } catch (error) {
        console.error("Error in drawWaterEffect:", error);
      }
    };

    animationFrameRef.current = requestAnimationFrame(drawWaterEffect);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
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