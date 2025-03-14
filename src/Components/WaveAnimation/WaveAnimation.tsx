import React, { useEffect, useRef } from "react";

const WaveAnimation: React.FC<{ offsetX?: number; opacity?: number; color?: string }> = ({ offsetX = 0, opacity = 1, color = "#3b82f6" }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerWidth < 640 ? 60 : 100;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let waveOffset = offsetX; // Each wave has a different offset
    const waveHeight = window.innerWidth < 640 ? 10 : 20;
    const waveFrequency = window.innerWidth < 640 ? 0.03 : 0.02;
    const waveSpeed = window.innerWidth < 640 ? 0.04 : 0.05;

    const drawWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity; // Adjust opacity for layering effect
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
  }, [offsetX, opacity, color]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full"
    />
  );
};

const MultiWaveAnimation: React.FC = () => {
  return (
    <div className="relative w-full h-24 overflow-hidden">
      <WaveAnimation offsetX={0} opacity={0.6} color="#3b82f6" />  {/* First wave (default) */}
      <WaveAnimation offsetX={10} opacity={0.4} color="#2563eb" /> {/* Slightly shifted */}
      <WaveAnimation offsetX={-10} opacity={0.3} color="#1e40af" /> {/* Further shifted */}
    </div>
  );
};

export default WaveAnimation;