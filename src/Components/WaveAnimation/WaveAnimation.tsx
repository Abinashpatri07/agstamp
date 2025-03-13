import React, { useEffect, useRef } from "react";

const WaveAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Function to resize the canvas dynamically
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerWidth < 640 ? 60 : 100; // Adjust height for small screens
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let waveOffset = 0;
    const waveHeight = window.innerWidth < 640 ? 10 : 20; // Smaller waves on mobile
    const waveFrequency = window.innerWidth < 640 ? 0.03 : 0.02;
    const waveSpeed = window.innerWidth < 640 ? 0.04 : 0.05;

    const drawWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#3b82f6"; // Water blue color
      ctx.beginPath();

      for (let x = 0; x < canvas.width; x++) {
        const y = Math.sin(x * waveFrequency + waveOffset) * waveHeight + waveHeight;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fill();

      waveOffset += waveSpeed;
      requestAnimationFrame(drawWave);
    };

    drawWave();

    return () => {
      cancelAnimationFrame(drawWave as any);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full"
    />
  );
};

export default WaveAnimation;
