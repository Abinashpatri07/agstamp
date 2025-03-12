import React from "react";

const WaveAnimation: React.FC = () => {
  return (
    <div className="absolute w-full overflow-hidden h-20 bottom-0">
      {/* First Wave - Flipped Upside Down */}
      <svg
        className="absolute top-0 left-0 w-[200%] h-full animate-waveMove transform scale-y-[-1]"
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#3b82f6" /* Light Blue */
          fillOpacity="1"
          d="M0,224L48,234.7C96,245,192,267,288,272C384,277,480,267,576,240C672,213,768,171,864,144C960,117,1056,107,1152,117.3C1248,128,1344,160,1392,176L1440,192V0H0Z"
        />
      </svg>

      {/* Second Wave - Also Flipped and Moves in Reverse */}
      <svg
        className="absolute top-0 left-0 w-[200%] h-full animate-waveMoveReverse transform scale-y-[-1]"
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#2563eb" /* Dark Blue */
          fillOpacity="0.7"
          d="M0,160L48,170.7C96,181,192,203,288,224C384,245,480,267,576,256C672,245,768,213,864,181.3C960,149,1056,117,1152,122.7C1248,128,1344,192,1392,224L1440,256V0H0Z"
        />
      </svg>
    </div>
  );
};

export default WaveAnimation;
