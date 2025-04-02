
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

// import React, { useEffect, useRef, useState } from "react";

// const WaveAnimation: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [image, setImage] = useState<HTMLImageElement | null>(null);

//   useEffect(() => {
//     const img = new Image();
//     img.src = imageUrl;
//     img.onload = () => setImage(img);
//     img.onerror = (error) => console.error("Failed to load image:", error);
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

//       const imageAspectRatio = (image.width / image.height) * 1.4;
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

//         // Check screen width and adjust speed
//         const isMobile = window.innerWidth < 768;
//         const speedFactor = isMobile ? 0.02 : 0.05; // Slower on mobile

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

//         time += speedFactor; // Adjusted speed based on device width
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
//       <canvas ref={canvasRef} className="top-0 left-0 w-full rounded-2xl" />
//     </div>
//   );
// };

// export default WaveAnimation;


// import React, { useEffect, useRef } from "react";

// const WaveAnimation: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const imageRef = useRef<HTMLImageElement | null>(null);
//   const animationIdRef = useRef<number>(0);
//   const timeRef = useRef<number>(0);
//   const lastFrameTimeRef = useRef<number>(0);
//   const frameIntervalRef = useRef<number>(1000 / 30); // Target 30fps

//   // Load image
//   useEffect(() => {
//     const img = new Image();
//     img.src = imageUrl;
//     img.onload = () => {
//       imageRef.current = img;
//       // Start animation only when image is loaded
//       if (canvasRef.current) {
//         setupCanvas();
//         startAnimation();
//       }
//     };
//     img.onerror = (error) => console.error("Failed to load image:", error);

//     return () => {
//       if (img) {
//         img.onload = null;
//         img.onerror = null;
//       }
//     };
//   }, [imageUrl]);

//   // Canvas setup
//   const setupCanvas = () => {
//     const canvas = canvasRef.current;
//     if (!canvas || !imageRef.current) return;

//     const container = canvas.parentElement;
//     if (!container) return;

//     const containerWidth = container.clientWidth;
//     const containerHeight = container.clientHeight;
//     const image = imageRef.current;

//     const imageAspectRatio = (image.width / image.height) * 1.4;
//     const containerAspectRatio = containerWidth / containerHeight;

//     let canvasWidth, canvasHeight;

//     if (containerAspectRatio > imageAspectRatio) {
//       canvasHeight = containerHeight;
//       canvasWidth = canvasHeight * imageAspectRatio;
//     } else {
//       canvasWidth = containerWidth;
//       canvasHeight = canvasWidth / imageAspectRatio;
//     }

//     // Mobile-specific adjustments
//     const isMobile = window.innerWidth < 768;
//     if (isMobile) {
//       // Ensure canvas doesn't exceed viewport height
//       const maxMobileHeight = window.innerHeight * 0.8;
//       if (canvasHeight > maxMobileHeight) {
//         const scale = maxMobileHeight / canvasHeight;
//         canvasHeight = maxMobileHeight;
//         canvasWidth *= scale;
//       }
//     }

//     // Set canvas dimensions
//     canvas.width = canvasWidth;
//     canvas.height = canvasHeight;
//     canvas.style.width = `${canvasWidth}px`;
//     canvas.style.height = `${canvasHeight}px`;
//   };

//   // Animation loop with frame rate control
//   const animate = (timestamp: number) => {
//     const canvas = canvasRef.current;
//     if (!canvas || !imageRef.current) return;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     // Frame rate control
//     const deltaTime = timestamp - lastFrameTimeRef.current;
//     if (deltaTime < frameIntervalRef.current) {
//       animationIdRef.current = requestAnimationFrame(animate);
//       return;
//     }
//     lastFrameTimeRef.current = timestamp;

//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     const image = imageRef.current;
//     const isMobile = window.innerWidth < 768;
//     const speedFactor = isMobile ? 0.02 : 0.05;
//     const stepSize = isMobile ? 2 : 1; // Process fewer pixels on mobile

//     // Optimized wave rendering
//     for (let x = 0; x < canvas.width; x += stepSize) {
//       const waveOffset1 = Math.sin(x * 0.02 + timeRef.current) * 10;
//       const waveOffset2 = Math.sin(x * 0.05 + timeRef.current * 0.7) * 5;
//       const waveOffset = waveOffset1 + waveOffset2;

//       const sourceX = x * (image.width / canvas.width);
//       const sourceWidth = image.width / canvas.width;

//       ctx.drawImage(
//         image,
//         sourceX,
//         0,
//         sourceWidth * stepSize,
//         image.height,
//         x,
//         waveOffset,
//         stepSize,
//         canvas.height
//       );
//     }

//     timeRef.current += speedFactor;
//     animationIdRef.current = requestAnimationFrame(animate);
//   };

