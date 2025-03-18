
// import React, { useEffect, useRef, useState } from "react";

// const WaveAnimation: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [image, setImage] = useState<HTMLImageElement | null>(null);

//   useEffect(() => {
//     // Load the image
//     const img = new Image();
//     img.src = imageUrl; // Use the imported image directly (no curly braces)
//     img.onload = () => {
//       setImage(img);
//     };
//   }, [imageUrl]);

//   useEffect(() => {
//     if (!image) return; // Wait for the image to load

//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const resizeCanvas = () => {
//       // Set canvas size to match the image dimensions
//       canvas.width = image.width;
//       canvas.height = image.height;
//     };

//     resizeCanvas();
//     window.addEventListener("resize", resizeCanvas);

//     let time = 0; // Time variable for animation

//     const drawWaterEffect = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       // Apply wave distortion to the image
//       for (let x = 0; x < canvas.width; x++) {
//         // Use multiple sine waves for a more complex water effect
//         const waveOffset1 = Math.sin(x * 0.02 + time) * 10; // First wave layer
//         const waveOffset2 = Math.sin(x * 0.05 + time * 0.7) * 5; // Second wave layer
//         const waveOffset = waveOffset1 + waveOffset2; // Combine wave layers

//         ctx.drawImage(
//           image,
//           x, // Source X
//           0, // Source Y
//           1, // Source width (1 pixel column)
//           image.height, // Source height
//           x, // Destination X
//           waveOffset, // Destination Y (apply distortion)
//           1, // Destination width
//           canvas.height // Destination height
//         );
//       }

//       // Update time for animation
//       time += 0.05;

//       requestAnimationFrame(drawWaterEffect);
//     };

//     drawWaterEffect();

//     return () => {
//       cancelAnimationFrame(drawWaterEffect as any);
//       window.removeEventListener("resize", resizeCanvas);
//     };
//   }, [image]);

//   return (
//      <div className="flex mb-10">
//        <canvas
//         ref={canvasRef}
//         className="top-0 left-0 w-full rounded-2xl"
//       />
//      </div>
//   );
// };

// export default WaveAnimation;


import React, { useEffect, useRef, useState } from "react";

const WaveAnimation: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
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
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      if (!canvas || !image) return;

      const container = canvas.parentElement;
      if (!container) return;

      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      const imageAspectRatio = image.width / image.height*1.3;
      const containerAspectRatio = containerWidth / containerHeight;

      let canvasWidth, canvasHeight;

      if (containerAspectRatio > imageAspectRatio) {
        canvasHeight = containerHeight;
        canvasWidth = canvasHeight * imageAspectRatio;
      } else {
        canvasWidth = containerWidth;
        canvasHeight = canvasWidth / imageAspectRatio;
      }

      if (canvasWidth <= 0 || canvasHeight <= 0) {
        console.error("Invalid canvas dimensions:", canvasWidth, canvasHeight);
        return;
      }

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let time = 0;

    const drawWaterEffect = () => {
      try {
        if (!ctx || !image) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let x = 0; x < canvas.width; x++) {
          const waveOffset1 = Math.sin(x * 0.02 + time) * 10;
          const waveOffset2 = Math.sin(x * 0.05 + time * 0.7) * 5;
          const waveOffset = waveOffset1 + waveOffset2;

          const sourceX = x * (image.width / canvas.width);
          const sourceWidth = image.width / canvas.width;

          if (sourceX < 0 || sourceWidth <= 0) {
            console.error("Invalid sourceX or sourceWidth:", sourceX, sourceWidth);
            return;
          }

          ctx.drawImage(
            image,
            sourceX,
            0,
            sourceWidth,
            image.height,
            x,
            waveOffset,
            1,
            canvas.height
          );
        }

        time += 0.05;
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
  }, [image]);

  return (
    <div className="flex mb-10">
      <canvas
        ref={canvasRef}
        className="top-0 left-0 w-full rounded-2xl"
      />
    </div>
  );
};

export default WaveAnimation;