//   const startAnimation = () => {
//     if (animationIdRef.current) {
//       cancelAnimationFrame(animationIdRef.current);
//     }
//     lastFrameTimeRef.current = performance.now();
//     animationIdRef.current = requestAnimationFrame(animate);
//   };

//   // Handle resize
//   useEffect(() => {
//     const handleResize = () => {
//       setupCanvas();
//     };

//     const resizeObserver = new ResizeObserver(handleResize);
//     if (canvasRef.current?.parentElement) {
//       resizeObserver.observe(canvasRef.current.parentElement);
//     }

//     // Initial setup in case parent container isn't ready immediately
//     const timeoutId = setTimeout(() => {
//       if (imageRef.current && canvasRef.current) {
//         setupCanvas();
//       }
//     }, 100);

//     return () => {
//       clearTimeout(timeoutId);
//       resizeObserver.disconnect();
//       if (animationIdRef.current) {
//         cancelAnimationFrame(animationIdRef.current);
//       }
//     };
//   }, []);

//   return (
//     <div key={window.innerWidth} className="flex -mb-10 md:mb-10 w-full h-auto min-h-[250px]">
//       <canvas 
//         ref={canvasRef} 
//         className="top-0 left-0 w-full h-full rounded-2xl"
//         style={{ maxWidth: '100%' }}
//       />
//     </div>
//   );
// };

// export default WaveAnimation;

import React, { useEffect, useRef } from "react";

const WaveAnimation: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const animationIdRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Load image
  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      imageRef.current = img;
      setupCanvas();
      startAnimation();
    };
    img.onerror = (error) => console.error("Failed to load image:", error);

    return () => {
      if (img) {
        img.onload = null;
        img.onerror = null;
      }
    };
  }, [imageUrl]);

  // Perfect responsive canvas setup
  const setupCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !imageRef.current || !containerRef.current) return;

    const image = imageRef.current;
    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // Calculate dimensions to maintain aspect ratio while filling container
    const targetAspectRatio = (image.width / image.height) * 1.4;
    let canvasWidth, canvasHeight;

    if (containerWidth / containerHeight > targetAspectRatio) {
      // Container is wider than needed - fill height
      canvasHeight = containerHeight;
      canvasWidth = canvasHeight * targetAspectRatio;
    } else {
      // Container is taller than needed - fill width
      canvasWidth = containerWidth;
      canvasHeight = canvasWidth / targetAspectRatio;
    }

    // Set canvas dimensions (scaled for sharpness on high DPI displays)
    const scale = window.devicePixelRatio || 1;
    canvas.width = canvasWidth * scale;
    canvas.height = canvasHeight * scale;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    // Adjust context for high DPI
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(scale, scale);
    }
  };

  // Optimized animation loop
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas || !imageRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const image = imageRef.current;
    const isMobile = window.innerWidth < 768;
    const speedFactor = isMobile ? 0.02 : 0.05;
    const stepSize = isMobile ? 2 : 1;

    const canvasDisplayWidth = parseInt(canvas.style.width);
    const canvasDisplayHeight = parseInt(canvas.style.height);

    for (let x = 0; x < canvasDisplayWidth; x += stepSize) {
      const waveOffset1 = Math.sin(x * 0.02 + timeRef.current) * 10;
      const waveOffset2 = Math.sin(x * 0.05 + timeRef.current * 0.7) * 5;
      const waveOffset = waveOffset1 + waveOffset2;

      const sourceX = x * (image.width / canvasDisplayWidth);
      const sourceWidth = image.width / canvasDisplayWidth;

      ctx.drawImage(
        image,
        sourceX,
        0,
        sourceWidth * stepSize,
        image.height,
        x,
        waveOffset,
        stepSize,
        canvasDisplayHeight
      );
    }

    timeRef.current += speedFactor;
    animationIdRef.current = requestAnimationFrame(animate);
  };

  const startAnimation = () => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
    }
    animationIdRef.current = requestAnimationFrame(animate);
  };

  // Comprehensive resize handling
  useEffect(() => {
    const handleResize = () => {
      setupCanvas();
    };

    // Use both ResizeObserver and window resize for maximum compatibility
    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    window.addEventListener('resize', handleResize);

    // Initial setup with small delay to ensure parent is ready
    const initTimeout = setTimeout(handleResize, 50);

    return () => {
      clearTimeout(initTimeout);
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationIdRef.current);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="flex w-full h-full min-h-[250px] relative"
    >
      <canvas 
        ref={canvasRef} 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl"
        style={{ 
          maxWidth: '100%',
          maxHeight: '100%',
          width: 'auto',
          height: 'auto'
        }}
      />
    </div>
  );
};

export default WaveAnimation;